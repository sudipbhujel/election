from core.models import Profile
from django.http import Http404
from rest_framework import generics, permissions

from .serializers import ManageProfileSerializer, ProfileSerializer


class ProfileView(generics.CreateAPIView):
    """
    Creates profile.
    """
    serializer_class = ProfileSerializer
    permission_classes = (permissions.IsAuthenticated,)


class ManageProfileView(generics.RetrieveUpdateAPIView):
    """
    Updates profile.
    """
    serializer_class = ManageProfileSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        try:
            return Profile.objects.get(user=self.request.user)
        except Profile.DoesNotExist:
            raise Http404
