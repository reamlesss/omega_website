from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)

# Load the model
with open("model_exports/Neural_Network_MLP_-_logistic_pipeline.pkl", "rb") as f:
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

if __name__ == '__main__':
    app.run(debug=True)
