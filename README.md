# 🎵 Spotify Mix Maker – Collaborative Playlist Generator  

**A web application that allows two users to create a mixed Spotify playlist based on their shared music preferences using a Tinder-swipe style song selection. Built with React.js, Flask, and MongoDB.**  

## 📌 Overview  
Spotify Mix Maker is a **music collaboration tool** that enables users to create a **common mixed playlist** from the albums they share with friends. By integrating **Spotify's API**, the application provides a **Tinder-swipe style selection mechanism**, allowing users to like or skip individual songs. Once both users have completed their selections, a **custom mixed playlist** is generated with their mutual favorite songs.  

## 🔥 Key Features  
✅ **Tinder-Swipe Song Selection** – Users swipe left or right on songs from a friend's shared album.  
✅ **Automated Mixed Playlist Creation** – Generates a **common playlist** containing only the mutually liked songs.  
✅ **Spotify API Integration** – Retrieves albums and tracks directly from Spotify.  
✅ **React.js Frontend** – A smooth and interactive user experience.  
✅ **Flask Backend (Python)** – Efficient handling of API requests and user data.  
✅ **MongoDB Database** – Stores user selections and playlist data.  

## 🏗️ Tech Stack  
- **Frontend:** React.js (JavaScript)  
- **Backend:** Flask (Python)  
- **Database:** MongoDB  
- **External API:** Spotify API  

## 🛠️ Installation & Setup  
### **Clone the repository:**  
```sh
git clone https://github.com/MozartofCode/Spotify-Mix-Maker.git
cd Spotify-Mix-Maker
```

### **Backend Setup (Flask + Python)**  
1. Navigate to the backend folder:  
   ```sh
   cd backend
   ```
2. Create a virtual environment (optional but recommended):  
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows, use 'venv\Scripts\activate'
   ```
3. Install dependencies:  
   ```sh
   pip install -r requirements.txt
   ```
4. Start the backend server (default: `localhost:5000`):  
   ```sh
   flask run
   ```

### **Frontend Setup (React.js)**  
1. Navigate to the frontend folder:  
   ```sh
   cd frontend
   ```
2. Install dependencies:  
   ```sh
   npm install
   ```
3. Start the frontend server (default: `localhost:3000`):  
   ```sh
   npm start
   ```

## 🎯 How It Works  
1️⃣ **User A selects an album from Spotify** and shares it with User B.  
2️⃣ **Both users swipe left or right** on each song in the album (like/dislike).  
3️⃣ Once both users complete the process, the app **creates a shared playlist** with the mutually liked songs.  

## 🚧 Future Enhancements  
🔹 **Automatic Playlist Addition** – Directly add the final playlist to **both users' Spotify libraries**.  
🔹 **Spotify Login Integration** – Replace manual registration with **Spotify OAuth authentication**.  
🔹 **AI-Based Song Recommendations** – Suggest additional songs based on the final playlist’s style.  
