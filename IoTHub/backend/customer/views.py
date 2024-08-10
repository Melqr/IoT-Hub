# Django Packages
from django.shortcuts import get_object_or_404, redirect, render
from django.http import JsonResponse, HttpResponseNotFound, HttpResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
from django.db import transaction
from django.urls import reverse
from django.conf import settings


# Restframework Packages
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework import status

# Serializers
from userauths.serializer import MyTokenObtainPairSerializer, ProfileSerializer, RegisterSerializer
from store.serializers import CancelledOrderSerializer, NotificationSerializer, CartSerializer, CartOrderItemSerializer, CouponUsersSerializer, ProductSerializer, TagSerializer ,CategorySerializer, DeliveryCouriersSerializer, CartOrderSerializer, GallerySerializer, BrandSerializer, ProductFaqSerializer, ReviewSerializer,  SpecificationSerializer, CouponSerializer, ColorSerializer, AddressSerializer, WishlistSerializer, ConfigSettingsSerializer

# Models
from userauths.models import Profile, User 
from store.models import CancelledOrder, Notification, CartOrderItem, CouponUsers, Cart, Product, Tag ,Category, DeliveryCouriers, CartOrder, Gallery, Brand, ProductFaq, Review,  Specification, Coupon, Color, Address, Wishlist
from addon.models import ConfigSettings, Tax
from vendor.models import Vendor

# Others Packages
import json
from decimal import Decimal
#import stripe
import requests

class OrdersAPIView(generics.ListAPIView):
    serializer_class = CartOrderSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = User.objects.get(id=user_id)

        orders = CartOrder.objects.filter(buyer=user, payment_status="paid")
        return orders
    

class OrdersDetailAPIView(generics.RetrieveAPIView):
    serializer_class = CartOrderSerializer
    permission_classes = (AllowAny,)
    lookup_field = 'user_id'

    def get_object(self):
        user_id = self.kwargs['user_id']
        order_oid = self.kwargs['order_oid']

        user = User.objects.get(id=user_id)

        order = CartOrder.objects.get(buyer=user, payment_status="paid", oid=order_oid)
        return order
    
class WishlistCreateAPIView(generics.CreateAPIView):
    serializer_class = WishlistSerializer
    permission_classes = (AllowAny, )

    def create(self, request):
        payload = request.data 

        product_id = payload['product_id']
        user_id = payload['user_id']

        product = Product.objects.get(id=product_id)
        user = User.objects.get(id=user_id)

        wishlist = Wishlist.objects.filter(product=product,user=user)
        if wishlist:
            wishlist.delete()
            return Response( {"message": "Removed From Wishlist"}, status=status.HTTP_200_OK)
        else:
            wishlist = Wishlist.objects.create(
                product=product,
                user=user,
            )
            return Response( {"message": "Added To Wishlist"}, status=status.HTTP_201_CREATED)

    

class WishlistAPIView(generics.ListAPIView):
    serializer_class = WishlistSerializer
    permission_classes = (AllowAny, )

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = User.objects.get(id=user_id)
        wishlist = Wishlist.objects.filter(user=user,)
        return wishlist
    

class CustomerNotificationView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = (AllowAny, )

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = User.objects.get(id=user_id)
        return Notification.objects.filter(user=user)


class CustomerUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = (AllowAny, )