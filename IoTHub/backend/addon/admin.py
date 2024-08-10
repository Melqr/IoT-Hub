from django.contrib import admin
from addon.models import Tax, ConfigSettings
from import_export.admin import ImportExportModelAdmin

class TaxAdmin(ImportExportModelAdmin):
    list_editable = [ 'rate', 'active']
    list_display = ['country', 'rate', 'active']

admin.site.register(Tax, TaxAdmin)
admin.site.register(ConfigSettings)
# Register your models here.
