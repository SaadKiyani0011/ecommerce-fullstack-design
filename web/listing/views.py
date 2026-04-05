from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from .models import Category, Product

def listing(request):
    return render(request, 'listing.html')

def api_products(request):
    db_structure = {}
    categories = Category.objects.all()
    for cat in categories:
        # Fetch products for this category and match the frontend naming (img, reviews)
        products = []
        for p in Product.objects.filter(category=cat):
            products.append({
                'id': p.id,
                'category': cat.slug,
                'name': p.name,
                'price': float(p.price),
                'rating': p.rating,
                'reviews': p.reviews_count,
                'description': p.description,
                'img': p.image_url,
                'gallery': [p.image_url], # Placeholder gallery
                'variants': { 'sizes': [], 'colors': [] } # Placeholder variants
            })
            
        # Dummy brands and features for the filters based on category
        brands = ["Apple", "Samsung", "Sony"] if cat.slug == 'electronics' else \
                 ["Toyota", "Honda", "Ford"] if cat.slug == 'automobile' else \
                 ["Nike", "Adidas", "Gucci"] if cat.slug == 'clothing' else \
                 ["IKEA", "HomePlus", "DecorArt"]
                 
        features = ["Wireless", "Bluetooth"] if cat.slug == 'electronics' else \
                   ["Automatic", "Hybrid"] if cat.slug == 'automobile' else \
                   ["Cotton", "Polyester"] if cat.slug == 'clothing' else \
                   ["Wooden", "Plastic", "Metal"]

        db_structure[cat.slug] = {
            'title': cat.name,
            'brands': brands,
            'features': features,
            'products': products
        }
        
    return JsonResponse(db_structure)