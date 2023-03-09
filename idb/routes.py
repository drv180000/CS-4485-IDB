from idb import app # import table names here
from flask import render_template, redirect, url_for, request, session
from idb.forms import RegisterForm, LoginForm
import nltk, string
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize,sent_tokenize

# dictionary for users, to be used as the database for now
usersdict = {}

# home page
@app.route('/', methods=['GET', 'POST'])
@app.route('/home', methods=['GET', 'POST'])
def home():
    return render_template('home.html')

# register page
@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm()
    if form.validate_on_submit():
        email = request.form['email']
        password = request.form['password']
        usersdict.update({email: password})

        # insert user into the database, 'users' is the table name
        # use this when database is connected
        # users.insert_one({'email': email, 'password': password})

        return redirect(url_for('home'))
    return render_template('register.html', form = form)

# login page
# query database to find if user exists
@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        if(email in usersdict.keys()):
            return redirect(url_for('home'))
        else:
            return redirect(url_for('login'))

        # query database to find if user exists, use this when database is connected
        # if (users.find_one({'email': email, 'password': password})):
        #     return redirect(url_for('home'))
        # else:
        #     return redirect(url_for('login'))
    return render_template('login.html', form = form)

# post question page
@app.route('/post', methods=['GET', 'POST'])
def post():
    if request.method == "POST":
        question = request.form['question']
        # remove punctuation and tokenize sentence
        question = question.translate(str.maketrans('', '', string.punctuation))
        stop_words = set(stopwords.words('english'))
        tokenize_words = nltk.word_tokenize(question)
        print(tokenize_words)
        without_stop_words = []
        # loop through sentence and remove stop words
        for word in tokenize_words:
            if word not in stop_words:
                without_stop_words.append(word)
        print(without_stop_words)
        return redirect(url_for('home'))
    return render_template('post.html')
