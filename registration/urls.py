from django.conf.urls import url
from registration import views as reg_views
urlpatterns = [
         url(r'^index/', reg_views.index),
]