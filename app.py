from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)

# Load the model
with open("Random_Forest_model.pkl", "rb") as f:
    model = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Log the incoming request data
        data = request.json
        print("Received data:", data)

        # Ensure all required fields are present
        required_fields = ['condition', 'frame_size', 'wheel_size', 'material', 'front_travel', 'rear_travel', 'year']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing field: {field}"}), 400

        # Convert data to the format expected by the model
        features = [
            int(data['condition']),
            int(data['frame_size']),
            float(data['wheel_size']),
            data['material'],
            float(data['front_travel']),
            float(data['rear_travel']),
            int(data['year'])
        ]

        # Make prediction
        prediction = model.predict([features])[0]
        return jsonify({"predicted_price": prediction})

    except Exception as e:
        print("Error during prediction:", e)
        return jsonify({"error": "An error occurred during prediction"}), 500

# Example input data for prediction
input_data = {
    'title': '2020 Yeti SB150 Medium',
    'condition': 3,
    'frame_size': 3,
    'wheel_size': 29,
    'material': 'Carbon',
    'front_travel': 170,
    'rear_travel': 150,
    'price': 2000,
    'url': 'https://www.pinkbike.com/buysell/3438442/'
}

# Convert input data to the format expected by the model
input_features = [
    input_data['condition'],
    input_data['frame_size'],
    input_data['wheel_size'],
    input_data['front_travel'],
    input_data['rear_travel'],
    2020,  # Year extracted from the title
    0,     # Placeholder for additional features if needed
    0,     # Placeholder for additional features if needed
    0      # Placeholder for additional features if needed
]

# Predict using the model
prediction = model.predict([input_features])
print(f"Predicted value: {prediction[0]}")

if __name__ == '__main__':
    # Print prediction for the mockup bike on start
    print("Mockup bike input data:", input_data)
    print("Mockup bike prediction:", prediction)
    app.run(debug=True)
