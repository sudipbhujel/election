from rest_framework import views
from rest_framework.renderers import (
    JSONRenderer,
    BrowsableAPIRenderer,
)
from rest_framework.response import Response
from rest_framework import status

from ethereum.functions import state


class StateView(views.APIView):
    """
    State
    """
    renderer_classes = (JSONRenderer, BrowsableAPIRenderer)

    def get(self, request, format=None):
        st = state()
        data = {0: "Pre Voting", 1: "Voting", 2: "Post Voting"}

        return Response({
            'state': st,
            'message': data[st]
        }, status=status.HTTP_200_OK)
