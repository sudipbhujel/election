from core.models import Party

from rest_framework import serializers


class PartySerializer(serializers.ModelSerializer):
    """
    Serializes the Party model.
    """
    class Meta:
        model = Party
        fields = ('id', 'name', 'description', 'slogan',
                  'logo', 'manifesto', 'plans', 'vote_count')
