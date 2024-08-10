<!-- drf-yasg snippret -->
schema_view = get_schema_view(
   openapi.Info(
      title="E-commerce Backend APIs",
      default_version='v1',
      description="This is the API documentation for e-commerce project APIs",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="desphixs@gmail.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)
<!-- URL Patterns for drf-yasg -->
path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    