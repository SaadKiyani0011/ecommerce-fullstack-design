from django.contrib import admin
from .models import Category, Product, ProductGallery, ProductSizeOption, ProductColorOption

class ProductGalleryInline(admin.TabularInline):
    model = ProductGallery
    extra = 1

class ProductSizeInline(admin.TabularInline):
    model = ProductSizeOption
    extra = 1

class ProductColorInline(admin.TabularInline):
    model = ProductColorOption
    extra = 1

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'brand')
    list_filter = ('category', 'brand')
    search_fields = ('name', 'description')
    inlines = [ProductGalleryInline, ProductSizeInline, ProductColorInline]
