from core.models import Candidate
from rest_framework import generics

from .serializers import CandidateSerializer, CandidateDetailSerializer


class CandidateListView(generics.ListAPIView):
    serializer_class = CandidateSerializer
    # permission_classes = (permissions.IsAuthenticated,)
    queryset = Candidate.objects.all()


class CandidateDetailView(generics.RetrieveAPIView):
    lookup_field = "id"
    serializer_class = CandidateDetailSerializer
    # permission_classes = (permissions.IsAuthenticated,)
    queryset = Candidate.objects.all()
