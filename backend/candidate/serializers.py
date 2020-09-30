from rest_framework import serializers

from core.models import Candidate


class CandidateSerializer(serializers.ModelSerializer):
    public_key = serializers.CharField(source='profile.public_key', read_only=True)
    # party_name = serializers.CharField(source='party.name', read_only=True)
    class Meta:
        model = Candidate
        fields = ('id', 'profile', 'party', 'public_key',
                  'vote_count', 'bio', 'plans', 'is_candidate')
        read_only_fields = ('id', 'is_candidate', )
