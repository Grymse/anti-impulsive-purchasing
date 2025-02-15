from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app, supports_credentials=True, origins="*", allow_headers="*", methods="*")

@app.after_request
def add_csp_headers(response):
    response.headers["Content-Security-Policy"] = "default-src * data: blob: 'unsafe-inline' 'unsafe-eval'; connect-src *;"
    return response

@app.route('/endpoint', methods=['POST'])
def endpoint():
    data = request.get_json()
    if data:
        print(f"{data['url']} - {data['type']}")
        return jsonify({"message": "Keys printed to console"}), 200
    else:
        return jsonify({"error": "No JSON data received"}), 400

if __name__ == '__main__':
    app.run(debug=True)