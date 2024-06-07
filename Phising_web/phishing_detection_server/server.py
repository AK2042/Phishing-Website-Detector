from flask import Flask, request, jsonify
from flask_cors import CORS
from python_file.fasterapi import check_phishing_url  # Adjust the import based on your directory structure

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

@app.route('/api/check-url', methods=['POST'])
def check_url():
    data = request.get_json()
    url = data.get('url')
    if not url:
        return jsonify({'error': 'URL is required'}), 400

    # Call the check_phishing_url function from fasterapi.py
    result = check_phishing_url(url)
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
