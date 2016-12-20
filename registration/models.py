from django.db import models
from mongoengine import *
class Value(Document):
    text = StringField(max_length=120, required=True)
def __str__(self):
 return self.title

	