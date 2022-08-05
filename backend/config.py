import os
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy

basedir = os.path.abspath(os.path.dirname(__name__))

load_dotenv(os.path.join(basedir, ".env"))


class Config:
    FLASKAPP = os.getenv("FLASK_APP")
    FLASKDEBUG = os.getenv("FLASK_DEBUG")
    SQLALCHEMY_DATABASE_URI = os.getenv("SQLALCHEMY_DATABASE_URI")
    SQLALCHEMY_TRACK_MODIFICATIONS = os.getenv("SQLALCHEMY_TRACK_MODIFICATIONS")
    SECRET_KEY=os.getenv("SECRET_KEY")