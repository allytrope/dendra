from django.db import models


class Individual(models.Model):
    id = models.CharField(max_length=6, primary_key=True)
    sire = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name="offspring_of_sire")
    dam = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name="offspring_of_dam")
    sex = models.CharField(max_length=1, null=True, blank=True, choices=[
        ('♂', 'Male'),
        ('♀', 'Female'),
        ('', 'Unknown')
    ])
    
    @property
    def offspring(self, coparent=None):
        if self.sex == "♂":
            offspring = Individual.objects.filter(sire=self)
            if coparent != None:
                offspring = offspring.filter(dam=coparent)
        elif self.sex == "♀":
            offspring = Individual.objects.filter(dam=self)
            if coparent != None:
                offspring = offspring.filter(sire=coparent)
        else:
            print("Unknown sex.")
            offspring = Individual.objects.none()
        return offspring

    @property
    def mates(self):
        if self.sex == "♂":
            mates = Individual.objects.filter(id__in = self.offspring.values("dam"))
        elif self.sex == "♀":
            mates = Individual.objects.filter(id__in = self.offspring.values("sire"))
        else:
            print("Unknown sex.")
            mates = Individual.objects.none()
        return mates

    @property
    def siblings(self):
        print(self.sire)
        siblings = Individual.objects.filter(sire=self.sire).filter(dam=self.dam).exclude(id=self.id)
        return siblings

    def __str__(self):
        return self.id

    class Meta:
        ordering = ['id']

