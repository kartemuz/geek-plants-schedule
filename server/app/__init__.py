# Flask-приложение


from flask import Flask
from server.config import settings
from server.app.views import blueprints


app = Flask(__name__)
app.debug = settings.DEBUG


for key, value in blueprints:
    app.register_blueprint(value, url_prefix=key)
