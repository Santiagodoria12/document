from flask import Blueprint

api = Blueprint('api', __name__)

from . import components
from . import workflows
from . import ocr