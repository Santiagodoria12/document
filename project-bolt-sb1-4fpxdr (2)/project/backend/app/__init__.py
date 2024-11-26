from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)

    from .routes import components, workflows, ocr
    app.register_blueprint(components.bp)
    app.register_blueprint(workflows.bp)
    app.register_blueprint(ocr.bp)

    return app