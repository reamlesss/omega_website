# BikeEst - Bike Price Estimation Web Application

BikeEst is a web application designed to help users estimate the price of a bike based on its features. The application provides a user-friendly interface to input various bike parameters and displays a table of existing bike data for reference.

## Features

- Estimate the price of a bike based on its features.
- View a dataset of bikes with details such as type, condition, frame size, wheel size, material, and price.
- Responsive design for seamless use on different devices.

## Technologies Used

- **Frontend**: React.js
  - Components styled with Bootstrap for a clean and responsive UI.
- **Backend**: Python Flask
  - Provides APIs for handling requests and processing data.
- **CSV Parsing**: [Papa Parse](https://www.papaparse.com/)
  - Used to parse the `mtb-data.csv` file containing bike data.
- **Data Visualization**: HTML tables styled with Bootstrap.

## Dataset

The application uses a dataset stored in `mtb-data.csv`, which contains the following columns:
- Title
- Type
- Condition
- Frame Size
- Wheel Size
- Material
- Front Travel
- Rear Travel
- Price
- URL
- Year

This dataset is displayed in a table on the "About" page for user reference.

## How It Works

1. The application fetches the `mtb-data.csv` file from the `public` directory.
2. The CSV file is parsed using Papa Parse to extract bike data.
3. The parsed data is displayed in a table on the "About" page.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- Python and Flask installed for backend development.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd omega
   ```
3. Install frontend dependencies:
   ```bash
   npm install
   ```
4. Navigate to the backend directory (if applicable) and install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Running the Application

#### Start the Backend Server
Navigate to the backend directory and run:
```bash
python3 app.py
```

#### Start the Frontend Development Server
Navigate to the project root directory and run:
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Future Enhancements

- Add a feature to allow users to upload their own bike data.
- Implement advanced filtering and sorting for the dataset.
- Integrate a machine learning model to provide more accurate price estimations.

## Learn More

To learn more about React, visit the [React documentation](https://reactjs.org/).

To learn more about Flask, visit the [Flask documentation](https://flask.palletsprojects.com/).

For more information about Papa Parse, visit [Papa Parse documentation](https://www.papaparse.com/).

## License

This project is licensed under the MIT License.
