from django.contrib import admin
from django.urls import path
from .views import BeverageListView,CoffeeListView

urlpatterns = [
    path('info/',BeverageListView.as_view(),name='beverages-view'),
    path('cinfo/',CoffeeListView.as_view(),name='coffee-view')
]