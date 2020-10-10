from core.models import Party
from rest_framework import generics, permissions

from .serializers import PartySerializer


class PartyListView(generics.ListAPIView):
    """
    Party list view.
    """
    serializer_class = PartySerializer
    # permission_classes = (permissions.IsAuthenticated,)
    queryset = Party.objects.all()


class PartyDetailView(generics.RetrieveAPIView):
    """
    Party list view.
    """
    lookup_field = 'id'
    serializer_class = PartySerializer
    # permission_classes = (permissions.IsAuthenticated,)
    queryset = Party.objects.all()
