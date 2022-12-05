from django.shortcuts import render
from rest_framework import viewsets

from .models import Individual
from .serializers import IndividualSerializer


def index(request):
    return render(request, 'tree/index.html')

def individual(request, individual_id):
    individual = Individual.objects.get(id=individual_id)
    #mates = individual.mates
    context = {
        'individual': individual,
        #'mates': mates,
    }
    return render(request, 'tree/tree.html', context)

class IndividualView(viewsets.ModelViewSet):
    serializer_class = IndividualSerializer
    queryset = Individual.objects.all()
