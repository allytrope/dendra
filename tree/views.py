from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets

# import altair as alt
# from django_vega.views import AltairTemplateView

from .models import Individual
from .serializers import IndividualSerializer


def home(request):
    return render(request, 'tree/home.html')

def vega_json(request, figure):
    import json
    import os
    with open(os.path.dirname(__file__) + f'/static/tree/figures/{figure}.json') as f:
        fig = json.load(f)
        return HttpResponse(json.dumps(fig), content_type="application/json")

def species(request, species):
    context = {
        "species": species
        }
    return render(request, 'tree/species.html', context)

def individual(request, proband_str):
    proband_ids = proband_str.split("+")
    if len(proband_ids) == 1:
        proband_id = proband_ids[0]
        proband = Individual.objects.get(id=proband_id)
        #mates = individual.mates
        context = {
            'individual': proband,
            'probands': [proband],
            #'mates': mates,
        }
        return render(request, 'tree/tree.html', context)
    if len(proband_ids) == 2:
        mrca_view(request, proband_ids[0], proband_ids[1])


def mrca_view(request, individual_id1, individual_id2):
    individual1 = Individual.objects.get(id=individual_id1)
    individual2 = Individual.objects.get(id=individual_id2)

    from queue import LifoQueue
    # def ancestors(proband: Individual):
    #     queue = LifoQueue()
    #     queue.put(proband)
    #     ancestors = [proband]
    #     while not queue.empty():
    #         indiv = queue.get()
    #         try:
    #             dam = indiv.dam
    #         #except KeyError:
    #         except:
    #             dam = None
    #         else:
    #             queue.put(dam)
    #             ancestors.append(dam)
    #         try:
    #             sire = indiv.sire
    #         #except KeyError:
    #         except:
    #             sire = None
    #         else:
    #             queue.put(sire)
    #             ancestors.append(sire)
    #     print(ancestors)
    #     return ancestors
    
    def ahnentafel(proband: Individual):
        ancestors = [proband]
        # while a generation isn't all None
        generation = ancestors

        while True:
            if generation[-1]:
                pass
            next_generation = []
            for individual in generation:
                try:
                    sire = individual.sire
                except:
                    pass
                else:
                    next_generation.append(sire)
                try:
                    dam = ancestors[index].dam
                except:
                    pass
                else:
                    next_generation.append(dam)
            generation = next_generation


    ancestors1 = ahnentafel(individual1)
    ancestors2 = ahnentafel(individual2)
    print(set(ancestors1).intersection(set(ancestors2)))

    # def mrca(proband1, proband2):
    #     ancestors1 = ancestors(proband1)
    #     ancestors2 = ancestors(proband2)





class IndividualView(viewsets.ModelViewSet):
    serializer_class = IndividualSerializer
    queryset = Individual.objects.all()
