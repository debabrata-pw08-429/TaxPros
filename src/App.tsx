import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HraCalculation from "./components/HraCalculator";
import TaxCalculator from "./components/TaxCalculator";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HraCalculation />} />
        <Route path="/advance-tax-calculator" element={<TaxCalculator />} />
      </Routes>
    </Router>
  );
};

export default App;
