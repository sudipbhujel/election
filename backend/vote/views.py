from rest_framework import permissions
from rest_framework import views
from rest_framework.response import Response
from rest_framework import status
from rest_framework.renderers import (
    JSONRenderer,
    BrowsableAPIRenderer,
)

from ethereum.voter import Voter

from id.decode import decode_qr

from .serializers import VoteSerializer
from core.models import Candidate


class VoteView(views.APIView):
    """
    POST method for vote.
    """
    serializer_class = VoteSerializer
    renderer_classes = (JSONRenderer, BrowsableAPIRenderer)
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        serializer = VoteSerializer(
            data=request.data, context={'request': request})
        id_card_image = request.FILES['id_card']
        if serializer.is_valid():
            id_card = decode_qr(id_card_image)
            candidate = Candidate.objects.get(
                id=serializer.data['candidate_id'])
            voter = Voter(id_card['private_key'])
            try:
                receipt = voter.do_vote(candidate.profile.public_key)
            except:
                raise ValueError('You have no eth.')
            tx_hash = receipt['transactionHash'].hex()
            if not receipt['status']:
                return Response(
                    {'status': False, 'link': f'https://rinkeby.etherscan.io/tx/{tx_hash}'},
                    status=status.HTTP_400_BAD_REQUEST)

            candidate.vote_count += 1
            candidate.party.vote_count += 1
            candidate.party.save()
            candidate.save()
            return Response(
                {'status': True, 'link': f'https://rinkeby.etherscan.io/tx/{tx_hash}'},
                status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
