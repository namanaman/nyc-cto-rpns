DUMMY_DB = [
    {"first_name": "Naman", "last_name": "Agrawal", "email": "agrawal.nmn@gmail.com"}
]

def is_user_in_db(email):
    for i in DUMMY_DB:
        if i["email"] == email: 
            return True
    
    return False

def add_user_to_db(email, first_name, last_name):
    new_subscriber_record = {
        "email": email,
        "first_name": first_name,
        "last_name": last_name
    }
    DUMMY_DB.append(new_subscriber_record)

def remove_user_from_db(email):
    for i in range(len(DUMMY_DB)):
        if DUMMY_DB[i]['email'] == email:
            del DUMMY_DB[i]
            return True
    
    return False