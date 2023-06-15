from flask import Flask
from flask_cors import CORS

from api import user, login, prod, pay
from api.database import db

UPLOAD_FOLDER = '..\src\image'
PUBLIC_FOLDER = 'src/image'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}


def api():
    flask_app = Flask(__name__, instance_relative_config=True)
    flask_app.config.from_mapping(
        SECRET_KEY='dev',
    )
    flask_app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    flask_app.config['PUBLIC_FOLDER'] = PUBLIC_FOLDER
    flask_app.config['ALLOWED_EXTENSIONS'] = ALLOWED_EXTENSIONS
    flask_app.secret_key = 'dev'
    flask_app.config['JSON_SORT_KEYS'] = False
    CORS(flask_app)

    flask_app.register_blueprint(user.bp)
    flask_app.register_blueprint(login.bp)
    flask_app.register_blueprint(prod.bp)
    flask_app.register_blueprint(pay.bp)
    db.init_app(flask_app)

    return flask_app


app = api()
