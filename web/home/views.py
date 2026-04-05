from django.shortcuts import render
from listing.models import Product

def home(request):
    deals = Product.objects.all().order_by('?')[:5]
    home_products = Product.objects.filter(category__slug='home')[:4]
    electronics_products = Product.objects.filter(category__slug='electronics')[:4]
    recommended = Product.objects.all().order_by('?')[:5]
    
    context = {
        'deals': deals,
        'home_products': home_products,
        'electronics_products': electronics_products,
        'recommended': recommended,
    }
    return render(request, 'home.html', context)