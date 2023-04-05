import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import ConversionRates from "./components/ConversionRates";
import Conversions from "./components/Conversions";
import NavBar from "./components/NavBar";

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
