from django.db import models
import roman


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
    def parents(self):
        parents = []
        if self.sire:
            parents.append(self.sire)
        if self.dam:
            parents.append(self.dam)
        #return [self.sire, self.dam]
        return parents

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

    @property
    def generations(self):
        max_height = 1
        def inner_loop(individual, cur_height, max_height):
            # print("Indiv", individual)
            # print(self.offspring)
            # print("cur height:", cur_height)
            # print("max height:", max_height)
            for offspring in individual.offspring:
                cur_height += 1
                if cur_height > max_height:
                    max_height += 1
                max_height = inner_loop(individual=offspring, cur_height=cur_height, max_height=max_height)
                cur_height -= 1
            return max_height
        max_height = inner_loop(individual=self, cur_height=1, max_height=max_height)
        return [roman.toRoman(num) for num in range(1, max_height + 1)]
        
    @property
    def reverse_generations(self):
        max_height = 1
        def inner_loop(individual, cur_height, max_height):
            for parent in individual.parents:
                cur_height += 1
                if cur_height > max_height:
                    max_height += 1
                max_height = inner_loop(individual=parent, cur_height=cur_height, max_height=max_height)
                cur_height -= 1
            return max_height
        max_height = inner_loop(individual=self, cur_height=1, max_height=max_height)
        return [roman.toRoman(num) for num in range(1, max_height + 1)]

    
    # @property
    # def reverse_generations(self):
    #     return reversed(self.generations)

    def __str__(self):
        return self.id

    class Meta:
        ordering = ['id']

