import React, { useState } from "react";
import "../styles/HraCalculation.css";

const HraCalculation: React.FC = () => {
  const [salary, setSalary] = useState<string>("");
  const [actualRentPaid, setActualRentPaid] = useState<string>("");
  const [city, setCity] = useState<"metro" | "non-metro">("metro");
  const [hraReceived, setHraReceived] = useState<string>("");
  const [dearnessAllowance, setDearnessAllowance] = useState<string>("0");
  const [commission, setCommission] = useState<string>("0");
  const [hraExemption, setHraExemption] = useState<string>("0");
  const [taxableHra, setTaxableHra] = useState<string>("0");

  const calculateHra = () => {
    if (
      salary.trim() === "" ||
      actualRentPaid.trim() === "" ||
      hraReceived.trim() === ""
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    const salaryValue = parseFloat(salary);
    const actualRentPaidValue = parseFloat(actualRentPaid);
    const hraReceivedValue = parseFloat(hraReceived);
    const dearnessAllowanceValue = parseFloat(dearnessAllowance || "0");
    const commissionValue = parseFloat(commission || "0");

    const tenPercentOfSalary = salaryValue * 0.1;
    let hraExemptionAmount = 0;

    const totalSalary = salaryValue + dearnessAllowanceValue + commissionValue;

    if (city === "metro") {
      hraExemptionAmount = Math.min(
        totalSalary * 0.5,
        actualRentPaidValue - tenPercentOfSalary
      );
    } else {
      hraExemptionAmount = Math.min(
        totalSalary * 0.4,
        actualRentPaidValue - tenPercentOfSalary
      );
    }

    const taxableHraAmount = hraReceivedValue - hraExemptionAmount;

    setHraExemption(hraExemptionAmount.toFixed(0));
    setTaxableHra(taxableHraAmount.toFixed(0));
  };

  const resetValues = () => {
    setSalary("");
    setActualRentPaid("");
    setCity("metro");
    setHraReceived("");
    setDearnessAllowance("0");
    setCommission("0");
    setHraExemption("0");
    setTaxableHra("0");
  };

  function convertCurrencyFormat(input: string): string {
    // Remove any spaces from the input string
    const inputWithoutSpaces = input.replace(/\s/g, "");

    // Extract the numeric part from the input string
    const numericPart = inputWithoutSpaces.match(/\d+/)?.[0] || "";

    // Format the numeric part with comma-separated values
    const formattedNumericPart = Number(numericPart).toLocaleString("en-IN");

    // Replace the numeric part in the input string with the formatted value
    const output = inputWithoutSpaces.replace(
      numericPart,
      formattedNumericPart
    );

    return output;
  }

  return (
    <div className="hra-form">
      <div>
        <h1>HRA Calculator</h1>
        <span>
          {" "}
          House Rent Allowance or HRA is a component of salary provided by
          employers to employees to meet their rental expenses. HRA can be
          claimed as a tax deduction under the Income Tax Act. The amount of HRA
          received depends on factors such as the employee's salary, the actual
          rent paid, and the city of residence. This calculator allows you to
          know how much of your HRA is taxable and how much is exempted from tax
          (As amended upto Finance Act, 2023).
        </span>
      </div>
      <hr />
      <div className="left-container">
        <div className="form-field">
          <label>Basic Salary (per annum):</label>
          <input
            type="text"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="e.g. 600000"
          />
        </div>
        <div className="form-field">
          <label>HRA Received (per annum):</label>
          <input
            type="text"
            value={hraReceived}
            onChange={(e) => setHraReceived(e.target.value)}
            placeholder="e.g. 96000"
          />
        </div>
        <div className="form-field">
          <label>Total Rent Paid (per annum):</label>
          <input
            type="text"
            value={actualRentPaid}
            onChange={(e) => setActualRentPaid(e.target.value)}
            placeholder="e.g. 120000"
          />
        </div>
        <div className="form-field">
          <label>City:</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value as "metro" | "non-metro")}
          >
            <option value="metro">Metro</option>
            <option value="non-metro">Non-Metro</option>
          </select>
        </div>
        <div className="form-field">
          <label>Dearness Allowance (Optional) :</label>
          <input
            type="text"
            value={dearnessAllowance}
            onChange={(e) => setDearnessAllowance(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Commission (% of turnover achieved):</label>
          <input
            type="text"
            value={commission}
            onChange={(e) => setCommission(e.target.value)}
          />
        </div>
        <div className="form-button">
          <button onClick={calculateHra}>Calculate HRA</button>
          <button onClick={resetValues}>Reset</button>
        </div>
      </div>
      <hr />
      <div id="right-container">
        <div className="result-field">
          <h3>Exempted HRA:</h3>
          <p>₹ {convertCurrencyFormat(hraExemption)} / year</p>
        </div>
        <div className="result-field">
          <h3>Taxable HRA:</h3>
          <p>₹ {convertCurrencyFormat(taxableHra)}</p>
        </div>
      </div>
    </div>
  );
};

export default HraCalculation;
