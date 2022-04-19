from api.db_interface import db_interface
import hashlib
db = db_interface()




users = db.users.stream()
print(users)

for i in range(20):
    user = next(users, None)
    if user == None:
        break
    user = user.to_dict()
    username = user['username']
    password = user['password']
    #print(username)
    print(password)
    
    h = hashlib.new('sha256')
    arr = bytes(password, 'utf-8')
    h.update(arr)
    hashed_password = h.hexdigest()
    #print(hashed_password)
    user['password'] = hashed_password
    #db.edit_user(username, user)
    #print(user.to_dict()['password'])






# edit_user(username, updates: dict)