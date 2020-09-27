from django.contrib.auth import get_user_model
from django.contrib.sites.shortcuts import get_current_site
from django.http import JsonResponse
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from django.utils.translation import ugettext_lazy as _
from rest_framework import generics, permissions, status, views
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from core.models import User
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import (AuthTokenObtainSerializer,
                          ChangeUserPasswordSerializer, FaceImageSerializer,
                          ResetUserPasswordConfirmSerializer,
                          ResetUserPasswordLinkSerializer,
                          UserRegistrationSerializer, UserSerializer)
from .tasks import reset_password_created
from .tokens import account_activation_token, password_reset_token


class ManageUserView(generics.RetrieveUpdateAPIView):
    """
    Serializes user object
    """
    serializer_class = UserSerializer
    # authentication_classes = (authentication.TokenAuthentication, )
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


class CreateTokenObtainPairView(TokenObtainPairView):
    """
    Create a new auth token for user.
    """
    serializer_class = AuthTokenObtainSerializer


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
            {'error': _('Not valid link!')},
            status=status.HTTP_400_BAD_REQUEST
        )


class ChangeUserPasswordView(generics.UpdateAPIView):
    """
    Updates a user with new password.
    """
    serializer_class = ChangeUserPasswordSerializer
    model = User
    permission_classes = (permissions.IsAuthenticated, )

    def get_object(self):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        # if using drf authtoken, create a new token
        if hasattr(user, 'auth_token'):
            user.auth_token.delete()
        token, created = Token.objects.get_or_create(user=user)
        # return new token
        return Response({'token': token.key}, status=status.HTTP_200_OK)


class ResetUserPasswordLinkView(generics.CreateAPIView):
    """
    Password reset view for user.
    """
    serializer_class = ResetUserPasswordLinkSerializer

    def post(self, request, format=None, *args, **kwargs):
        serializer = ResetUserPasswordLinkSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.data.get('email')
        citizenship_number = serializer.data.get('citizenship_number')
        current_site = get_current_site(request)
        user = get_user_model().objects.get(
            citizenship_number=citizenship_number, email=email)
        reset_password_created.delay(user.id, current_site.domain)
        return Response(
            {'message': _('Password reset link is sent to your')},
            status=status.HTTP_200_OK
        )


class ResetUserPasswordConfirmView(views.APIView):
    """
    Password reset confirm view.
    """

    serializer_class = ResetUserPasswordConfirmSerializer

    def get(self, request, uidb64, token, format=None, *args, **kwargs):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except(TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        if user is not None and password_reset_token.check_token(user, token):
            return Response(
                {'message': 'Link is valid.'},
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {'error': _('Not valid link!')},
                status=status.HTTP_400_BAD_REQUEST
            )

    def post(self, request, uidb64=None, token=None,
             format=None, *args, **kwargs):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except(TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        if user is not None and password_reset_token.check_token(user, token):
            serializer = ResetUserPasswordConfirmSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.validated_data['user'] = user
            serializer.save()
            return Response(
                {'message': 'Your password is set.'},
                status=status.HTTP_200_OK
            )

        else:
            return Response(
                {'error': _('Not valid link!')},
                status=status.HTTP_400_BAD_REQUEST
            )
