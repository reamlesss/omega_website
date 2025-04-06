import { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

function BikePriceForm() {
  const [formData, setFormData] = useState({
    type: "",
    condition: "",
    frame_size: "",
    wheel_size: "",
    material: "",
    front_travel: "",
    rear_travel: "",
    year: "", // Ensure year is included
  });

  const [predictedPrice, setPredictedPrice] = useState(null);
  const [error, setError] = useState(null); // Track errors

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData
      );
      setPredictedPrice(response.data.predicted_price);
    } catch (err) {
      console.error("Error predicting price:", err);
      setError("Failed to predict price. Please try again.");
    }
  };

  return (
    <>
      <h4>Fill the form</h4>
      <Form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <Form.Group style={{ flex: "1 1 calc(33.333% - 1rem)" }}>
            <Form.Label>Type</Form.Label>
            <Form.Select name="type" onChange={handleChange}>
              <option value="">Select Type</option>
              <option value="ENDURO">ENDURO</option>
              <option value="TRAIL">TRAIL</option>
              <option value="DOWNHILL">DOWNHILL</option>
              <option value="XC">XC</option>
              <option value="E-BIKE">E-BIKE</option>
            </Form.Select>
          </Form.Group>
          <Form.Group style={{ flex: "1 1 calc(33.333% - 1rem)" }}>
            <Form.Label>Condition</Form.Label>
            <Form.Select name="condition" onChange={handleChange}>
              <option value="">Select Condition</option>
              <option value="New">New</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Poor">Poor</option>
              <option value="For Parts">For Parts</option>
            </Form.Select>
          </Form.Group>
          <Form.Group style={{ flex: "1 1 calc(33.333% - 1rem)" }}>
            <Form.Label>Frame size</Form.Label>
            <Form.Select name="frame_size" onChange={handleChange}>
              <option value="">Select Frame Size</option>
              <option value="XXS">XXS</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </Form.Select>
          </Form.Group>
          <Form.Group style={{ flex: "1 1 calc(33.333% - 1rem)" }}>
            <Form.Label>Wheel size</Form.Label>
            <Form.Select name="wheel_size" onChange={handleChange}>
              <option value="">Select Wheel Size</option>
              <option value="29">29</option>
              <option value="27.5">27.5</option>
              <option value="26">26</option>
              <option value="24">24</option>
              <option value="20">20</option>
            </Form.Select>
          </Form.Group>
          <Form.Group style={{ flex: "1 1 calc(33.333% - 1rem)" }}>
            <Form.Label>Material</Form.Label>
            <Form.Select name="material" onChange={handleChange}>
              <option value="">Select Material</option>
              <option value="Aluminium">Aluminium</option>
              <option value="Carbon">Carbon</option>
              <option value="Chromoly">Chromoly</option>
              <option value="Steel">Steel</option>
              <option value="Titanium">Titanium</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>
          <Form.Group
            style={{ flex: "1 1 calc(33.333% - 1rem)" }}
            controlId="frontTravel"
          >
            <Form.Label>Front travel</Form.Label>
            <Form.Select
              name="front_travel"
              onChange={handleChange}
              defaultValue=""
            >
              <option value="" disabled>
                Choose value
              </option>
              <option value="190">190</option>
              <option value="180">180</option>
              <option value="175">175</option>
              <option value="170">170</option>
              <option value="160">160</option>
              <option value="150">150</option>
              <option value="140">140</option>
              <option value="130">130</option>
              <option value="120">120</option>
              <option value="110">110</option>
              <option value="100">100</option>
              <option value="90">90</option>
              <option value="80">80</option>
              <option value="60">60</option>
            </Form.Select>
          </Form.Group>
          <Form.Group style={{ flex: "1 1 calc(33.333% - 1rem)" }}>
            <Form.Label>Rear travel</Form.Label>
            <Form.Select name="rear_travel" onChange={handleChange}>
              <option value="">Choose travel</option>
              <option value="Hardtail">Hardtail</option>
              <option value="200">200</option>
              <option value="190">190</option>
              <option value="180">180</option>
              <option value="170">170</option>
              <option value="160">160</option>
              <option value="155">155</option>
              <option value="150">150</option>
              <option value="145">145</option>
              <option value="140">140</option>
              <option value="135">135</option>
              <option value="130">130</option>
              <option value="120">120</option>
              <option value="110">110</option>
              <option value="100">100</option>
              <option value="80">80</option>
            </Form.Select>
          </Form.Group>
          <Form.Group style={{ flex: "1 1 calc(33.333% - 1rem)" }}>
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="number"
              name="year"
              placeholder="Enter Year"
              onChange={handleChange}
            />
          </Form.Group>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ flex: "1 1 100%" }}
          >
            <Button
              variant="primary"
              type="submit"
              className="btn btn-primary w-50"
            >
              Submit
            </Button>
          </div>
        </div>
      </Form>
      {predictedPrice && <h5>Predicted Price: ${predictedPrice}</h5>}
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error */}
    </>
  );
}

export default BikePriceForm;
