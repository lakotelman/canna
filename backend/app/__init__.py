from flask import Flask
from app.models import User
from config import Config
from flask_migrate import Migrate
import flask_cors
from .core import db, guard


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    migrate = Migrate()
    db.init_app(app)
    cors = flask_cors.CORS()
    cors.init_app(app)
    migrate.init_app(app, db)
    from app import models
    from app.blueprints.api import bp as api_bp

    guard.init_app(app, User)

    app.register_blueprint(api_bp)

    return app
