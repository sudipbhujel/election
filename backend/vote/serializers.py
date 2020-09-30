from django.http import request
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response

from core.models import Candidate
from id.decode import decode_qr
from ethereum.functions import voter
from ethereum.accounts import get_address


class VoteSerializer(serializers.Serializer):
    id_card = serializers.ImageField()
    candidate_id = serializers.CharField()

    def validate(self, attrs):
        id = decode_qr(attrs['id_card'])
        public_address = get_address(id['private_key'])
        cit_number = self.context.get('request').user.citizenship_number
        candidate_id = attrs.get('candidate_id')
        candidate = Candidate.objects.filter(id=candidate_id)
        public_key = self.context.get('request').user.profile.public_key
        votr = voter(public_address)

        if not cit_number == int(id['citizenship_number']):
            raise serializers.ValidationError('Invalid ID.')

        if not public_key == public_address:
            raise serializers.ValidationError('Invalid public')

        if not votr[1]:
            raise serializers.ValidationError(
                'Public key is not registered in eth-net.')

        if votr[2]:
            raise ValidationError('Your already voted.')
        if not candidate.exists():
            raise serializers.ValidationError('Candidate not exist.')

        return attrs
