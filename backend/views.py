from flask import Blueprint, jsonify, request
from . import db
from .models import User
from flask_cors import cross_origin

main = Blueprint('main', __name__)

@main.route('/add_user', methods=['POST'])
@cross_origin()
def add_user():
    user_data = request.get_json()
    new_user = User(email=user_data['email'], password=user_data['password'])
    new_user.save()
    return 'Done', 201

@main.route('/login', methods=['POST', 'GET'])
@cross_origin()
def login():
    user_data = request.get_json()
    user = User.objects(email=user_data['email'], password=user_data['password']).get_or_404()
    return jsonify(user)

@main.route('/questions')
def questions():
    questions = []
    return jsonify({'questions' : questions})

