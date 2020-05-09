import json
import shelve
from functools import wraps
from pathlib import Path
from typing import Callable, Optional

from flask import Flask, abort, g, request
from flask.wrappers import Response

DIRNAME = Path(__file__).parent


app = Flask(__name__)
app.config.from_object("config")


@app.before_request
def open_db_connection():
    g.db = shelve.open(str(DIRNAME.parent / "users.db"))


@app.after_request
def close_db_connection(response: Response) -> Response:
    g.db.close()
    return response


def api_key_required(f: Callable) -> Callable:
    @wraps(f)
    def wrapper(*args, **kwargs):
        if request.form.get("api_key") != app.config["SECRET_KEY"]:
            abort(401)
        return f(*args, **kwargs)

    return wrapper


@app.route("/users/<username>", methods=["GET", "PUT", "DELETE"])
def specific_user(username: str):
    if username not in g.db:
        abort(404, f"User {username} does not exist")

    if request.method == "GET":
        return get_user_tasks(username)
    if request.method == "PUT":
        return update_user_tasks(username, request.form.get("tasks"))
    if request.method == "DELETE":
        return delete_user(username)


def get_user_tasks(username: str):
    return json.dumps(g.db[username])


def update_user_tasks(username: str, tasks: Optional[str]):
    if tasks is None:
        abort(400, f"No tasks payload provided : could not update user {username}")
    g.db[username] = tasks
    return "", 204


def delete_user(username: str):
    del g.db[username]
    return "", 204


@app.route("/users", methods=["GET", "POST"])
@api_key_required
def all_users():
    if request.method == "GET":
        return list_users()
    if request.method == "POST":
        return create_user(request.form.get("username"))


def list_users():
    return json.dumps(list(g.db.keys()))


def create_user(username: Optional[str]):
    if username:
        g.db[username] = []
        return f"Sucessfully created new user {username}", 201
    abort(400, "No username provided : could not create user")
