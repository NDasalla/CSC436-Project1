import ConversionRates from "./components/ConversionRates";
import Conversions from "./components/Conversions";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Routes>
          <Route exact path="/" element={<ConversionRates />} />
          <Route exact path="/conversions" element={<Conversions />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
