from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import time
from openai import OpenAI
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

load_dotenv()
ID = "asst_ezpSvOS3xkcC4FFCpumuMS47"
openai_api_key = os.getenv('OPENAI_API_KEY')
client = OpenAI(api_key=openai_api_key)

# Store session data (temporary solution; use a database for production)
user_sessions = {}

@app.route("/start_chat", methods=["POST"])
def start_chat():
    data = request.get_json()
    user_question = data.get("question", "")

    # Create a new thread
    chat_thread = client.beta.threads.create(
        messages=[{"role": "user", "content": user_question}]
    )

    # Run the assistant
    run = client.beta.threads.runs.create(thread_id=chat_thread.id, assistant_id=ID)

    # Wait for assistant's response
    while run.status not in ["completed", "failed", "cancelled"]:
        time.sleep(0.5)
        run = client.beta.threads.runs.retrieve(thread_id=chat_thread.id, run_id=run.id)

    # Retrieve the first clarifying question
    message_response = client.beta.threads.messages.list(thread_id=chat_thread.id)
    messages = message_response.data
    assistant_question = messages[0].content[0].text.value

    # Store session (to track conversation)
    user_sessions[chat_thread.id] = {"question_count": 1}

    return jsonify({"thread_id": chat_thread.id, "clarifying_question": assistant_question})


@app.route("/continue_chat", methods=["POST"])
def continue_chat():
    data = request.get_json()
    thread_id = data.get("thread_id")
    user_response = data.get("response")

    if thread_id not in user_sessions:
        return jsonify({"error": "Invalid session"}), 400

    # Send user's response to the thread
    client.beta.threads.messages.create(
        thread_id=thread_id,
        role="user",
        content=user_response
    )

    # Run the assistant again
    run = client.beta.threads.runs.create(thread_id=thread_id, assistant_id=ID)

    # Wait for assistant to process the response
    while run.status not in ["completed", "failed", "cancelled"]:
        time.sleep(0.5)
        run = client.beta.threads.runs.retrieve(thread_id=thread_id, run_id=run.id)

    # Retrieve the next message from assistant
    message_response = client.beta.threads.messages.list(thread_id=thread_id)
    messages = message_response.data
    assistant_reply = messages[0].content[0].text.value

    # Increment question count
    user_sessions[thread_id]["question_count"] += 1

    if user_sessions[thread_id]["question_count"] > 3:
        user_sessions[thread_id]["question_count"] = 1
        return jsonify({"final_decision": assistant_reply})
    else:
        return jsonify({"clarifying_question": assistant_reply})

if __name__ == "__main__":
    app.run(debug=True)
