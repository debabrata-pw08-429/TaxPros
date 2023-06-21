import React from "react";
import { MdOutlineHomeWork } from "react-icons/Md";
import { HiOutlineReceiptTax } from "react-icons/Hi";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar-container">
      <div className="logo">
        <img
          src="https://img.freepik.com/free-photo/3d-illustration-payment-confirmation-bill_107791-16608.jpg?size=626&ext=jpg&ga=GA1.1.2057281508.1687237735&semt=ais"
          alt="logo"
        />
        TaxPros
      </div>

      <div className="nav-links">
        <Link to="/" className="nav-link">
          <MdOutlineHomeWork className="nav-icons" />
          HRA Cal.
        </Link>
        <Link to="/advance-tax-calculator" className="nav-link">
          <HiOutlineReceiptTax className="nav-icons" />
          Advance Tax Cal.
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
