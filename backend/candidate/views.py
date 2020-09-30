from core.models import Candidate
from rest_framework import generics, permissions

from .serializers import CandidateSerializer


class CandidateListView(generics.ListAPIView):
    serializer_class = CandidateSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Candidate.objects.all()


class CandidateDetailView(generics.RetrieveAPIView):
    lookup_field = "id"
    serializer_class = CandidateSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Candidate.objects.all()
