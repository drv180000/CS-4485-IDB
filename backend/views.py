from flask import Blueprint, jsonify, request
from . import db
from .models import User, Question
from flask_cors import cross_origin
import datetime
from test import question_answer

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
    user = User.objects(email=user_data['email'], password=user_data['password'])
    print(jsonify(user))
    #return jsonify(user)

@main.route('/questions', methods=['POST', 'GET'])
@cross_origin()
def questions():
    if (request.method == 'GET'):
        # return 'hello from server'
        questions = []
        for question in Question.objects:
            questions.append(question)
        return jsonify({'questions' : questions})
    if (request.method == 'POST'):
        #receive newly asked question
        question_data = request.get_json()
        #entry = question_data['entry']
        print(question_data)
        return 'Done', 201

        #query all questions in database and insert into list
        question_list = []
        for question in Question.objects:
            question_list.append(question.entry)
        question_answer(question_list, entry)
        
        new_question = Question(title=question_data['title'], author=question_data['author'], time=datetime.datetime.utcnow, entry=question_data['entry'])
