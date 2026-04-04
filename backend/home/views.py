from django.shortcuts import render

from listing.models import Product

def home_view(request):
    recommended_products = Product.objects.all().order_by('?')[:5]
    deals_products = Product.objects.all().order_by('?')[:5]
    return render(request, 'home.html', {
        'recommended_products': recommended_products,
        'deals_products': deals_products
    })
