from flask_restful import reqparse, Resource
from sqlalchemy.exc import IntegrityError
from flask_login import current_user, login_required

from extensions import db
from models import Json

parser = reqparse.RequestParser()
parser.add_argument('json')
parser.add_argument('description')
parser.add_argument('url_id')


class Jsons(Resource):
    @login_required
    def put(self, json_id):
        """toggles active variable for a json_id from the route"""
        args = parser.parse_args()
        jsons = db.session.query(Json).filter_by(url_id=args['url_id']).all()
        for json in jsons:

            if json.json_id == int(json_id):
                json.active = not json.active
            else:
                json.active = False
        try:
            db.session.commit()
        except IntegrityError as e:
            db.session.rollback()
            return "trigger activation failed", 500
        return [json.as_dict() for json in jsons]

    @login_required
    def delete(self, json_id):
        json = db.session.query(Json).filter_by(json_id=json_id).first()
        db.session.delete(json)
        try:
            db.session.commit()
        except IntegrityError as e:
            db.session.rollback()
            return "deletion of json failed", 500
        return "deleted json", 202


class JsonList(Resource):

    @login_required
    def get(self):
        """returns a list of jsons for given user_id and url_id"""
        args = parser.parse_args()
        jsons = db.session.query(Json).filter_by(user_id=current_user.get_id(), url_id=args['url_id']).all()
        return [json.as_dict() for json in jsons]

    @login_required
    def post(self):
        """post a new json to the database"""
        args = parser.parse_args()
        new_json = Json(args['json'], args['url_id'], args['description'], current_user.get_id())
        db.session.add(new_json)
        try:
            db.session.commit()
        except IntegrityError as e:
            db.session.rollback()
            return "posting json failed", 500
        return new_json.as_dict(), 201
