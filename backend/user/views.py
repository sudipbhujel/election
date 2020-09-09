from django.http import JsonResponse
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework import authentication, generics, permissions, status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings

from core.models import User

from .serializers import (AuthTokenSerializer, FaceImageSerializer,
                          UserRegistrationSerializer, UserSerializer)
from .tokens import account_activation_token


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


def activate(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        response = JsonResponse(
            {'verified': True,
             'citizenship_number': user.citizenship_number},
            status=status.HTTP_200_OK)
        return response
    else:
        return JsonResponse(
            {'error': 'Not valid link!'}, status=status.HTTP_400_BAD_REQUEST)
