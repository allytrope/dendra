from django.urls import path

from . import views


urlpatterns = [
    path('', views.home, name='home'),
    path('species/<str:species>/', views.species, name='species'),
    #path('<str:individual_id1>+<str:individual_id2>/', views.mrca_view, name='mrca_view'),
    path('<str:proband_str>/', views.individual, name='individual'),
    path('figures/<str:figure>.json', views.vega_json, name='vega_json'),
]