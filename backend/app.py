# @Author: Bertan Berker
# Uses Spotify API to create a mix of music backend
# Makes the necessary requests to the mongodb database


# Import necessary modules
import requests
from flask import Flask, jsonify
from flask_cors import CORS
import base64



# Create a Flask app
app = Flask(__name__)
CORS(app)


client_id = ""
client_secret = ""


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


initialization()







@app.route('/api/login', methods=['GET'])
def login(username, password):
    return


@app.route('/api/register', methods=['POST'])
def register(username, password):
    return


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
















