from . import db

class User(db.Document):
    email = db.StringField()
    password = db.StringField()

class Question(db.Document):
    entry = db.StringField()
    answer = db.StringField()