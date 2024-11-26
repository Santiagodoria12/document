from flask import Blueprint, jsonify, request

bp = Blueprint('ocr', __name__, url_prefix='/api')

ocr_configs = []

@bp.route('/ocr-config', methods=['GET', 'POST'])
def handle_ocr_config():
    if request.method == 'POST':
        config = request.json
        ocr_configs.append(config)
        return jsonify(config), 201
    return jsonify(ocr_configs)