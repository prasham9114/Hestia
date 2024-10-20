from rest_framework import serializers
from .models import Beverage,Coffee

class BeverageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Beverage    
        fields = ['id', 'name', 'beverage_type', 'image', 'ratings', 'price','description']

class CoffeeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Coffee
        fields=['id', 'name', 'image', 'ratings', 'price','description']