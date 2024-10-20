from django.db import models

# Create your models here.
from django.db import models

class Snack(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=5, decimal_places=2)
    image = models.ImageField(upload_to='snacks/', null=True, blank=True)
    ratings = models.FloatField(default=0.0)  # Add ratings field

    def __str__(self):
        return self.name
