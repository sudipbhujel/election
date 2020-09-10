from django.contrib.auth import get_user_model, password_validation
from django.contrib.sites.shortcuts import get_current_site
from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers

from core.models import FaceImage

from .authenticate import FaceIdAuthBackend
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
        fields = ('citizenship_number', 'email',
                  'password', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}}


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
            'password': user_data['password'],
            'first_name': user_data['first_name'],
            'last_name': user_data['last_name']
        }
        user = get_user_model().objects.create_user(**payload)
        user.is_active = False
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


class ChangeUserPasswordSerializer(serializers.Serializer):
    """
    Serializer for changing a password.
    """
    old_password = serializers.CharField()
    new_password1 = serializers.CharField()
    new_password2 = serializers.CharField()

    class Meta:
        model = get_user_model()
        fields = ('old_password', 'new_password1', 'new_password2')
        extra_kwargs = {
            'new_password1': {'write_only': True, 'min_length': 5},
            'new_password2': {'write_only': True, 'min_length': 5}
        }

    def validate_old_password(self, data):
        """
        Validation logic for old password of the user.
        """
        old_password = data
        user = self.context.get('request').user
        if not user.check_password(old_password):
            raise serializers.ValidationError(
                _('Your old password don\'t match')
            )
        return data

    def validate(self, attrs):
        new_password1 = attrs.get('new_password1')
        new_password2 = attrs.get('new_password2')

        if new_password1 and new_password2 and new_password1 != new_password2:
            raise serializers.ValidationError(
                {'new_password2': _('The password don\'t match.')})

        password_validation.validate_password(
            new_password2, self.context.get('request').user)
        return attrs

    def save(self, **kwargs):
        new_password = self.validated_data.get('new_password1')
        user = self.context.get('request').user
        user.set_password(new_password)
        user.save()
        return user
