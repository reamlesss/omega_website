"""
This is a Flask application that provides an API endpoint for predicting prices based on input data.
The application uses a pre-trained machine learning model to make predictions.
"""

from flask import Flask, request, jsonify
import pandas as pd
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for communication with React frontend

# Load the pre-trained model
model = joblib.load('mlp_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    """
    API endpoint for predicting prices.
    Expects a JSON payload with the following required fields:
    - year
    - condition
    - frame_size
    - type

    Optional fields:
    - wheel_size
    - material
    - front_travel
    - rear_travel

    Returns:
        JSON response with the predicted price or an error message.
    """
    try:
        # Retrieve data from the request
        data = request.json
        
        # Validate required fields
        required_fields = ['year', 'condition', 'frame_size', 'type']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'Missing required field: {field}'}), 400

        # Create a DataFrame with the correct column order
        input_data = pd.DataFrame([{
            'year': data['year'],
            'condition': data['condition'],
            'frame_size': data['frame_size'],
            'wheel_size': data.get('wheel_size', None),
            'material': data.get('material', None),
            'front_travel': data.get('front_travel', None),
            'rear_travel': data.get('rear_travel', None),
            'type': data['type']
        }])

        # Make a predictio
        prediction = model.predict(input_data)
        print(prediction)
        
        return jsonify({
            'predicted_price': round(float(prediction[0]), 2)
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Run the Flask application in debug mode on port 5000
    app.run(debug=True, port=5000)
