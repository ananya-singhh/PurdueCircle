from distutils.command.config import config
from django.shortcuts import render
import pyrebase

# Create your views here.
config ={
    "apiKey": "AIzaSyDtC9VSkN8XQ-r81OkuJPynCxukrLPZ7uw",

    "authDomain": "purdueci.firebaseapp.com",

    "databaseURL": "https://purdueci-default-rtdb.firebaseio.com/",

    "projectId": "purdueci",

    "storageBucket": "purdueci.appspot.com",

    "messagingSenderId": "1005511059378",

    "appId": "1:1005511059378:web:fc0e02b927dd6fbfffa6ab",

    "measurementId": "G-SKRPBVVMYL"
}

firebase=pyrebase.initialize_app(config)
authe = firebase.auth()
database=firebase.database()