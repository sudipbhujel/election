from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from core.models import Candidate
from id.decode import decode_qr
from ethereum.functions import voter
from ethereum.accounts import get_address


class VoteSerializer(serializers.Serializer):
    private_key = serializers.CharField()
    candidate_id = serializers.CharField()

    def validate(self, attrs):
        private_key = attrs['private_key']
        public_address = get_address(private_key)
        candidate_id = attrs.get('candidate_id')
        candidate = Candidate.objects.filter(id=candidate_id)
        public_key = self.context.get('request').user.profile.public_key
        votr = voter(public_address)

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


class ValidateIdSerializer(serializers.Serializer):
    id_card = serializers.ImageField()

    class Meta:
        fields = ('id_card',)

    def validate(self, attrs):
        id = decode_qr(attrs['id_card'])
        public_address = get_address(id['private_key'])
        cit_number = self.context.get('request').user.citizenship_number
        public_key = self.context.get('request').user.profile.public_key
        votr = voter(public_address)

        if not cit_number == int(id['citizenship_number']):
            raise serializers.ValidationError(
                'Citizenship number doesn\'t match.',
                code='citizenship_number')

        if not public_key == public_address:
            raise serializers.ValidationError(
                'Public key doesn\'t match', code='public_key')

        if not votr[1]:
            raise serializers.ValidationError(
                'Public key is not registered in eth-net.')

        if votr[2]:
            raise ValidationError('You already voted.')

        return attrs
