import os
import django
import random

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'web.settings')
django.setup()

from listing.models import Category, Product

def seed_database():
    print("Clearing existing data...")
    Category.objects.all().delete()
    Product.objects.all().delete()

    print("Creating categories...")
    categories_data = [
        {'name': 'Electronics & Tech', 'slug': 'electronics', 'icon': '💻'},
        {'name': 'Automobiles', 'slug': 'automobile', 'icon': '🚗'},
        {'name': 'Clothing and wear', 'slug': 'clothing', 'icon': '👕'},
        {'name': 'Home Interiors', 'slug': 'home', 'icon': '🛋️'},
    ]
    
    categories = {}
    for data in categories_data:
        cat = Category.objects.create(**data)
        categories[data['slug']] = cat

    print("Creating dummy products...")
    # Products data matching slugs
    products_data = [
        # Electronics
        {
            'category': categories['electronics'],
            'name': 'MacBook Pro 16" M3 Max',
            'price': 3499.99,
            'rating': 4.9,
            'reviews_count': 128,
            'description': 'The ultimate pro laptop with M3 Max chip.',
            'image_url': 'https://s.yimg.com/os/creatr-uploaded-images/2023-11/c9fadd00-7c25-11ee-bbf7-be24cfc3fcfe'
        },
        {
            'category': categories['electronics'],
            'name': 'Samsung Galaxy S24 Ultra',
            'price': 1299.00,
            'rating': 4.8,
            'reviews_count': 342,
            'description': 'AI-powered smartphone with titanium frame.',
            'image_url': 'https://m-cdn.phonearena.com/images/article/64576-wide-two_1200/The-Best-Phones-My-top-picks-tried-and-tested.jpg'
        },
        {
            'category': categories['electronics'],
            'name': 'Sony WH-1000XM5 Headphones',
            'price': 399.99,
            'rating': 4.7,
            'reviews_count': 890,
            'description': 'Industry leading noise canceling headphones.',
            'image_url': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUVkGTZFKBdhD1pyFx-2SHavPUhVnc-dYFgA&s'
        },
        {
            'category': categories['electronics'],
            'name': 'Apple Watch Series 9',
            'price': 399.00,
            'rating': 4.6,
            'reviews_count': 560,
            'description': 'Smartwatch with advanced health features.',
            'image_url': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBB-k00lBy0s-LBiui0GSeKaWdm__iaFXozQ&s'
        },
        # Automobiles
        {
            'category': categories['automobile'],
            'name': 'Tesla Model 3 Custom Alloy Wheels',
            'price': 1200.00,
            'rating': 4.5,
            'reviews_count': 45,
            'description': 'Premium black forged alloy wheels 19-inch.',
            'image_url': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqL_zDihT_LSTU1E-gJOf22yZ5gq8tF2G_8g&s'
        },
        {
            'category': categories['automobile'],
            'name': 'Premium Racing Seats',
            'price': 450.00,
            'rating': 4.8,
            'reviews_count': 112,
            'description': 'Ergonomic bucket seats for cars.',
            'image_url': 'https://m.media-amazon.com/images/I/71oX3L2X7HL._AC_SL1500_.jpg'
        },
        # Clothing
        {
            'category': categories['clothing'],
            'name': 'Men\'s Leather Jacket',
            'price': 120.50,
            'rating': 4.7,
            'reviews_count': 32,
            'description': 'Premium black leather biker jacket.',
            'image_url': 'https://www.thejacketmaker.pk/cdn/shop/files/Leather_Jackets_2048x.webp?v=1693201393'
        },
        {
            'category': categories['clothing'],
            'name': 'Designer Summer T-Shirt Set',
            'price': 45.00,
            'rating': 4.4,
            'reviews_count': 88,
            'description': 'Pack of 3 multi-color premium cotton t-shirts.',
            'image_url': 'https://teetall.pk/cdn/shop/files/Screenshot-2024-06-01-15-21-20-225_com.android.chrome-edit.jpg?crop=center&height=1629&v=1717285721&width=1220'
        },
        {
            'category': categories['clothing'],
            'name': 'Professional Grey Suit',
            'price': 250.00,
            'rating': 4.9,
            'reviews_count': 15,
            'description': 'Tailored fit premium grey suit for men.',
            'image_url': 'https://www.mysuittailor.com/cdn/shop/files/NY_Grey_Suit-upload.jpg?v=1753165727'
        },
        # Home
        {
            'category': categories['home'],
            'name': 'Luxury Soft Sofa Chair',
            'price': 199.99,
            'rating': 4.6,
            'reviews_count': 23,
            'description': 'Comfortable plushora sofa chair for living room.',
            'image_url': 'https://renome.pk/wp-content/uploads/2025/11/Plushora-Sofa-Chair-3-1024x681.jpg'
        },
        {
            'category': categories['home'],
            'name': 'Modern Kitchen Blender',
            'price': 85.00,
            'rating': 4.3,
            'reviews_count': 94,
            'description': 'High-speed professional blender for home.',
            'image_url': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEsqfoaKbmRjErg90s50ecAV2UFInqsyn4KA&s'
        },
        {
            'category': categories['home'],
            'name': 'Premium Minimalist Desk',
            'price': 210.00,
            'rating': 4.8,
            'reviews_count': 56,
            'description': 'Wooden minimalist work desk with metallic legs.',
            'image_url': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6-N8X_Y1J2xM7a2M_vA4T4Z8bE5M4C8sXpA&s'
        }
    ]

    for p in products_data:
        Product.objects.create(**p)
        print(f"Created Product: {p['name']}")

    print("Database seeding Complete! Added categories and products.")

if __name__ == '__main__':
    seed_database()
