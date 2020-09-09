from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers

from core.models import FaceImage, User

from .authenticate import FaceIdAuthBackend


from django.contrib.sites.shortcuts import get_current_site
from .tasks import user_created


class FaceImageSerializer(serializers.ModelSerializer):
    """
    Serializes FaceImage models
    """
    class Meta:
        model = FaceImage
        fields = ('id', 'image',)
        read_only_fields = ('id',)


class UserSerializer(serializers.ModelSerializer):
    """
    Serializes user model
    """

    class Meta:
        model = get_user_model()
        fields = ('id', 'citizenship_number', 'email',
                  'password', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}}
        read_only_fields = ('id',)


class UserRegistrationSerializer(serializers.Serializer):
    """
    Serializes User and FaceImage models
    """
    faceimageserializer = FaceImageSerializer()
    userserializer = UserSerializer()

    def create(self, validated_data):
        """
        Create faceimage and user object
        """
        faceimage_data = validated_data.pop('faceimageserializer')
        user_data = validated_data.pop('userserializer')
        payload = {
            'citizenship_number': user_data['citizenship_number'],
            'email': user_data['email'],
            'first_name': user_data['first_name'],
            'last_name': user_data['last_name']
        }
        user = User.objects.create(**payload)
        user.is_active = False
        user.set_password(user_data['password'])
        user.save()
        faceimage = FaceImage.objects.create(user=user, **faceimage_data)
        faceimage_data["image"] = faceimage.image.url
        image_data = {
            'image': faceimage.image.url
        }
        data = {'faceimageserializer': image_data,
                'userserializer': user_data}
        # Celery work
        current_site = get_current_site(self.context.get('request'))
        user_created(user.id, current_site)
        return data


class AuthTokenSerializer(serializers.Serializer):
    """
    Serializer for the user authentication object
    """
    citizenship_number = serializers.IntegerField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False
    )
    face_image = serializers.ImageField()

    def validate(self, attrs):
        """Validate and authenticate the user"""
        citizenship_number = attrs.get('citizenship_number')
        password = attrs.get('password')
        face_image = attrs.get('face_image')

        face_id = FaceIdAuthBackend()
        user = face_id.authenticate(
            citizenship_number=citizenship_number, password=password,
            face_id=face_image
        )

        if not user:
            msg = _('Unable to authenticate with provided credentials')
            raise serializers.ValidationError(msg, code='authentication')

        attrs['user'] = user
        return attrs
