from flask import jsonify, request
from . import api
from models.workflow import Workflow

workflows = []

@api.route('/workflows', methods=['GET', 'POST'])
def handle_workflows():
    if request.method == 'POST':
        data = request.json
        workflow = Workflow(data['name'], data['components'])
        workflows.append(workflow)
        return jsonify(workflow.to_dict()), 201
    return jsonify([wf.to_dict() for wf in workflows])