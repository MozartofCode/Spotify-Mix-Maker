# @ Author: Bertan Berker
# @ Language: Python - Flask framework
# This is the backend for the web application spotify-mix-maker
# The backend makes calls to the Spotify API to search for albums and songs and
# It creates users and mixtapes stores them in a mongoDB database

# Import necessary modules
import requests
from flask import request
from flask import Flask, jsonify
from flask_cors import CORS
import base64
from pymongo import MongoClient
from pymongo.mongo_client import MongoClient
import certifi

# Create a Flask app
app = Flask(__name__)
CORS(app)

# Credentials for Spotify API
client_id = ""
client_secret = ""

# Credentials for MangoDB connection
mongo_username = ""
mongo_password = ""
mongo_cluster = ""


# This function uses the client_id and client_secret to get an access token for future API calls to the Spotify API
# :parameters: None
# :return: returns access token for API calls
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


# This function uses the mongo username, password and cluster to connect to MongoDB
# :parameters: None
# :return: returns client
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


# This function handles the login of a user and checks the database to make sure
# :parameters: JSON data containing 'username', 'password'
# :return: JSON response containing success or failure message
@app.route('/api/login', methods=['POST'])
def login():
    
    data = request.json

    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'error': 'Invalid request data'}), 400

    username = data['username']
    password = data['password']

    client = connect_mongoDB()

    db = client["users"]
    users = db["users"]

    # Check if the username already exists
    existing_user = users.find_one({'username': username, 'password': password})

    if existing_user:
        return jsonify({'message': 'User logged-in successfully'})    
    
    return jsonify({'message': "User doesn't exist or incorrrect credentials"}), 400


# This function handles the registration of a user and adds them to the database
# :parameters: JSON data containing 'username', 'password'
# :return: JSON response containing success or failure message
@app.route('/api/register', methods=['POST'])
def register():
    
    # Extract username and password from the request body
    data = request.json

    # Check if 'data' is present and has the required fields
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'error': 'Invalid request data'}), 400

    username = data['username']
    password = data['password']

    client = connect_mongoDB()

    db = client["users"]
    users = db["users"]

    # Check if the username already exists
    existing_user = users.find_one({'username': username, 'password': password})

    if existing_user:
        return jsonify({'error': 'Username already exists'}), 400

    # Insert the new user into the 'users' collection
    new_user = {'username': username, 'password': password}
    users.insert_one(new_user)

    return jsonify({'message': 'User registered successfully'})    


# This function calls the Spotify API to search for an album based on keywords
# :parameters: JSON data containing 'query'
# :return: JSON response containing album's based on the keywords
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


# This function handles sending a request
# :parameters: JSON data containing 'username', 'friend', 'album' and 'albumID'
# :return: JSON response containing success or failure
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
    new_user = {'username': username, 'friend': friend, 'albumID': albumID, 'album': album, 'status': 'incomplete', 'likedSongs': []}
    users.insert_one(new_user)

    return jsonify({'message': 'User registered successfully'})    


# This function displays the requests the user themselves created
# :parameters: JSON data containing 'username'
# :return: JSON response containing own requests
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


# This function displays the other requests
# :parameters: JSON data containing 'username'
# :return: JSON response containing other requests
@app.route('/api/displayOtherRequests', methods= ['GET'])
def display_other_requests():

    try:
        
        data = request.args
      
        if not data or 'username' not in data:
            return jsonify({'error': 'Invalid request data'}), 404
    
        username = data['username']

        # Connect to MongoDB
        client = connect_mongoDB()
        db = client["users"]
        users = db["mixtapes"]

        requests = list(users.find({'friend': username, 'status': 'incomplete'}))

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


# This function displays the completed requests
# :parameters: JSON data containing 'username'
# :return: JSON response containing completed requests
@app.route('/api/displayCompletedRequests', methods= ['GET'])
def display_completed():

    try:
        
        data = request.args
      
        if not data or 'username' not in data:
            return jsonify({'error': 'Invalid request data'}), 404
    
        username = data['username']

        # Connect to MongoDB
        client = connect_mongoDB()
        db = client["users"]
        users = db["mixtapes"]

        friend_requests = list(users.find({'friend': username, 'status': 'Completed'}))
        own_requests = list(users.find({'username': username, 'status': 'Completed'}))

        formatted_requests = []        

        for own_req in own_requests:
            for friend_req in friend_requests:
                if own_req['friend'] == friend_req['username']:
                    formatted_request = {
                    'username': own_req['username'],
                    'friend': own_req['friend'],
                    'status': own_req['status'],
                    'likedSongs': own_req['likedSongs'] + friend_req['likedSongs'],
                    }
                    
                    formatted_requests.append(formatted_request)

        return jsonify(requests=formatted_requests)

    except Exception as e:
        return jsonify(error=str(e)), 500


