from ...core import db, guard
import simplejson as json
from ...models import User
from . import bp as app
import flask
import flask_praetorian


@app.route("/api")
def api():
    return "This is an empty home page."


@app.route("/api/login", methods=["POST"])
def login():
    req = flask.request.get_json(force=True)
    username = req.get("username", None)
    password = req.get("password", None)
    user = guard.authenticate(username, password)
    ret = {"access_token": guard.encode_jwt_token(user)}
    return (flask.jsonify(ret), 200)


@app.route("/api/refresh", methods=["POST"])
def refresh():
    """
    Refreshes an existing JWT by creating a new one that is a copy of the old
    except that it has a refrehsed access expiration.
    .. example::
       $ curl http://localhost:5000/api/refresh -X GET \
         -H "Authorization: Bearer <your_token>"
    """
    print("refresh request")
    old_token = request.get_data()
    new_token = guard.refresh_jwt_token(old_token)
    ret = {"access_token": new_token}
    return ret, 200


@app.route("/api/registration", methods=["POST"])
def registration():

    req = flask.request.get_json(force=True)
    username = req.get("username", None)
    password = req.get("password", None)
    name = req.get("name", None)
    email = req.get("email", None)

    if db.session.query(User).filter_by(username=username).count() < 1:
        db.session.add(
            User(
                username=username,
                name=name,
                email=email,
                hashed_password=guard.hash_password(password),
                roles="user",
            )
        )
    db.session.commit()

    user = guard.authenticate(username, password)
    ret = {"access_token": guard.encode_jwt_token(user)}

    return (flask.jsonify(ret), 200)


@app.route("/api/projects")
@flask_praetorian.auth_required
def protected():
    # all_proj= []
    # for project in user_projects:
    #     all_proj.append(project.__dict__)

    return {"projects": "", "username": flask_praetorian.current_user().username}
