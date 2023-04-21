from flask import Flask
from flask_mongoengine import MongoEngine
from flask_cors import CORS


db = MongoEngine()

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config['MONGODB_SETTINGS'] = {
        'host': 'mongodb+srv://*************'
    }
    
    db.init_app(app)

    from .views import main
    app.register_blueprint(main)
    return app
