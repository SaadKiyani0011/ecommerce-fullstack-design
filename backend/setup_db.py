import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'web.settings')
django.setup()

from listing.models import Category, Product, ProductGallery, ProductSizeOption, ProductColorOption

data = {
    "electronics": {
        "title": "Electronics & Tech",
        "brands": ["Apple", "Samsung", "Sony", "Dell"],
        "features": ["8GB RAM", "16GB RAM", "1TB SSD", "5G Ready"],
        "products": [
            { "id": 101, "name": "iPhone 15 Pro Max 256GB Platinum Edition", "price": 1199, "rating": 4.8, "reviews": 142, "description": "The ultimate iPhone featuring a titanium design, A17 Pro chip, Action button, and a pro camera system. Experience unparalleled performance and durability.", "img": "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=600", "gallery": ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=600", "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=600", "https://images.unsplash.com/photo-1512054502232-10a0a035d672?q=80&w=600"], "variants": { "sizes": ["128GB", "256GB", "512GB", "1TB"], "colors": ["#D4D3D1", "#1C1C1E", "#384152"] } },
            { "id": 102, "name": "Samsung Galaxy S24 Ultra", "price": 1099, "rating": 4.7, "reviews": 98, "description": "Unleash new ways to create, connect and more with the powerful Galaxy AI. The flat display and titanium exterior bring ultimate perfection.", "img": "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=600", "gallery": ["https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=600", "https://images.unsplash.com/photo-1610945265064-320d7ce7bb3e?q=80&w=600", "https://images.unsplash.com/photo-1621330396173-e3801265691d?q=80&w=600"], "variants": { "sizes": ["256GB", "512GB"], "colors": ["#2d2d2d", "#b5a397", "#5a5a5a"] } },
            { "id": 103, "name": "Sony WH-1000XM5 Noise Cancelling", "price": 349, "rating": 4.9, "reviews": 312, "description": "Industry-leading noise cancellation. Exceptional sound quality. Superior call clarity. Designed for all-day comfort.", "img": "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600", "gallery": ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600", "https://images.unsplash.com/photo-1612444530582-fc66183b16f7?q=80&w=600"], "variants": { "sizes": ["Standard"], "colors": ["#1c1c1c", "#d1cdca"] } },
            { "id": 104, "name": "Dell XPS 13 Ultra-Thin Laptop", "price": 1250, "rating": 4.6, "reviews": 85, "description": "The iconic design, now incredibly thin and light. Experience a completely redesigned interior and edge-to-edge keyboard.", "img": "https://images.unsplash.com/photo-1593642702821-c823b13eb295?q=80&w=600", "gallery": ["https://images.unsplash.com/photo-1593642702821-c823b13eb295?q=80&w=600", "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=600"], "variants": { "sizes": ["13-inch", "15-inch"], "colors": ["#c5c5c5", "#1c1c1c"] } }
        ]
    },
    "automobile": {
        "title": "Automobiles & Parts",
        "brands": ["Toyota", "Honda", "BMW", "Ford", "Tesla"],
        "features": ["Automatic", "Manual", "Hybrid", "Electric", "V8 Engine"],
        "products": [
            { "id": 201, "name": "Honda Civic Sedan 2024", "price": 25000, "rating": 4.6, "reviews": 120, "description": "Sleek styling and high-tech features make the Civic a standout in its class. Perfect balance of comfort and efficiency.", "img": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=600", "gallery": ["https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=600"], "variants": { "sizes": ["Sedan", "Hatchback"], "colors": ["#c0c0c0", "#ad0000", "#101010"] } }
        ]
    },
    "clothing": {
         "title": "Clothing & Fashion",
        "brands": ["Nike", "Adidas", "Gucci", "Zara", "H&M"],
        "features": ["Cotton", "Polyester", "Running", "Formal", "Casual"],
        "products": [
            { "id": 301, "name": "Nike Air Max 270 Sneakers", "price": 129, "rating": 4.7, "reviews": 852, "description": "The Nike Air Max 270 delivers visible air under every step. Updated for modern comfort, it pays homage to the original 1991 Air Max 180.", "img": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600", "gallery": ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600", "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=600"], "variants": { "sizes": ["US 8", "US 9", "US 10", "US 11"], "colors": ["#cf2027", "#151515", "#ffffff"] } }
        ]
    },
     "home": {
        "title": "Home Interiors",
        "brands": ["IKEA", "HomeSense", "Pottery Barn"],
        "features": ["Wood Material", "Stainless Metal", "Modern Design", "Classic Vintage"],
        "products": [
            { "id": 401, "name": "Modern Minimalist Velvet Sofa", "price": 450, "rating": 4.6, "reviews": 89, "description": "A beautifully crafted 3-seater sofa with premium velvet upholstery and sturdy solid wood legs. Elevate your living room instantly.", "img": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600", "gallery": ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600", "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=600"], "variants": { "sizes": ["2-Seater", "3-Seater", "Sectional"], "colors": ["#ff0000", "#8b0000", "#0000cd"] } }
        ]
    }
}

def load_data():
    Category.objects.all().delete()
    
    for cat_slug, cat_data in data.items():
        cat, _ = Category.objects.get_or_create(name=cat_data["title"], slug=cat_slug)
        for prod_data in cat_data["products"]:
            # assign a brand roughly if name has it
            brand = ""
            for b in cat_data["brands"]:
                if b.lower() in prod_data["name"].lower():
                    brand = b
                    break
                    
            p = Product.objects.create(
                category=cat,
                name=prod_data["name"],
                brand=brand,
                price=prod_data["price"],
                rating=prod_data["rating"],
                reviews_count=prod_data["reviews"],
                description=prod_data["description"],
                main_image_url=prod_data["img"]
            )
            
            for gal_url in prod_data["gallery"]:
                ProductGallery.objects.create(product=p, image_url=gal_url)
                
            for size in prod_data["variants"]["sizes"]:
                ProductSizeOption.objects.create(product=p, size=size)
                
            for color in prod_data["variants"]["colors"]:
                ProductColorOption.objects.create(product=p, color=color)

    print("Successfully loaded mock data into database.")

if __name__ == "__main__":
    load_data()
