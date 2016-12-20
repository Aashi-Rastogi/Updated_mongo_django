from django.shortcuts import render, get_object_or_404
from registration.models import Value
from django.http import HttpResponse
def letsPostIt(request):
 post_text = request.POST.get('location')
 post = Value(text=post_text)
 post.save()
 return HttpResponse()
from registration.models import Value 
def gmaps(request):
 val = Value.objects.all()
 return render(request, 'gmaps.html', {'values': val})

