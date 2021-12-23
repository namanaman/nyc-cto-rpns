# NYC Rescued Pet Notification System (RPNS)

## About
This project includes the ReactJS frontend for a landing page that allows users to subscribe/unsubscribe for the RPNS. It also includes the Python Flask web server (API) to handle the requests from the landing page.

The ReactJS frontend and Flask backend would replace the Java Play UI and web server logic. The Flask backend would connect to MySQL database and SendGrid server, and the FTP would not need to change. The React frontend + Flask API service could each be hosted on a cloud service such as AWS.

- Backend API Documentation: https://app.swaggerhub.com/apis/naman145/RPNSAPI/1.0.0
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup 
1. Clone the repository

### Server-side
2. Go into backend folder with the terminal command: `cd api`
3. Create virtual environment for Python: `python3 -m venv venv`
4. Activate the environment: `. venv/bin/activate`
5. Install Flask: `pip install flask`
6. Run the Flask server: `flask run`. You should see a message like `Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)`

### Client-side
7. Open a new terminal window
8. Go into frontend folder: `cd frontend`
9. Install dependencies: `npm install`
10. Start the web server: `npm start`
11. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.