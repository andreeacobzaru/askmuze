from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Allow requests from the frontend
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/')
def hello_world():
    return jsonify({"message": "Hello from Flask!"})

@app.route('/api/data', methods=['GET'])
def get_data():
    # Add logging to inspect the response content
    response = {"message": "This is a message from the backend!"}
    print("Sending response:", response)
    return jsonify(response)

@app.route('/api/data', methods=['POST'])
def handle_data():
    data = request.get_json()
    return jsonify({'message': 'Data received', 'data': data}), 200

if __name__ == "__main__":
    app.run(debug=True)
