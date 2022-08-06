from ...core import db, guard
from ...models import User
from . import bp as app
import flask


@app.route("/api")
def api():
    return "This is an empty home page."


@app.route("/login", methods=["POST"])
def login():
    req = flask.request.get_json(force=True)
    username = req.get("username", None)
    password = req.get("password", None)
    user = guard.authenticate(username, password)
    ret = {"access_token": guard.encode_jwt_token(user)}
    return (flask.jsonify(ret), 200)


@app.route('/api/registration', methods=['POST'])
def registration():

    req = flask.request.get_json(force=True)
    username = req.get('username', None)
    password = req.get('password', None)
    name= req.get('name', None)
    email = req.get('email', None) 

    if db.session.query(User).filter_by(username=username).count() < 1:
        db.session.add(User(
            username=username,
            name= name, 
            email= email, 
            hashed_password=guard.hash_password(password),
            roles='user'
        ))
    db.session.commit()

    user = guard.authenticate(username, password)
    ret = {'access_token': guard.encode_jwt_token(user)}

    return (flask.jsonify(ret),200)