import json
from .models import Category

def global_db_json(request):
    db_dict = {}
    
    # We might not have DB initialized properly yet during some commands, so we catch exceptions
    try:
        categories = Category.objects.prefetch_related(
            'products', 
            'products__gallery', 
            'products__sizes', 
            'products__colors'
        ).all()
        
        for cat in categories:
            cat_dict = {
                "title": cat.name,
                "brands": [],
                "features": ["Automatic", "Manual", "Wood Material", "Cotton", "8GB RAM"], # Mock features to keep UI sidebar populated
                "products": []
            }
            for prod in cat.products.all():
                if prod.brand and prod.brand not in cat_dict["brands"]:
                    cat_dict["brands"].append(prod.brand)
                    
                prod_dict = {
                    "id": prod.id,
                    "category": cat.slug,
                    "name": prod.name,
                    "brand": prod.brand,
                    "price": float(prod.price),
                    "rating": float(prod.rating),
                    "reviews": prod.reviews_count,
                    "description": prod.description,
                    "img": prod.main_image_url,
                    "gallery": [g.image_url for g in prod.gallery.all()],
                    "variants": {
                        "sizes": [s.size for s in prod.sizes.all()],
                        "colors": [c.color for c in prod.colors.all()]
                    }
                }
                cat_dict["products"].append(prod_dict)
            db_dict[cat.slug] = cat_dict
            
    except Exception as e:
        db_dict = {}
        
    return {'db_data': db_dict}
