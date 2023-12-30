# Spotify-Mix-Maker

"Spotify Mix Maker Web Application"

This is web application that was developed by Bertan Berker.

The purpose of the project was to create an MVP that would allow two people to create a mixed playlist together with the songs
that they both love from Spotify using the Spotify API. In order to select the songs you like from an album that your friend shared, there is an implementation of a tinder-swipe like logic that helps the users make selections on each different song on their friend's album. After both a user and their friend finish completing going through each other's albums, the application creates a common mixed playlist.

Technologies used are:
- Frontend: React JS/ Javascript
- Backend: Flask Framework/ Python
- Database: MongoDB 
- External APIs used in the project: Spotify API

Possible future improvements:
- The authentication process with the Spotify API were getting complicated so a future improvement could be implementing another function to automatically add the new
playlist to both the user's and their friend's playlists
- Changing the whole registration process and just implementing a login logic with Spotify credentials instead to streamline the whole album creation process
- The use of AI to give song recommendations to both the user and the friend based on the songs in their common playlist

Lastly, the easiest way to use this application (after handling credentials and authentication issue with mongoDB and spotify API) is:
1- Navigate to the backend folder and type 'flask run' to host the backend which will be hosted in localhost5000 
2- Navigate to the frontend folder and type npm start to start the frontend which will be hosted in localhost3000
