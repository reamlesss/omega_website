import React, { useState, useEffect } from "react";
import Papa from "papaparse";

/**
 * About component displays information about the BikeEst application
 * and a table of bike data parsed from a CSV file.
 */
function About() {
  // State to store the parsed bike data
  const [bikeData, setBikeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  /**
   * useEffect hook to fetch and parse the CSV file when the component mounts.
   * The CSV file is parsed using Papa Parse, and the resulting data is stored in state.
   */
  useEffect(() => {
    const csvFilePath = "/data.csv";

    fetch(csvFilePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch CSV file: ${response.statusText}`);
        }
        return response.text();
      })
      .then((csvData) => {
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            setBikeData(result.data); // Store parsed data in state
          },
        });
      })
      .catch((error) => {
        console.error("Error loading CSV data:", error);
      });
  }, []);

  // Calculate the data for the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = bikeData.slice(indexOfFirstRow, indexOfLastRow);

  // Handle page change
  const handleNextPage = () => {
    if (currentPage < Math.ceil(bikeData.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container ">
      {/* Card displaying information about the application */}
      <div className="d-flex flex-column justify-content-center align-items-center mb-5 mt-5">
        <h1>About BikeEst</h1>
        <p>BikeEst is an web application for predicting used bike's prices. Using sklearn MLP Regressor and OneHotEncoding and simple encoder for data cleaning</p>
      </div>

      <div className="d-flex justiy-content-center align-items-center mt-5 ">
        <h1>Used data:</h1>
      </div>
      {/* Table displaying the parsed bike data */}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Year</th>
              <th>Type</th>
              <th>Condition</th>
              <th>Frame Size</th>
              <th>Wheel Size</th>
              <th>Material</th>
              <th>Front Travel</th>
              <th>Rear Travel</th>
              <th>Price</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((bike, index) => (
              <tr key={index}>
                <td>{indexOfFirstRow + index + 1}</td>
                <td>{bike.title}</td>
                <td>{bike.year}</td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="d-flex justify-content-center mt-3 mb-5">
        <button
          className="btn btn-primary me-2"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Back
        </button>
        <button
          className="btn btn-primary"
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(bikeData.length / rowsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default About;
