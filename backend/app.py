# @Author: Bertan Berker
# Uses Spotify API to create a mix of music backend
# Makes the necessary requests to the mongodb database


# Import necessary modules
import requests
from flask import request
from flask import Flask, jsonify
from flask_cors import CORS
import base64
from pymongo import MongoClient
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import certifi
import json

# Create a Flask app
app = Flask(__name__)
CORS(app)

# Credentials for Spotify
client_id = ""
client_secret = ""

# Credentials for MangoDB
mongo_username = ""
mongo_password = ""
mongo_cluster = ""


uri = "mongodb+srv://" + mongo_username + ":" + mongo_password + "@" + mongo_cluster + ".i73vml1.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, tlsCAFile=certifi.where())

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")

except Exception as e:
    print(e)



def initialization():

    auth_url = 'https://accounts.spotify.com/api/token'

    auth_headers = {
        'Authorization': 'Basic ' + base64.b64encode((client_id + ':' + client_secret).encode()).decode('utf-8')
    }

    auth_data = {
        'grant_type': 'client_credentials'
    }

    response = requests.post(auth_url, headers=auth_headers, data=auth_data)

    if response.status_code == 200:
        body = response.json()
        token = body.get('access_token')
        token_type = body.get('token_type')
        expires_in = body.get('expires_in')
        # print(f'Token: {token}')
        # print(f'Token Type: {token_type}')
        # print(f'Expires in: {expires_in}')
        
    else:
        print(f'Error: {response.status_code}')
        print(response.text)


#initialization()






@app.route('/api/login', methods=['POST'])
def login():
    
    # Extract username and password from the request body
    data = request.json

    # Check if 'data' is present and has the required fields
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'error': 'Invalid request data'}), 400

    username = data['username']
    password = data['password']

    # Create or access a database
    db = client["users"]

    # Create or access a collection
    users = db["users"]


    # Check if the username already exists
    existing_user = users.find_one({'username': username, 'password': password})

    if existing_user:
        return jsonify({'message': 'User logged-in successfully'})    
    
    return jsonify({'message': "User doesn't exist or incorrrect credentials"})




@app.route('/api/register', methods=['POST'])
def register():
    
    # Extract username and password from the request body
    data = request.json

    # Check if 'data' is present and has the required fields
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'error': 'Invalid request data'}), 400

    username = data['username']
    password = data['password']


    # Create or access a database
    db = client["users"]

    # Create or access a collection
    users = db["users"]


    # Check if the username already exists
    existing_user = users.find_one({'username': username, 'password': password})

    if existing_user:
        return jsonify({'error': 'Username already exists'}), 400

    # Insert the new user into the 'users' collection
    new_user = {'username': username, 'password': password}
    users.insert_one(new_user)

    return jsonify({'message': 'User registered successfully'})    


    





















## there has to be some sort of a search logic or like send a message to the user logic or smth?




# Define a route to handle GET requests to '/'
@app.route('/api/getPlaylist', methods=['GET'])
def get_playlist(playlist_name):
    return





# Define a route to handle GET requests to '/'
# Add this song
@app.route('/api/swipeRight', methods=['GET'])
def swipe_right():    
    return


# Define a route to handle GET requests to '/'
# Don't add this song
@app.route('/api/swipeLeft', methods=['GET'])
def swipe_left():
    return


# Define a route to handle GET requests to '/'
# Don't add this song
@app.route('/api/mix', methods=['GET'])
def make_mix():
    return
















