from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    migrate = Migrate()
    db.init_app(app)
    migrate.init_app(app, db)
    from app import models
    from app.blueprints.api import bp as api_bp
    app.register_blueprint(api_bp)

    return app
