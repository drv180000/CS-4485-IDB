from transformers import pipeline
from PyPDF2 import PdfReader
import nltk
from nltk.corpus import stopwords
import string


def question_answer(entry):
    doc_dict = {'syllabus': '/Users/angelogonzales/IDB/CS-4485-IDB/CS4375-Spring2023-Syllabus.pdf', 
                'Assignment 1': '/Users/angelogonzales/IDB/CS-4485-IDB/CS4375-Spring2023-Assignment#1.pdf'}
    qa_dict = {'how hard is assignment 1?': 'its very hard',
            'do we have class tomorrow?': 'no we dont have class tomorrow',
            'can someone post the notes for class': 'here are the notes'}

    # model used for question answering
    model_name = "deepset/bert-large-uncased-whole-word-masking-squad2"


    ##### test questions to ask
    # is assignment 1 hard?
    # when are the professors office hours?
    # when is assignment 1 due?
    # is there class tomorrow?
    # can i turn in an assignment late?
    # whats the policy on late assignments?
    
    
    #question = "is assignment 1 hard?"
    question = entry
    # qa_list = question_list
    
    
    
    # remove punctuation and tokenize
    questionToken = question.translate(str.maketrans('', '', string.punctuation))
    stop_words = set(stopwords.words('english'))
    tokenize_words = nltk.word_tokenize(questionToken)
    print(tokenize_words)
    # remove stop words
    without_stop_words = {w for w in tokenize_words if not w in stop_words}
    print(without_stop_words)

    l1 = []; l2 = []
    cosine = 0
    dict_key = ''
    # loop through all previously asked questions
    for i in qa_dict:
        # remove punctuation and stop words from previously asked question and tokenize
        i_mod = i.translate(str.maketrans('', '', string.punctuation))
        i_token = nltk.word_tokenize(i_mod)
        i_remove_stopword = {w for w in i_token if not w in stop_words}
        # combine both sentences into a vector
        rvector = without_stop_words.union(i_remove_stopword)
        # loop through vector
        for w in rvector:
            # if word exists in vector and first sentence
            if w in without_stop_words: l1.append(1) # create a vector
            else: l1.append(0)
            # if word exists in vector and second sentence
            if w in i_remove_stopword: l2.append(1)
            else: l2.append(0)
        c = 0  
        # cosine formula 
        for j in range(len(rvector)):
            c+= l1[j]*l2[j]
        temp = c / float((sum(l1)*sum(l2))**0.5)
        print(temp)
        if temp > cosine:
            cosine = temp
            dict_key = i
        # clear vectors to check next question
        l1.clear()
        l2.clear()
    # if similarity is above .7 print the answer
    if(cosine > .7):
        print("From previously asked questions:", qa_dict[dict_key])
        return qa_dict[dict_key]

    # else check for answer in documents
    else:
        score = 0
        # loop through all documents
        for i in doc_dict.values():
            reader = PdfReader(i)
            page_count = len(reader.pages) 
            context = ''
            # loop through pages and extract text from pdf document
            for j in range(0, page_count):
                page = reader.pages[j]
                text = page.extract_text()
                context = context + text
            # insert question and context to find answer
            nlp = pipeline('question-answering', model=model_name, tokenizer=model_name)
            QA_input = {
                'question': question,
                'context': context
            }
            res = nlp(QA_input)
            # if previous score is less than new score reassign to keep the highest score
            if(score < res["score"]):
                score = res["score"]
                final_answer = res
            print(res)
        print("From document:", final_answer["answer"])
        return final_answer["answer"]
