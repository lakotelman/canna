from ...core import db, guard
import orjson
from ...models import User, Project, Milestone, Task
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


# @app.route("/api/refresh", methods=["POST"])
# def refresh():
#     """
#     Refreshes an existing JWT by creating a new one that is a copy of the old
#     except that it has a refrehsed access expiration.
#     .. example::
#        $ curl http://localhost:5000/api/refresh -X GET \
#          -H "Authorization: Bearer <your_token>"
#     """
#     print("refresh request")
#     old_token = request.get_data()
#     new_token = guard.refresh_jwt_token(old_token)
#     ret = {"access_token": new_token}
#     return ret, 200


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
    all_proj = []
    username = flask_praetorian.current_user().username
    user_projects = flask_praetorian.current_user().projects
    for project in user_projects:
        all_proj.append(project.project_dict())
    payload = {"projects": all_proj, "username": username.title()}
    return orjson.dumps(payload)


@app.route("/api/addproject", methods=["POST"])
@flask_praetorian.auth_required
def add_project():
    req = flask.request.get_json(force=True)
    n = Project(
        title=req.get("title"),
        user_id=flask_praetorian.current_user().id,
    )
    try:
        db.session.add(n)
        db.session.commit()
        db.session.refresh(n)
        return flask.jsonify(n.id)

    except Exception as e:
        print(e)
        return "You broke it."


@app.route("/api/newprojectmilestones", methods=["POST"])
@flask_praetorian.auth_required
def new_project_details():
    req = flask.request.get_json(force=True)
    print(req)
    m = Milestone(
        title=req["title"],
        project_id=req["project_id"],
    )
    db.session.add(m)
    db.session.commit()
    db.session.refresh(m)
    for task in req["tasks"]:
        if task["id"] == -1:
            t = Task(title=task["title"], milestone_id=m.id)
            db.session.add(t)
            db.session.commit()
    return req


@app.route("api/projectrevise", methods=["PUT"])
@flask_praetorian.auth_required
def update_milestone_details():
    req = flask.request.get_json(force=True)
    if "id" not in req:
        return {"Error": "Bad request", "message": "Need an id to update"}
    milestone = Milestone.query.filter_by(id=req["id"]).first()
    milestone.title = req["title"]
    db.session.commit()
    for task in req["tasks"]:
        if task["id"] != -1:
            db_task = Task.filter_by(id=task["id"]).first()
            db_task.title = task["title"]
            db.session.commit()
        else:
            n_task = Task(
                title=task["title"],
                milestone_id=milestone.id,
            )
            db.session.add(n_task)
            db.session.commit()
    return {"Message": f"Updated {milestone}"}


@app.route("/api/projects/<id>", methods=["GET"])
@flask_praetorian.auth_required
def get_project_by_id(id):
    response = Project.query.filter_by(id=id).first()
    project = response.project_dict()
    return project


@app.route("/api/project/<id>/delete", methods=["DELETE"])
@flask_praetorian.auth_required
def delete_project_by_id(id):
    response = Project.query.filter_by(id=id).first()
    db.session.delete(response)
    db.session.commit()
    return {"Message": "Project was successfully deleted"}

@app.route("/api/project/milestone/<id>/delete", methods=["DELETE"])
@flask_praetorian.auth_required
def delete_milestone_by_id(id): 
    response = Milestone.query.filter_by(id = id).first()
    db.session.delete(response) 
    db.session.commit()
    return {"Message": "Milestone was removed from the database"}

@app.route("/api/project/task/<id>/delete", methods=["DELETE"])
@flask_praetorian.auth_required
def delete_task_by_id(id): 
    response = Task.query.filter_by(id = id).first()
    db.session.delete(response) 
    db.session.commit()
    return {"Message": "Task was removed from the database"}