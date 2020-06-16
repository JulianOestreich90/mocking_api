from extensions import db
from flask_restful import Resource, reqparse
from sqlalchemy.exc import IntegrityError
from flask_login import current_user, login_required
from models import Url
from flask import jsonify

parser = reqparse.RequestParser()
parser.add_argument('url')


def urls_with_jsons(urls):
    url_list = []
    for url in urls:
        d = url.as_dict()
        jsons = url.jsons
        jsons_as_list = []
        for json in jsons:
            jsons_as_list.append(json.as_dict())
        if len(jsons_as_list) > 0:
            d['jsons'] = jsons_as_list
        url_list.append(d)
    return url_list


class Urls(Resource):
    @login_required
    def get(self, url_id):
        """return url with jsons for a given url_id"""
        print(current_user.user_id)
        print("lalala")
        url = db.session.query(Url).filter_by(url_id=url_id).first()
        return urls_with_jsons([url])

    @login_required
    def delete(self, url_id):
        url = db.session.query(Url).filter_by(url_id=url_id).first()
        db.session.delete(url)
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            print(e)
            return "beim loeschen ist ein fehler aufgetreten", 500
        return {"status": "erfolgreich gelöscht",
                "urls": urls_with_jsons(db.session.query(Url).filter_by(user_id=current_user.get_id()).all())}, 202


class UrlList(Resource):
    @login_required
    def get(self):
        print("id", current_user.get_id())
        print(current_user.as_dict())
        urls = db.session.query(Url).filter_by(user_id=current_user.get_id()).all()
        print(urls)
        return jsonify(urls_with_jsons(urls), {"user": current_user.as_dict(), "isLoggedIn": True})

    @login_required
    def post(self):
        args = parser.parse_args()
        print(current_user)
        url = Url(user_id=current_user.get_id(), url=args['url'])
        print(url)
        db.session.add(url)
        try:
            db.session.commit()
        except IntegrityError as e:
            db.session.rollback()
            return "url schon vorhanden", 500
        return url.as_dict(), 201
