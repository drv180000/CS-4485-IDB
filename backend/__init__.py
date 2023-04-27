from flask import Flask
from flask_mongoengine import MongoEngine
from flask_cors import CORS


db = MongoEngine()

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config['MONGODB_SETTINGS'] = {
        'host': 'mongodb+srv://idbadmin:idbpassword@cluster0.ozklwjl.mongodb.net/?retryWrites=true&w=majority'
    }
    
    db.init_app(app)

    from .views import main
    app.register_blueprint(main)
    return app
