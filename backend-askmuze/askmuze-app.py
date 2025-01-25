from flask import Flask, jsonify
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

if __name__ == "__main__":
    app.run(debug=True)
