# initialization file
from flask import Flask
from flask_pymongo import PyMongo, MongoClient

app = Flask(__name__)
# generated random string for secret key
app.config['SECRET_KEY'] = '382f8abb48e4ecdb8fc79ba7380103b6'

# establish connection to MongoDB 
# cluster = MongoClient("<INSERT MONGODB URI>")

# create instance of the database
# db = cluster["IDB"]

# create instance of the table
# users = db["users"]
# questions = db["questions"]

from idb import routes