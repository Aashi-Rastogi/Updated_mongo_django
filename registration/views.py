from django.shortcuts import render
from registration.models import Employee
def index(request):
   employee = Employee.objects.create(
        email="pedro.kong@company.com",
        first_name="Pedro",
        last_name="Kong"
   )
   employee.save()
   return render(request, 'index.html', {})