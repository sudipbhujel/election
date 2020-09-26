from rest_framework import serializers
from core.models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    """
    Serializes Profile models.
    """
    class Meta:
        model = Profile
        fields = ('id', 'public_key', 'first_name', 'last_name',
                  'image', 'gender', 'dob', 'father_name',
                  'mother_name', 'citizenship_issued_district',
                  'citizenship', 'is_voted', 'is_voter', 'province',
                  'district', 'municipality', 'ward', 'tole',)
        read_only_fields = ('id', 'public_key', 'is_voted', 'is_voter',)

    def create(self, validated_data):
        """
        Create Profile for user.
        """
        request = self.context.get('request')
        profile = Profile(**validated_data)
        profile.user = request.user
        profile.save()
        return profile


class ManageProfileSerializer(serializers.ModelSerializer):
    """
    Serializes Profile model and update.
    """
    class Meta:
        model = Profile
        fields = ('id', 'public_key', 'first_name', 'last_name',
                  'image', 'gender', 'dob', 'father_name',
                  'mother_name', 'citizenship_issued_district',
                  'citizenship', 'is_voted', 'is_voter', 'province',
                  'district', 'municipality', 'ward', 'tole',)
        read_only_fields = ('id', 'public_key', 'is_voted', 'is_voter',)
