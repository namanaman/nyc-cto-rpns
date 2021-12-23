from flask import Flask, request
from db_utils import DUMMY_DB, add_user_to_db, remove_user_from_db, is_user_in_db

app = Flask(__name__)

@app.route('/subscribe', methods=['POST'])
def handle_subscribe():
    data = request.json
    email = data['email']
    first_name = data['firstName']
    last_name = data['lastName']

    if not email or not first_name or not last_name:
        return "Request body had empty value(s)", 400

    if is_user_in_db(email):
        return "User email already exists in database", 406
    
    add_user_to_db(email, first_name, last_name)

    return "OK", 200
    

@app.route('/unsubscribe', methods=['POST'])
def handle_unsubscribe():
    email = request.json['email']

    if not email:
        return "Request body had empty email", 400
    
    success = remove_user_from_db(email)
    if success:
        return "OK", 200
    
    return "User not found in database", 406