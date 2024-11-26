from flask import Blueprint, jsonify, request
from ..models.workflow import Workflow

bp = Blueprint('workflows', __name__, url_prefix='/api')

workflows = []

@bp.route('/workflows', methods=['GET', 'POST'])
def handle_workflows():
    if request.method == 'POST':
        data = request.json
        workflow = Workflow(data['name'], data['components'])
        workflows.append(workflow)
        return jsonify(workflow.to_dict()), 201
    return jsonify([wf.to_dict() for wf in workflows])