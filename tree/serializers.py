from rest_framework import serializers

from .models import Individual

class IndividualSerializer(serializers.ModelSerializer):

    class Meta:
        model = Individual
        fields = ('id', 'sire', 'dam', 'sex')