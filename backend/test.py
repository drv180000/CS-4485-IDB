from transformers import pipeline
from PyPDF2 import PdfReader

question = "What is the name of the class?"

# Path to pdf
reader = PdfReader('/Users/Nick/Desktop/Syllabus.pdf')
page_count = len(reader.pages) 
context = ''

# loop through pages and extract text from pdf
for i in range(0, page_count):
    page = reader.pages[i]
    text = page.extract_text()
    context = context + text
question_answerer = pipeline("question-answering", model="qa_model")
print(question_answerer(question=question, context=context))

# PRINTED ANSWER IS INCORRECT