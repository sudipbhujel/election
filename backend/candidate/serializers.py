from rest_framework import serializers

from core.models import Candidate
from eprofile.serializers import ProfileSerializer
from party.serializers import PartySerializer


class CandidateSerializer(serializers.ModelSerializer):
    public_key = serializers.CharField(
        source='profile.public_key', read_only=True)
    name = serializers.CharField(
        source='profile.get_full_name', read_only=True)
    image = serializers.ImageField(source='profile.image', read_only=True)
    party_name = serializers.CharField(source='party.name', read_only=True)
    party_logo = serializers.ImageField(source='party.logo')

    class Meta:
        model = Candidate
        fields = ('id', 'public_key', 'image', 'name',
                  'party_name', 'party_logo',
                  'vote_count', 'bio', 'plans', 'is_candidate')
        read_only_fields = ('id', 'is_candidate', )


class CandidateDetailSerializer(serializers.ModelSerializer):
    public_key = serializers.CharField(
        source='profile.public_key', read_only=True)
    profile = ProfileSerializer()
    party = PartySerializer()

    class Meta:
        model = Candidate
        fields = ('id', 'profile', 'party', 'public_key',
                  'vote_count', 'bio', 'plans', 'is_candidate')
        read_only_fields = ('id', 'is_candidate', )
