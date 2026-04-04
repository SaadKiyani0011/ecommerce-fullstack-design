import os

apps = ['home', 'listing', 'details', 'cart', 'login']
base_dir = r"C:\Users\saadk\Desktop\Web Dev Intern\backend"

for app in apps:
    view_content = f"""from django.shortcuts import render

def {app}_view(request):
    return render(request, '{app}.html')
"""
    view_path = os.path.join(base_dir, app, 'views.py')
    with open(view_path, 'w', encoding='utf-8') as f:
        f.write(view_content)

urls_content = """from django.contrib import admin
from django.urls import path
from home.views import home_view
from listing.views import listing_view
from details.views import details_view
from cart.views import cart_view
from login.views import login_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home_view, name='home'),
    path('home.html', home_view, name='home_html'),
    path('listing.html', listing_view, name='listing'),
    path('details.html', details_view, name='details'),
    path('cart.html', cart_view, name='cart'),
    path('login.html', login_view, name='login'),
]
"""
urls_path = os.path.join(base_dir, 'web', 'urls.py')
with open(urls_path, 'w', encoding='utf-8') as f:
    f.write(urls_content)

print("Views and URLs setup complete.")
