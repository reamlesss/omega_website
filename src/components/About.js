import React, { useState, useEffect } from "react";
import Papa from "papaparse";

/**
 * About component displays information about the BikeEst application
 * and a table of bike data parsed from a CSV file.
 */
function About() {
  // State to store the parsed bike data
  const [bikeData, setBikeData] = useState([]);

  /**
   * useEffect hook to fetch and parse the CSV file when the component mounts.
   * The CSV file is parsed using Papa Parse, and the resulting data is stored in state.
   */
  useEffect(() => {
    // Path to the CSV file
    const csvFilePath = "mtb-data.csv";

    // Fetch the CSV file and parse it
    fetch(csvFilePath)
      .then((response) => response.text())
      .then((csvData) => {
        Papa.parse(csvData, {
          header: true, // Parse CSV into objects using the header row
          complete: (result) => {
            setBikeData(result.data); // Store parsed data in state
          },
        });
      });
  }, []);

  return (
    <>
      {/* Card displaying information about the application */}
      <div className="d-flex justify-content-center align-items-center">
        <div className="card text-center" style={{ width: "30rem" }}>
          <div className="card-header">
            <h1>About BikeEst</h1>
          </div>
          <div className="card-body">
            <p className="card-text">
              This is a simple web application that helps you estimate the price
              of a bike based on its features. You can input various parameters
              and get an estimated price for your bike.
            </p>
          </div>
        </div>
      </div>

      {/* Table displaying the parsed bike data */}
      <div className="container mt-5">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Condition</th>
              <th>Frame Size</th>
              <th>Wheel Size</th>
              <th>Material</th>
              <th>Front Travel</th>
              <th>Rear Travel</th>
              <th>Price</th>
              <th>URL</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {bikeData.map((bike, index) => (
              <tr key={index}>
                <td>{bike.title}</td>
                <td>{bike.type}</td>
                <td>{bike.condition}</td>
                <td>{bike.frame_size}</td>
                <td>{bike.wheel_size}</td>
                <td>{bike.material}</td>
                <td>{bike.front_travel}</td>
                <td>{bike.rear_travel}</td>
                <td>{bike.price}</td>
                <td>
                  <a href={bike.url} target="_blank" rel="noopener noreferrer">
                    View
                  </a>
                </td>
                <td>{bike.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default About;
