from django.contrib import admin
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
