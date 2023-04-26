from flask import Flask, request
import pymongo
import datetime
import time

app = Flask(__name__)
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["admin"]
mycol = mydb["posts"] #collection

@app.route("/", methods=['GET', 'POST', 'DELETE'])
def add(): #adds a new post to the database
    if request.method == 'GET':
        getID = request.args.get('getID')
        query = {"_id": getID}
        results = mycol.find(query)
        return {results}
    elif request.method == 'POST':
        reqJson = request.get_json()
        postID = reqJson['postID']
        postTitle = reqJson['postTitle']
        postAuthor = reqJson['postAuthor']
        postEntry = reqJson['postEntry']
        named_tuple = time.localtime() # get struct_time
        PostAdd = { "_id":  postID, 
                   "title": postTitle, 
                   "date": datetime.datetime.now().strftime("%x"), 
                   "time": time.strftime( "%H:%M:%S", named_tuple), 
                   "time_zone": "CST", 
                   "author": postAuthor, 
                   "entry": postEntry}
        x = mycol.insert_one(PostAdd)
        return {"message": "Post added"}
    elif request.method == 'DELETE':
        id = request.args.get('id')
        mycol.delete_one({"_id": id})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=50100, debug=True)


# Retrieving documents matching query
query = {"_id": "NEW TITLE"}
results = mycol.find(query)
for result in results:
    print(result)

# #Delete documents matching query
# query = { "name": "John" }
# mycol.delete_one(query)