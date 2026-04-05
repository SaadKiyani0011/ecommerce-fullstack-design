from detail import views
from django.urls import path

urlpatterns = [
    path('', views.detail, name='detail'),
]
