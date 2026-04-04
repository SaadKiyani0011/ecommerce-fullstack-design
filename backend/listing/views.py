from django.shortcuts import render

def listing_view(request):
    return render(request, 'listing.html')
