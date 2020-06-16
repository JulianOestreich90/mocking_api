from flask_restful import Api
from flask import Blueprint

from resources.urls import UrlList, Urls
from resources.jsons import JsonList, Jsons
from resources.user import Register, Login, Logout

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

#Routes
api.add_resource(Urls, '/urls/<url_id>')
api.add_resource(UrlList, '/urls')

api.add_resource(JsonList, '/jsons')
api.add_resource(Jsons, '/jsons/<json_id>')

api.add_resource(Register, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')



