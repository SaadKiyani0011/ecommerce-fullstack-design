from django.shortcuts import render

def details_view(request):
    return render(request, 'details.html')
