from django.urls import path
from . import views

urlpatterns = [
    path('create_order/', views.create_order, name='create_order'),
    path('recent_orders/', views.recent_orders, name='recent_orders'),

]
