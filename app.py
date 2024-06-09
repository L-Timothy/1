from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__, static_folder='.', static_url_path='', template_folder='.')

API_URL = 'https://momo.opao.xyz/v1/chat/completions'
API_KEY = 'sk-0t7MWWFHrRzTA3bGA9Aa1976Bd474d5d87B67462813c383a'

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def ask():
    data = request.json
    conversation = data.get('conversation', [])

    print(f"Received conversation: {conversation}")

    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }
    payload = {
        'model': 'gpt-4o',
        'messages': conversation
    }

    try:
        response = requests.post(API_URL, headers=headers, json=payload, timeout=30)
        response.raise_for_status()

        print("Response status code:", response.status_code)
        print("Response content:", response.content)

        choices = response.json().get('choices', [])
        if choices:
            answer = choices[0].get('message', {}).get('content', 'No answer available.')
        else:
            answer = 'No answer available.'

        print("Extracted answer:", answer)
    except requests.exceptions.RequestException as e:
        print("API request error:", e)
        answer = "An error occurred while processing your request."
    except ValueError:
        print("JSON decode error. Response content was not valid JSON.")
        answer = "Received an invalid response from the API."

    return jsonify({'answer': answer})

if __name__ == '__main__':
    app.run(debug=True)
