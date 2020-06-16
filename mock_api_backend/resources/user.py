from flask import jsonify
from flask_restful import Resource, reqparse
from flask_login import login_user, current_user, logout_user
from datetime import datetime
from sqlalchemy.exc import IntegrityError

from extensions import db, bcrypt
from models import User

parser = reqparse.RequestParser()
parser.add_argument('first_name', type=str)
parser.add_argument('last_name', type=str)
parser.add_argument('email', type=str)
parser.add_argument('password', type=str)


class Register(Resource):

    def post(self):
        args = parser.parse_args()
        print("args", args)

        first_name = args['first_name']
        last_name = args['last_name']
        email = args['email']
        password = bcrypt.generate_password_hash(args['password']).decode('utf-8')
        created = datetime.utcnow()

        user = User(first_name=first_name, last_name=last_name, email=email, password=password)
        db.session.add(user)

        try:
            db.session.commit()
            result = {
                'first_name': first_name,
                'last_name': last_name,
                'email': email,
                'password': password,
                'created': created
            }

            return jsonify(
                {
                    'action': 'registering user',
                    'status': 'success',
                    'result': result
                }
            )
        except IntegrityError:
            return jsonify(
                {
                    'action': 'registering user',
                    'status': 'failed',
                    'result': 'user already exists'
                }
            )


class Login(Resource):

    def post(self):
        args = parser.parse_args()
        email = args['email']
        password = args['password']

        user = db.session.query(User).filter_by(email=email).first()
        print(user.user_id, "result of user.user_id")
        if user is None:
            return jsonify(authorization=False)
        if bcrypt.check_password_hash(user.password, password):
            login_user(user, remember=True)
            print(user, "user login")
            result = jsonify(isLoggedIn=current_user.is_authenticated, user=user.as_dict())
        else:
            result = jsonify(authorization=False)
        return result

class Logout(Resource):
    def get(self):
        logout_user()
        print("logout")
        return "logged out user", 201
