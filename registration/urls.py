from django.conf.urls import url
from registration import views as reg_views
urlpatterns = [
		url(r'^gmaps/',reg_views.gmaps),
		url(r'^gmaps/pos/',reg_views.letsPostIt),
]