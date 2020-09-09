from rest_framework import generics, permissions, authentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings

from core.models import User

from .serializers import (AuthTokenSerializer, FaceImageSerializer,
                          UserRegistrationSerializer, UserSerializer)


class ManageUserView(generics.RetrieveUpdateAPIView):
    """
    Serializes user object
    """
    serializer_class = UserSerializer
    authentication_classes = (authentication.TokenAuthentication, )
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        return self.request.user


class RegistrationUserView(generics.CreateAPIView):
    """
    Creates a new user with face image and save to User and FaceImage models.
    """
    serializer_class = UserRegistrationSerializer
    queryset = User.objects.all()


class UserFaceImageView(generics.RetrieveAPIView):
    """
    Retrieves user face image.
    """
    serializer_class = FaceImageSerializer

    def get_object(self):
        return self.request.user.faceimage


class CreateTokenView(ObtainAuthToken):
    """Create a new auth token for user"""
    serializer_class = AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES
