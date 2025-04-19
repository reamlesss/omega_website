import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import BikePriceForm from "./components/BikePriceform";
import About from "./components/About";
import "./App.css";

function App() {
  // Add a global error handler for debugging
  window.addEventListener("error", (event) => {
    console.error("Global error caught:", event.message);
  });

  window.addEventListener("unhandledrejection", (event) => {
    console.error("Unhandled promise rejection:", event.reason);
  });

  return (
    <Router>
      <Navbar
        expand="lg"
        className="bg-body-tertiary font-l fw-bold text-center"
      >
        <Container className="d-flex flex-column align-items-center">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-center"
          >
            <Nav>
              <Nav.Link as={Link} to="/price-guessing">
                Price Guessing
              </Nav.Link>
              <Navbar.Brand as={Link} to="/" className="logo mb-2 mx-4">
                BikeEst
              </Navbar.Brand>
              <Nav.Link as={Link} to="/about">
                About BikeEst
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="d-flex flex-column justify-content-center align-items-center vh-100 mb-5 ">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* <h1 className="fs-1 fw-bold text-center font-l">Welcome to</h1> */}
                <h1 className="text-center logo-text fw-bold my-2">
                  <i>BikeEst</i>
                </h1>
                <h2 className="fs-4 font-l text-light text-center text-wrap non-selectable">
                  <i>"Your one-stop solution for pricing your bikes"</i>
                </h2>
                {/* <hr className="w-50" /> */}
                <div className="d-flex flex-column gap-3 w-50">
                  <Button
                    variant="primary"
                    as={Link}
                    to="/price-guessing"
                    className="menu-btn text-center "
                  >
                    Price Guess
                  </Button>
                  <Button
                    variant="primary"
                    as={Link}
                    to="/about"
                    className="menu-btn "
                  >
                    About BikeEst
                  </Button>
                </div>
              </>
            }
          />
          <Route path="/price-guessing" element={<BikePriceForm />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>

      {/* <Container className="d-flex flex-column justify-content-center align-items-center vh-100 w-50">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="d-flex gap-3 mb-4">
                  <Button variant="primary" as={Link} to="/">
                    Home
                  </Button>
                  <Button variant="primary" as={Link} to="/price-guessing">
                    Price Guess
                  </Button>
                  <Button variant="primary" as={Link} to="/about">
                    About BikeEst
                  </Button>
                </div>
                <Home />
              </>
            }
          />
          <Route path="/price-guessing" element={<BikePriceForm />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container> */}
    </Router>
  );
}

export default App;
