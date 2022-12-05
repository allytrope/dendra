from django.urls import path

from . import views


urlpatterns = [
    #path('', views.index, name='index'),
    path('<str:individual_id>/', views.individual, name='individual')
]