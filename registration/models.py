from django.db import models
from mongoengine import *
class Employee(Document):
    firstname = StringField(max_length=120, required=True)
    lastname = StringField(max_length=500, required=True)
    pwd = StringField(max_length=500, required=True)
	