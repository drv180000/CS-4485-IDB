from . import db

class User(db.Document):
    email = db.StringField()
    password = db.StringField()

class Question(db.Document):
    title = db.StringField()
    author = db.StringField()
    time = db.DateTimeField()
    entry = db.StringField()