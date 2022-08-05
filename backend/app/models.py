from app import db
from datetime import datetime


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image_file = db.Column(db.String(20), nullable=False, default="default_profile.jpg")
    password = db.Column(db.String(60), nullable=False)
    visions = db.relationship("Visionboard", backref="author", lazy=True)

    def __repr__(self):
        return f"User({self.username}, {self.email}, {self.image_file}"


class Visionboard(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(300))
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    links = db.relationship("Link", backref="posts", lazy=True)

    def __repr__(self):
        return f"Visionboard({self.title}, {self.description}, {self.date_created}"


class Link(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    notes = db.Column(db.String(200))
    source = db.Column(db.String(250))
    link_image = db.Column(db.String(20), default="default_link.jpg", nullable="False")
    visionboard_id = db.Column(
        db.Integer, db.ForeignKey("visionboard.id"), nullable=False
    )

    def __repr__(self):
        return f"Link({self.title}, {self.notes}, {self.source}"
