import os
import time
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
# Assistant ID
ID = "asst_ezpSvOS3xkcC4FFCpumuMS47"
openai_api_key = os.getenv('OPENAI_API_KEY')
client = OpenAI(api_key=openai_api_key)

username = "Layla"
question = input("Hello " + username + ", what do you want to ask? ")

# Create a new thread
chat = client.beta.threads.create(
    messages=[{"role": "user", "content": question}]
)

# Run the assistant
run = client.beta.threads.runs.create(thread_id=chat.id, assistant_id=ID)
print(f"Run Created: {run.id}")

# Wait for assistant to complete processing
while run.status not in ["completed", "failed", "cancelled"]:
    time.sleep(0.5)
    run = client.beta.threads.runs.retrieve(thread_id=chat.id, run_id=run.id)
    print(f"Run status: {run.status}")

if run.status == "completed":
    print("Run completed")
else:
    print(f"Run failed with status: {run.status}")
    exit()

# Process responses iteratively
for i in range(3):
    # Get the latest response
    message_response = client.beta.threads.messages.list(thread_id=chat.id)
    messages = message_response.data
    latest_message = messages[0]
    
    # Extract the assistant's question
    assistant_question = latest_message.content[0].text.value
    print(f"Assistant: {assistant_question}")

    # Get the user's response
    user_response = input("Your Response: ")

    # ✅ Corrected: Send user's response to the thread
    client.beta.threads.messages.create(
        thread_id=chat.id,
        role="user",  # Specify the role
        content=user_response  # Pass only the response content
    )

    # Create a new run to process the response
    run = client.beta.threads.runs.create(thread_id=chat.id, assistant_id=ID)
    print(f"Run Created: {run.id}")

    # Wait for assistant to complete processing
    while run.status not in ["completed", "failed", "cancelled"]:
        time.sleep(0.5)
        run = client.beta.threads.runs.retrieve(thread_id=chat.id, run_id=run.id)
        print(f"Run status: {run.status}")

    if run.status == "failed":
        print("Run failed, exiting.")
        exit()

# Get final decision from assistant
message_response = client.beta.threads.messages.list(thread_id=chat.id)
messages = message_response.data
latest_message = messages[0]
final_response = latest_message.content[0].text.value

print(f"Final Decision: {final_response}")
