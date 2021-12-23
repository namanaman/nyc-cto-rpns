from flask import Flask, request

DUMMY_DB = [
    {"first_name": "Naman", "last_name": "Agrawal", "email": "agrawal.nmn@gmail.com"}
]

app = Flask(__name__)

@app.route('/subscribe', methods=['POST'])
def handle_subscribe():
    data = request.json
    email = data['email']
    first_name = data['firstName']
    last_name = data['lastName']

    if not email or not first_name or not last_name:
        return "Request body had empty value(s)", 400

    is_duplicate = False
    for i in DUMMY_DB:
        if i["email"] == data["email"]: 
            is_duplicate = True

    if is_duplicate:
        return "User email already exists in database", 406

    new_subscriber_record = {
        "email": data['email'],
        "first_name": data['firstName'],
        "last_name": data['lastName']
    }
    DUMMY_DB.append(new_subscriber_record)
    print(DUMMY_DB)

    return "OK", 200
    

@app.route('/unsubscribe', methods=['POST'])
def handle_unsubscribe():
    email = request.json['email']

    if not email:
        return "Request body had empty email", 400

    for i in range(len(DUMMY_DB)):
        if DUMMY_DB[i]['email'] == email:
            del DUMMY_DB[i]
            print(DUMMY_DB)
            return "OK", 200
    
    return "User not found in database", 406