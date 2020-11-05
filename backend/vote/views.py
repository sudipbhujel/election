from rest_framework import permissions
from rest_framework import views
from rest_framework import request
from rest_framework.response import Response
from rest_framework import status
from rest_framework.renderers import (
    JSONRenderer,
    BrowsableAPIRenderer,
)

from ethereum.voter import Voter

from id.decode import decode_qr

from .serializers import VoteSerializer, ValidateIdSerializer
from .tasks import vote_succeeded
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
        if serializer.is_valid():
            # needs to validate candidate's id
            candidate = Candidate.objects.get(
                id=serializer.data['candidate_id'])
            voter = Voter(serializer.data['private_key'])
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
            vote_succeeded.delay(request.user.citizenship_number)
            return Response(
                {'status': True, 'link': f'https://rinkeby.etherscan.io/tx/{tx_hash}'},
                status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ValidateIdView(views.APIView):
    """Validates ID card"""
    serializer_class = ValidateIdSerializer
    renderer_classes = (JSONRenderer, BrowsableAPIRenderer)
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        serializer = ValidateIdSerializer(
            data=request.data, context={'request': request})
        print("Serializer is", serializer)
        if serializer.is_valid():

            data = {
                'citizenship_number': request.user.citizenship_number,
                'status': True,
                'voted': False
            }

            return Response(data, status=status.HTTP_200_OK)
        return Response({
            'status': False,
            'message': 'ID card is Invalid, Please upload your ID.',
            'errors': serializer.errors
        }, status=status.HTTP_406_NOT_ACCEPTABLE)
