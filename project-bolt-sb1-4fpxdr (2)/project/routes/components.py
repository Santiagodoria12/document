from flask import jsonify, request
from . import api
from models.component import Component

components = []

@api.route('/components', methods=['GET', 'POST'])
def handle_components():
    if request.method == 'POST':
        data = request.json
        component = Component(data['name'], data['type'])
        components.append(component)
        return jsonify(component.to_dict()), 201
    return jsonify([comp.to_dict() for comp in components])