# This function handles the user accepting a mixtape request.
# :parameters: JSON data containing 'username' and 'albumID'.
# :return: JSON response indicating success or failure of the operation.
@app.route('/api/acceptRequest', methods = ['POST'])
def accept_request():
    
    data = request.json

    # Check if 'data' is present and has the required fields
    if not data or 'username' not in data or 'albumID' not in data:
        return jsonify({'error': 'Invalid request data'}), 400

    username = data['username']
    albumID = data['albumID']


    # Create or access a database   
    client = connect_mongoDB()
    db = client["users"]
    users = db["mixtapes"]

    try:
            
        myquery = { 'friend': username, 'albumID': albumID }
        newvalues = { "$set": { "status": "in-progress" } }

        users.update_one(myquery, newvalues)
        return jsonify({'message': 'request accepted successfully'})    
    except:
        return 404


# This function handles the user rejecting a mixtape request.
# :parameters: JSON data containing 'username' and 'albumID'.
# :return: JSON response indicating success or failure of the operation.
@app.route('/api/rejectRequest', methods = ['POST'])
def reject_request():
     
    data = request.json

    # Check if 'data' is present and has the required fields
    if not data or 'username' not in data or 'albumID' not in data:
        return jsonify({'error': 'Invalid request data'}), 400

    username = data['username']
    albumID = data['albumID']


    # Create or access a database   
    client = connect_mongoDB()
    db = client["users"]
    users = db["mixtapes"]

    try:
            
        myquery = { 'friend': username, 'albumID': albumID }
        newvalues = { "$set": { "status": "denied" } }

        users.update_one(myquery, newvalues)
        return jsonify({'message': 'request rejected successfully'})    
    except:
        return 404


# This function retrieves the tracks from an album.
# :parameters: Query parameters containing 'username' and 'albumID'.
# :return: JSON response containing information about tracks from the album.
@app.route('/api/getTracks', methods= ['GET'])
def get_tracks():
    
    data = request.args
    
    if not data or 'query' not in data or 'username' not in data:
        return jsonify({'error': 'Invalid request data'}), 404
    
    access_token = connect_spotifyAPI()

    if not access_token:
        return jsonify({'error': 'Failed to obtain access token from Spotify API'})
    
    album_id = data['query']
    username = data['username']

    spotify_search_track_url = f'https://api.spotify.com/v1/albums/{album_id}/tracks'
    headers = {
        'Authorization': f'Bearer {access_token}',
    }
    params = {
        'limit': 50
    }
    
    try:
        response = requests.get(spotify_search_track_url, headers=headers, params=params)
        response.raise_for_status()

        data = response.json()

        tracks = []
        count = 1

        for item in data.get('items', []):

            query = item['name']

            spotify_search_url = 'https://api.spotify.com/v1/search'
            headers = {
                'Authorization': f'Bearer {access_token}',
            }
            params = {
                'q': query,
                'type': 'track',
                'limit': 1
            }
                
            response = requests.get(spotify_search_url, headers=headers, params=params)
            response.raise_for_status()
            data = response.json()

             # Check if there are tracks in the response
            items = data.get('tracks', {}).get('items', [])
            
            if items:
                # Extract the image URL of the first track
                imageURL = items[0]['album']['images'][0]['url'] if items[0]['album']['images'] else None
                
                track_info = {
                'id': count,
                'name': item['name'],
                'artist': ', '.join([artist['name'] for artist in item.get('artists', [])]),
                'imageURL': imageURL,
                'username': username,
                'albumID': album_id
            }

            tracks.append(track_info)
            count += 1
            
        return jsonify(tracks)
    
    except requests.RequestException as e:
        return jsonify(error = str(e)), 500


# This function handles the user swiping right on a track in a mixtape.
# :parameters: JSON data containing 'username', 'name' (track name), and 'albumID'.
# :return: JSON response indicating success or failure of the operation.
@app.route('/api/swipeRight', methods= ['POST'])
def swipe_right():

    data = request.json
    
    # Check if 'data' is present and has the required fields
    if not data or 'username' not in data or 'name' not in data or 'albumID' not in data:
       
        return jsonify({'error': 'Invalid request data'}), 400

    username = data['username']
    track_name = data['name']
    album_id = data['albumID']

    # Create or access a database   
    client = connect_mongoDB()
    db = client["users"]
    users = db["mixtapes"]

    try:
        myquery = { 'friend': username, 'albumID': album_id }
        newvalues = {
            "$set": {"status": "Completed"},
            "$push": {"likedSongs": track_name}
        }
        
        users.update_one(myquery, newvalues)
        return jsonify({'message': 'swiped right successfully'}), 200
        
    except:
        return jsonify({'error': 'swiped right unsuccessful'}), 404