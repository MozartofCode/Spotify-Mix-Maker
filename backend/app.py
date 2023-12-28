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
client_id = "1451cdd63e324f46ac0db9da993cfb58"
client_secret = "55ee865120cf4a9689727db6b80ebb3a"

# Credentials for MangoDB
mongo_username = "newMangoUser"
mongo_password = "MkqL4Dw0gOvQIC88"
mongo_cluster = "spotify-mix-cluster"




def connect_spotifyAPI():

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
        return token
    
    else:
        print(f'Error: {response.status_code}')
        print(response.text)





def connect_mongoDB():
    
    uri = "mongodb+srv://" + mongo_username + ":" + mongo_password + "@" + mongo_cluster + ".i73vml1.mongodb.net/?retryWrites=true&w=majority"

    # Create a new client and connect to the server
    client = MongoClient(uri, tlsCAFile=certifi.where())

    # Send a ping to confirm a successful connection
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
        return client

    except Exception as e:
        print(e)


@app.route('/api/login', methods=['POST'])
def login():
    
    # Extract username and password from the request body
    data = request.json

    # Check if 'data' is present and has the required fields
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'error': 'Invalid request data'}), 400

    username = data['username']
    password = data['password']

    client = connect_mongoDB()

    # Create or access a database
    db = client["users"]

    # Create or access a collection
    users = db["users"]


    # Check if the username already exists
    existing_user = users.find_one({'username': username, 'password': password})

    if existing_user:
        return jsonify({'message': 'User logged-in successfully'})    
    
    return jsonify({'message': "User doesn't exist or incorrrect credentials"}), 400




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

    client = connect_mongoDB()

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



@app.route('/api/search', methods = ['GET'])
def search_album():
    
    data = request.args

    if not data or 'query' not in data:
        return jsonify({'error': 'Invalid request data'}), 404
    
    access_token = connect_spotifyAPI()

    if not access_token:
        return jsonify({'error': 'Failed to obtain access token from Spotify API'})
    
    query = data['query']

    spotify_search_url = 'https://api.spotify.com/v1/search'
    headers = {
        'Authorization': f'Bearer {access_token}',
    }
    params = {
        'q': query,
        'type': 'album',
        'limit': 50
    }
    
    try:
        response = requests.get(spotify_search_url, headers=headers, params=params)
        response.raise_for_status()
        data = response.json()
        albums = data.get('albums', {}).get('items', [])
        
        # Extract relevant information (name and id) from each album
        results = [{'name': album['name'], 'id': album['id']} for album in albums]
        
        return jsonify(results=results)
    
    except requests.RequestException as e:
        return jsonify(error = str(e)), 500
    


@app.route('/api/getTracks', methods= ['GET'])
def get_track():
    
    data = request.args
    
    if not data or 'query' not in data:
        return jsonify({'error': 'Invalid request data'}), 404
    
    access_token = connect_spotifyAPI()

    if not access_token:
        return jsonify({'error': 'Failed to obtain access token from Spotify API'})
    
    id = data['query']

    spotify_search_track_url = f'https://api.spotify.com/v1/albums/{id}/tracks'
    headers = {
        'Authorization': f'Bearer {access_token}',
    }
    params = {
        'limit': 50
    }
    
    try:
        response = requests.get(spotify_search_track_url, headers=headers, params=params)
        response.raise_for_status()

        
        # Print request details for debugging
        print('Request URL:', response.url)
        print('Request Headers:', response.request.headers)
        print('Request Params:', response.request.params)



        data = response.json()

        tracks = [item['name'] for item in data.get('items', [])]

        return jsonify(results=tracks)
    
    except requests.RequestException as e:
        return jsonify(error = str(e)), 500




@app.route('/api/sendRequest', methods=['POST'])
def send_request():

    data = request.json

    # Check if 'data' is present and has the required fields
    if not data or 'username' not in data or 'friend' not in data or 'album' not in data or 'albumID' not in data:
        return jsonify({'error': 'Invalid request data'}), 404

    username = data['username']
    friend = data['friend']
    albumID = data['albumID']
    album = data['album']

    # Create or access a database   
    client = connect_mongoDB()
    db = client["users"]

    # Create or access a collection
    users = db["mixtapes"]

    # Insert the new user into the 'users' collection
    new_user = {'username': username, 'friend': friend, 'albumID': albumID, 'album': album, 'status': 'incomplete'}
    users.insert_one(new_user)

    return jsonify({'message': 'User registered successfully'})    



@app.route('/api/displayOwnRequests', methods= ['GET'])
def display_own_requests():

    try:
        
        data = request.args

        if not data or 'username' not in data:
            return jsonify({'error': 'Invalid request data'}), 404
    
        username = data['username']

        # Connect to MongoDB
        client = connect_mongoDB()
        db = client["users"]
        users = db["mixtapes"]

        # Retrieve requests where current_username is either 'username' or 'friend'
        requests = list(users.find({'username': username}))

        # Format the response
        formatted_requests = []
        for db_request in requests:
            formatted_request = {
                'username': db_request['username'],
                'friend': db_request['friend'],
                'albumID': db_request['albumID'],
                'status': db_request['status'],
            }
            formatted_requests.append(formatted_request)

        return jsonify(requests=formatted_requests)

    except Exception as e:
        return jsonify(error=str(e)), 500



@app.route('/api/displayOtherRequests', methods= ['GET'])
def display_other_requests():

    try:
        
        data = request.args
        print(data)
        if not data or 'username' not in data:
            return jsonify({'error': 'Invalid request data'}), 404
    
        username = data['username']

        # Connect to MongoDB
        client = connect_mongoDB()
        db = client["users"]
        users = db["mixtapes"]

        requests = list(users.find({'friend': username}))

        # Format the response
        formatted_requests = []
        for db_request in requests:
            formatted_request = {
                'username': db_request['username'],
                'friend': db_request['friend'],
                'albumID': db_request['albumID'],
                'status': db_request['status'],
            }
            formatted_requests.append(formatted_request)

        return jsonify(requests=formatted_requests)

    except Exception as e:
        return jsonify(error=str(e)), 500










# Change status to complete or in progress? TODO
@app.route('/api/acceptRequest')
def accept_request():
    return


@app.route('/api/rejectRequest')
def reject_request():
    return


