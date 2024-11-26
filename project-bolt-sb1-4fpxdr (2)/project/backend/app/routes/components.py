from flask import Blueprint, jsonify, request
from ..models.component import Component

bp = Blueprint('components', __name__, url_prefix='/api')

components = []

@bp.route('/components', methods=['GET', 'POST'])
def handle_components():
    if request.method == 'POST':
        data = request.json
        component = Component(data['name'], data['type'])
        components.append(component)
        return jsonify(component.to_dict()), 201
    return jsonify([comp.to_dict() for comp in components])