import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

function BikePriceForm() {
  // State to manage form data
  const [formData, setFormData] = useState({
    model: "xgboost_model",
    type: "",
    condition: "",
    frame_size: "",
    wheel_size: "",
    material: "",
    front_travel: "",
    rear_travel: "",
    year: "",
  });

  // State to store the predicted price and any errors
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [error, setError] = useState(null);

  // Handle input changes and update form data
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Alert user when changing the model
    if (name === "model") {
      alert(
        "Changing the model can lead to bad predictions. Use for experimentation only. use XGBoost for the best results."
      );
    }

    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission and send data to the prediction API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const payload = {
        ...formData,
        // Convert data for compatibility with the prediction model
        type: formData.type.toLowerCase(),
        condition: parseInt(formData.condition),
        wheel_size: parseFloat(formData.wheel_size),
        front_travel: parseFloat(formData.front_travel),
        rear_travel:
          formData.rear_travel === "Hardtail"
            ? 0
            : parseFloat(formData.rear_travel),
        year: parseInt(formData.year),
      };

      const response = await axios.post(
        "http://89.168.84.210/api/predict",
        payload
      );
      setPredictedPrice(response.data.predicted_price);
    } catch (err) {
      console.error("Error during prediction:", err);
      setError(err.response?.data?.error || "Connection error with the server");
    }
  };

  // Function to reset the form
  const handleReset = () => {
    document.querySelectorAll("select, input").forEach((input) => {
      input.value = "";
    });
    setFormData({
      model: "",
      type: "",
      condition: "",
      frame_size: "",
      wheel_size: "",
      material: "",
      front_travel: "",
      rear_travel: "",
      year: "",
    });
    setPredictedPrice(null);
    setError(null);
  };

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isSmallScreen ? (
        <div className="container form-cont w-100 mb-5">
          <Form onSubmit={handleSubmit} className="w-100 container vh-50">
            <h4 className="fs-1 mb-2">Fill out the form</h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem", // Reduce gap between inputs
              }}
            >
              {/* Model Selection */}
              <Form.Group>
                <Form.Label style={{ fontSize: "0.9rem" }}>Model</Form.Label>
                <Form.Select
                  name="model"
                  onChange={handleChange}
                  required
                  style={{ fontSize: "0.9rem", padding: "0.1rem" }} // Smaller font and padding
                >
                  <option value="xgboost_model">XGBoost model</option>
                  <option value="decision_tree_model">
                    Decision tree model
                  </option>
                  <option value="mlp_model">MLP model</option>
                  <option value="random_forest_model">Random Forest</option>

                  {/* Add more models as needed */}
                </Form.Select>
              </Form.Group>

              {/* Bike Type */}
              <Form.Group>
                <Form.Label style={{ fontSize: "0.9rem" }}>Type</Form.Label>
                <Form.Select
                  name="type"
                  onChange={handleChange}
                  required
                  style={{ fontSize: "0.9rem", padding: "0.4rem" }}
                >
                  <option value="">Select type</option>
                  <option value="DOWNHILL">DOWNHILL</option>
                  <option value="ENDURO">ENDURO</option>
                  <option value="XC">XC</option>
                  <option value="TRAIL">TRAIL</option>
                </Form.Select>
              </Form.Group>

              {/* Bike Condition */}
              <Form.Group>
                <Form.Label style={{ fontSize: "0.9rem" }}>
                  Condition
                </Form.Label>
                <Form.Select
                  name="condition"
                  onChange={handleChange}
                  required
                  style={{ fontSize: "0.9rem", padding: "0.4rem" }}
                >
                  <option value="">Select condition</option>
                  <option value="1">New</option>
                  <option value="2">Excellent</option>
                  <option value="3">Good</option>
                  <option value="4">Poor</option>
                  <option value="5">For parts</option>
                </Form.Select>
              </Form.Group>

              {/* Frame Size */}
              <Form.Group>
                <Form.Label style={{ fontSize: "0.9rem" }}>
                  Frame Size
                </Form.Label>
                <Form.Select
                  name="frame_size"
                  onChange={handleChange}
                  required
                  style={{ fontSize: "0.9rem", padding: "0.4rem" }}
                >
                  <option value="">Select size</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </Form.Select>
              </Form.Group>

              {/* Wheel Size */}
              <Form.Group>
                <Form.Label style={{ fontSize: "0.9rem" }}>
                  Wheel Size
                </Form.Label>
                <Form.Select
                  name="wheel_size"
                  onChange={handleChange}
                  required
                  style={{ fontSize: "0.9rem", padding: "0.4rem" }}
                >
                  <option value="">Select size</option>
                  <option value="26">26"</option>
                  <option value="27.5">27.5"</option>
                  <option value="29">29"</option>
                </Form.Select>
              </Form.Group>

              {/* Material */}
              <Form.Group>
                <Form.Label style={{ fontSize: "0.9rem" }}>Material</Form.Label>
                <Form.Select
                  name="material"
                  onChange={handleChange}
                  required
                  style={{ fontSize: "0.9rem", padding: "0.4rem" }}
                >
                  <option value="">Select material</option>
                  <option value="Aluminium">Aluminium</option>
                  <option value="Carbon">Carbon</option>
                  <option value="Steel">Steel</option>
                  <option value="Titanium">Titanium</option>
                </Form.Select>
              </Form.Group>

              {/* Front Travel */}
              <Form.Group>
                <Form.Label style={{ fontSize: "0.9rem" }}>
                  Front Travel (mm)
                </Form.Label>
                <Form.Select
                  name="front_travel"
                  onChange={handleChange}
                  required
                  style={{ fontSize: "0.9rem", padding: "0.4rem" }}
                >
                  <option value="">Select value</option>
                  {[60, 80, 100, 120, 140, 150, 160, 170, 180, 190, 200].map(
                    (value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    )
                  )}
                </Form.Select>
              </Form.Group>

              {/* Rear Travel */}
              <Form.Group>
                <Form.Label style={{ fontSize: "0.9rem" }}>
                  Rear Travel
                </Form.Label>
                <Form.Select
                  name="rear_travel"
                  onChange={handleChange}
                  required
                  style={{ fontSize: "0.9rem", padding: "0.4rem" }}
                >
                  <option value="">Select value</option>
                  <option value="Hardtail">Hardtail</option>
                  {[80, 100, 120, 140, 150, 160, 170, 180, 190, 200].map(
                    (value) => (
                      <option key={value} value={value}>
                        {value} mm
                      </option>
                    )
                  )}
                </Form.Select>
              </Form.Group>

              {/* Year of Manufacture */}
              <Form.Group>
                <Form.Label style={{ fontSize: "0.9rem" }}>
                  Year of Manufacture
                </Form.Label>
                <Form.Control
                  type="number"
                  name="year"
                  placeholder="Enter year"
                  min="2000"
                  max="2025"
                  onChange={handleChange}
                  required
                  style={{ fontSize: "0.9rem", padding: "0.4rem" }}
                />
              </Form.Group>

              {/* Predicted Price */}
              {predictedPrice && (
                <Form.Group>
                  <Form.Label style={{ fontSize: "0.9rem" }}>
                    Estimated Price
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={`$${Math.round(predictedPrice)}`}
                    readOnly
                    style={{
                      fontSize: "0.9rem",
                      padding: "0.4rem",
                      backgroundColor: "#f8f9fa",
                    }}
                  />
                </Form.Group>
              )}

              {/* Reset Button */}
              <Button
                variant="danger"
                type="button"
                size="sm"
                onClick={handleReset}
                style={{ fontSize: "0.9rem", padding: "0.4rem" }}
              >
                Reset Form
              </Button>

              {/* Submit Button */}
              <Button
                variant="primary"
                type="submit"
                size="lg"
                style={{ fontSize: "0.9rem", padding: "0.4rem" }}
              >
                Calculate Price
              </Button>
            </div>
          </Form>
        </div>
      ) : (
        <Form onSubmit={handleSubmit} className="w-50">
          <h4 className="fs-1 mb-2">Fill out the form</h4>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            {/* Model Selection */}
            <Form.Group style={{ flex: "1 1 calc(33.333% - 1rem)" }}>
              <Form.Label>Model</Form.Label>
              <Form.Select name="model" onChange={handleChange} required>
                <option value="xgboost_model">XGBoost model</option>
                <option value="decision_tree_model">Decision tree model</option>
                <option value="mlp_model">MLP model</option>
                <option value="random_forest_model">Random Forest</option>

                {/* Add more models as needed */}
              </Form.Select>
            </Form.Group>

            {/* Bike Type */}
            <Form.Group style={{ flex: "1 1 calc(33.333% - 1rem)" }}>
              <Form.Label>Type</Form.Label>
              <Form.Select name="type" onChange={handleChange} required>
                <option value="">Select type</option>
                <option value="DOWNHILL">DOWNHILL</option>
                <option value="ENDURO">ENDURO</option>
                <option value="XC">XC</option>
                <option value="TRAIL">TRAIL</option>
              </Form.Select>
            </Form.Group>

            {/* Bike Condition */}
            <Form.Group style={{ flex: "1 1 calc(33.333% - 1rem)" }}>
              <Form.Label>Condition</Form.Label>
              <Form.Select name="condition" onChange={handleChange} required>
                <option value="">Select condition</option>
                <option value="1">New</option>
                <option value="2">Excellent</option>
                <option value="3">Good</option>
                <option value="4">Poor</option>
                <option value="5">For parts</option>
              </Form.Select>
            </Form.Group>

            {/* Frame Size */}
            <Form.Group style={{ flex: "1 1 calc(33.333% - 1rem)" }}>
              <Form.Label>Frame Size</Form.Label>
              <Form.Select name="frame_size" onChange={handleChange} required>
                <option value="">Select size</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </Form.Select>
            </Form.Group>

            {/* Wheel Size */}
            <Form.Group style={{ flex: "1 1 calc(33.333% - 1rem)" }}>
              <Form.Label>Wheel Size</Form.Label>
              <Form.Select name="wheel_size" onChange={handleChange} required>
                <option value="">Select size</option>
                <option value="26">26"</option>
                <option value="27.5">27.5"</option>
                <option value="29">29"</option>
              </Form.Select>
            </Form.Group>

            {/* Material */}
            <Form.Group style={{ flex: "1 1 calc(33.333% - 1rem)" }}>
              <Form.Label>Material</Form.Label>
              <Form.Select name="material" onChange={handleChange} required>
                <option value="">Select material</option>
                <option value="Aluminium">Aluminium</option>
                <option value="Carbon">Carbon</option>
                <option value="Steel">Steel</option>
                <option value="Titanium">Titanium</option>
              </Form.Select>
            </Form.Group>

            {/* Front Travel */}
            <Form.Group style={{ flex: "1 1 calc(33.333% - 1rem)" }}>
              <Form.Label>Front Travel (mm)</Form.Label>
              <Form.Select name="front_travel" onChange={handleChange} required>
                <option value="">Select value</option>
                {[60, 80, 100, 120, 140, 150, 160, 170, 180, 190, 200].map(
                  (value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  )
                )}
              </Form.Select>
            </Form.Group>

            {/* Rear Travel */}
            <Form.Group style={{ flex: "1 1 calc(33.333% - 1rem)" }}>
              <Form.Label>Rear Travel</Form.Label>
              <Form.Select name="rear_travel" onChange={handleChange} required>
                <option value="">Select value</option>
                <option value="Hardtail">Hardtail</option>
                {[80, 100, 120, 140, 150, 160, 170, 180, 190, 200].map(
                  (value) => (
                    <option key={value} value={value}>
                      {value} mm
                    </option>
                  )
                )}
              </Form.Select>
            </Form.Group>

            {/* Year of Manufacture */}
            <Form.Group style={{ flex: "1 1 calc(33.333% - 1rem)" }}>
              <Form.Label>Year of Manufacture</Form.Label>
              <Form.Control
                type="number"
                name="year"
                placeholder="Enter year"
                min="2000"
                max="2025"
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Reset Button */}
            <div
              style={{ flex: "1 1 calc(33.333% - 1rem)", textAlign: "right" }}
            >
              <Button
                variant="danger"
                type="button"
                size="sm"
                onClick={handleReset}
              >
                Reset Form
              </Button>
            </div>

            {/* Submit Button */}
            <div style={{ flex: "1 1 100%", textAlign: "center" }}>
              <Button
                variant="primary"
                type="submit"
                size="lg"
                className="me-2"
              >
                Calculate Price
              </Button>
            </div>
          </div>
        </Form>
      )}

      {/* Display Predicted Price */}
      {predictedPrice && (
        <div className="mt-3 text-center text-light fw-bold">
          <h4>Estimated Price: ${Math.round(predictedPrice)}</h4>
        </div>
      )}

      {/* Display Error Message */}
      {error && <p className="text-danger mt-3 text-center">{error}</p>}
    </>
  );
}

export default BikePriceForm;
