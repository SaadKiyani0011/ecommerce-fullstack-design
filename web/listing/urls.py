from listing import views
from django.urls import path

urlpatterns = [
    path('', views.listing, name='listing'),
    path('api/products/', views.api_products, name='api_products'),
]
