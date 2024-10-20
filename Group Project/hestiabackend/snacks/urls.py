from django.contrib import admin
from django.urls import path,include
from .views import SnackListView

urlpatterns = [
    path('info/',SnackListView.as_view(),name='snack-list')
]