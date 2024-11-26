from flask import jsonify, request
from . import api

ocr_configs = []

@api.route('/ocr-config', methods=['GET', 'POST'])
def handle_ocr_config():
    if request.method == 'POST':
        config = request.json
        ocr_configs.append(config)
        return jsonify(config), 201
    return jsonify(ocr_configs)