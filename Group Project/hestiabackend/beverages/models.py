from django.db import models

# Create your models here.
from django.db import models

class Beverage(models.Model):
    BEVERAGE_TYPES = (
        ('hot', 'Hot'),
        ('cold', 'Cold'),
    )

    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=5, decimal_places=2)
    beverage_type = models.CharField(max_length=4, choices=BEVERAGE_TYPES)
    image = models.ImageField(upload_to='beverages/', null=True, blank=True)
    ratings = models.FloatField(default=0.0)  # Add ratings field

    def __str__(self):
        return self.name
    
class Coffee(models.Model):
    BEVERAGE_TYPES = (
        ('hot', 'Hot'),
        ('cold', 'Cold'),
    )

    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=5, decimal_places=2)
    image = models.ImageField(upload_to='Coffee/', null=True, blank=True)
    ratings = models.FloatField(default=0.0)  # Add ratings field

    def __str__(self):
        return self.name

    

