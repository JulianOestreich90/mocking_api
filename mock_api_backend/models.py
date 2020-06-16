from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey

from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database
from flask_login import UserMixin

from config import SQLALCHEMY_DATABASE_URI
from extensions import db

engine = create_engine(SQLALCHEMY_DATABASE_URI)
if not database_exists(engine.url):
    create_database(engine.url)


class Url(db.Model):
    __tablename__ = 'url'
    url_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    url = db.Column(db.String(100), nullable=False)
    created_on = db.Column(db.DateTime, default=db.func.now())
    jsons = relationship("Json", cascade="all, delete-orphan")

    def __repr__(self):
        return "< db.Models.Url Object ('url_id={} user_id={} url={} created_on={} len(jsons)={}) >" \
            .format(self.url_id, self.user_id, self.url, self.created_on, len(self.jsons))

    def __init__(self, user_id, url):
        self.user_id = user_id
        self.url = url

    def as_dict(self):
        return {
            "url_id": self.url_id,
            "user_id": self.user_id,
            "url": self.url,
            "created_on": str(self.created_on),
            "jsons": [json for json in self.jsons],
        }


class Json(db.Model):
    __tablename__ = 'json'
    json_id = db.Column(db.Integer, primary_key=True)
    json = db.Column(db.Text(500000), nullable=False)
    created_on = db.Column(db.DateTime, default=db.func.now())
    url_id = db.Column(db.Integer, ForeignKey('url.url_id'))
    description = db.Column(db.String(300), default=None)
    active = db.Column(db.Boolean, default=0)
    user_id = db.Column(db.Integer, nullable=False)
    url = relationship("Url", back_populates="jsons")

    def __init__(self, json, url_id, description, user_id):
        self.json = json,
        self.url_id = url_id,
        self.description = description,
        self.user_id = user_id

    def __repr__(self):
        return "< models.Json Object ('url_id={} user_id={} json={} created_on={} description={} active={})>" \
            .format(self.url_id, self.user_id, self.json, self.created_on, self.description, self.active)

    def as_dict(self):
        return {
            "json_id": self.json_id,
            "json": self.json,
            "created_on": str(self.created_on),
            "url_id": self.url_id,
            "description": self.description,
            "active": self.active,
            "user_id": self.user_id
        }


class User(UserMixin, db.Model):

    def __init__(self, first_name, last_name, email, password):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password

    def __repr__(self):
        return "< models.User Object (userid={}, first_name={}, last_name={}, email={}, password={})>".format(self.user_id,self.first_name,self.last_name,self.email,self.password)

    def as_dict(self):
        return {
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "user_id": self.user_id
        }

    def get_id(cls):
        print("in get_id()", cls.user_id)
        return str(cls.user_id)

    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(40), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)
    created = db.Column(db.DateTime, default=db.func.now())