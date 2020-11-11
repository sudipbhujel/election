from rest_framework import views
from rest_framework.renderers import (
    JSONRenderer,
    BrowsableAPIRenderer,
)
from rest_framework.response import Response
from rest_framework import status

from core.models import Candidate, Profile


class StatsView(views.APIView):
    """
    State
    """
    renderer_classes = (JSONRenderer, BrowsableAPIRenderer)

    def get(self, request, format=None):
        total_candidate = Candidate.objects.filter(is_candidate=True).count()
        total_voter = Profile.objects.filter(is_voter=True).count()
        total_vote_dropped = Profile.objects.filter(is_voted=True).count()

        data = {'total_candidate': total_candidate,
                'total_voter': total_voter, 'total_vote_dropped': total_vote_dropped}

        return Response(data, status=status.HTTP_200_OK)
