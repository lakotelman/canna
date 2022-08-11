from .core import db
from datetime import datetime


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image_file = db.Column(db.String(20), nullable=False, default="default_profile.jpg")
    hashed_password = db.Column(db.String(200), nullable=False)
    roles = db.Column(db.String)
    is_active = db.Column(db.Boolean, default=True, server_default="true")
    visions = db.relationship("Visionboard", backref="author", lazy=True)
    projects = db.relationship("Project", backref="author", lazy=True)

    def __repr__(self):
        return f"User({self.username}, {self.email}, {self.image_file}"

    @property
    def identity(self):
        return self.id

    # Required from praetorian to use the package, but ultimately I'm not using it yet.
    @property
    def rolenames(self):
        try:
            return self.roles.split(",")
        except Exception:
            return []

    @property
    def password(self):
        return self.hashed_password

    @classmethod
    def lookup(cls, username):
        return cls.query.filter_by(username=username).one_or_none()

    @classmethod
    def identify(cls, id):
        return cls.query.get(id)

    def is_valid(self):
        return self.is_active


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


class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    status = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    milestones = db.relationship(
        "Milestone",
        backref="projects",
        lazy=True,
        cascade="all,delete",
    )

    def __repr__(self):
        return f"Project({self.title}, {self.date_created}"

    def project_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "date_created": self.date_created,
            "user_id": self.user_id,
            "milestones": [m.milestone_dict() for m in self.milestones],
        }


class Milestone(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    status = db.Column(db.Boolean, default=False)
    # order = db.Column(db.Integer, default=0)
    project_id = db.Column(db.Integer, db.ForeignKey("project.id"), nullable=False)
    tasks = db.relationship(
        "Task",
        backref="milestones",
        lazy=True,
        cascade="all, delete",
        
    )

    def milestone_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "date_created": self.date_created,
            "project_id": self.project_id,
            "tasks": [t.task_dict() for t in self.tasks],
        }


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    status = db.Column(db.Boolean, default=False)
    # order = db.Column(db.Integer, default=0)
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    milestone_id = db.Column(db.Integer, db.ForeignKey("milestone.id"), nullable=False)

    def task_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "date_created": self.date_created,
            "milestone_id": self.milestone_id,
            "status": self.status,
        }
