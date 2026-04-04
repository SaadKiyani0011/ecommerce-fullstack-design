from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages

def login_view(request):
    if request.user.is_authenticated:
        return redirect('home')

    if request.method == 'POST':
        action = request.POST.get('action')
        
        if action == 'login':
            email = request.POST.get('signin-email')
            password = request.POST.get('signin-password')
            
            try:
                user_obj = User.objects.get(email=email)
                username = user_obj.username
            except User.DoesNotExist:
                username = email

            user = authenticate(request, username=username, password=password)
            
            if user is not None:
                login(request, user)
                return redirect('home')
            else:
                messages.error(request, 'Invalid credentials')
                
        elif action == 'register':
            name = request.POST.get('signup-name')
            email = request.POST.get('signup-email')
            password = request.POST.get('signup-password')
            
            if User.objects.filter(email=email).exists() or User.objects.filter(username=email).exists():
                messages.error(request, 'Email already exists')
            else:
                user = User.objects.create_user(username=email, email=email, password=password, first_name=name)
                login(request, user)
                return redirect('home')

    return render(request, 'login.html')

def logout_view(request):
    logout(request)
    return redirect('home')
