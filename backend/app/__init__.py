from flask import Flask
from app.models import User
from config import Config
from flask_migrate import Migrate
import flask_cors
from .core import db, guard


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    with app.app_context():
        
        db.init_app(app)

        migrate = Migrate()
        migrate.init_app(app, db)

        cors = flask_cors.CORS()
        cors.init_app(app)

        from app.blueprints.api import bp as api_bp

        app.register_blueprint(api_bp)

        guard.init_app(app, User)
    # from app import models

    return app
