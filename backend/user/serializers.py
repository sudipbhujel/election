from django.contrib.auth import get_user_model, password_validation
from django.contrib.auth.models import update_last_login
from django.contrib.sites.shortcuts import get_current_site
from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _
from rest_framework import exceptions, serializers

from core.models import FaceImage
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

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
        fields = ('citizenship_number', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}}


class UserRegistrationSerializer(serializers.Serializer):
    """
    Serializes User and FaceImage models
    """
    face = FaceImageSerializer()
    user = UserSerializer()

    def create(self, validated_data):
        """
        Create faceimage and user object
        """
        faceimage_data = validated_data.pop('face')
        user_data = validated_data.pop('user')
        payload = {
            'citizenship_number': user_data['citizenship_number'],
            'email': user_data['email'],
            'password': user_data['password']
        }
        user = get_user_model().objects.create_user(**payload)
        user.is_active = False
        user.save()
        faceimage = FaceImage.objects.create(user=user, **faceimage_data)
        faceimage_data["image"] = faceimage.image.url
        image_data = {
            'image': faceimage.image.url
        }
        data = {'face': image_data,
                'user': user_data}
        # Celery work
        current_site = get_current_site(self.context.get('request'))
        user_created.delay(user.id, current_site.domain)
        return data


class AuthTokenObtainSerializer(TokenObtainPairSerializer):
    """
    Seializer for th user authentication object.

    Returns
    -------
        json: 'access' and 'token'
    """
    default_error_messages = {
        'no_active_account': _('No active account found with the given credentials')
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['password'] = serializers.CharField(
            style={'input_type': 'password'},
            trim_whitespace=False
        )
        self.fields['face_image'] = serializers.ImageField()

    def validate(self, attrs):
        """
        Validates and authenticate the user.
        """
        citizenship_number = attrs.get('citizenship_number')
        password = attrs.get('password')
        face_image = attrs.get('face_image')

        face_id = FaceIdAuthBackend()
        user = face_id.authenticate(
            citizenship_number=citizenship_number, password=password,
            face_id=face_image
        )

        if user is None or not user.is_active:
            raise exceptions.AuthenticationFailed(
                self.error_messages['no_active_account'],
                'no_active_account',
            )

        update_last_login(None, user)
        data = {}

        refresh = self.get_token(user)

        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        return data


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


class ResetUserPasswordLinkSerializer(serializers.Serializer):
    """
    Serializer for reset link for a password.
    """
    citizenship_number = serializers.IntegerField()
    email = serializers.EmailField()

    class Meta:
        model = get_user_model()
        fields = ('citizenship_number', 'email')

    def validate(self, attrs):
        citizenship_number = attrs.get('citizenship_number')
        email = attrs.get('email')

        associated_user = get_user_model().objects.filter(
            citizenship_number=citizenship_number, email=email)

        if not associated_user.exists():
            raise serializers.ValidationError(
                {'error': _('User don\'t exist with given credential.')})
        return attrs


class ResetUserPasswordConfirmSerializer(serializers.Serializer):
    """
    Serializer for a password update.
    """
    new_password1 = serializers.CharField()
    new_password2 = serializers.CharField()

    class Meta:
        model = get_user_model()
        fields = ('new_password1', 'new_password2')
        extra_kwargs = {
            'new_password1': {'write_only': True, 'min_length': 5},
            'new_password2': {'write_only': True, 'min_length': 5}
        }

    def validate(self, attrs):
        new_password1 = attrs.get('new_password1')
        new_password2 = attrs.get('new_password2')
        if new_password1 and new_password2 and new_password1 != new_password2:
            raise ValidationError(
                {'new_password2': _('New password don\'t match.')})

        return attrs

    def create(self, validated_data):
        user = validated_data.pop('user')
        password = validated_data.pop('new_password2')
        try:
            password_validation.validate_password(password, user)
        except ValidationError:
            raise serializers.ValidationError(
                {'message': _('Choose strong password.')})
        user.set_password(password)
        user.save()
        return user
