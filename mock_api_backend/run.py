from flask import Flask, request
from flask_cors import CORS

from extensions import db, bcrypt, login_manager
from app import api_bp
from config import *
from models import User


def create_app(config_filename):
    app = Flask(__name__, static_folder="../react_frontend/build/static", template_folder="../react_frontend/build")
    app.config.from_object(config_filename)
    app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = SQLALCHEMY_TRACK_MODIFICATIONS

    bcrypt.init_app(app)
    db.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        print(user_id, "loaduser user_loder id")
        try:
            return db.session.query(User).filter_by(user_id=int(user_id)).first()
        except:
            return "gneka"

    login_manager.init_app(app)

    CORS(app, support_credentials=True)

    app.register_blueprint(api_bp, url_prefix='/api')



    @app.after_request
    def middleware_for_response(response):
        # Allowing the credentials in the response.
        response.headers.add('Access-Control-Allow-Origin', request.headers.get("origin"))
        response.headers.add("Access-Control-Allow-Credentials", "true")
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,HEAD,DELETE,UPDATE,OPTIONS')
        response.headers.add('Access-Control-Allow-Headers', 'Authorization, X-PINGOTHER, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, withCredentials')

        return response

    return app


if __name__ == "__main__":
    app = create_app("config")
    app.run(port=8090, debug=True)
