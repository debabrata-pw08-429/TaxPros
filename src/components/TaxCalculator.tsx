import { useState } from "react";
import "../styles/TaxCalculator.css";

const TaxCalculator = (): JSX.Element => {
  const [optingForTaxation, setOptingForTaxation] = useState<string>("");
  const [taxPayerType, setTaxPayerType] = useState<string>("");
  const [residentialStatus, setResidentialStatus] = useState<string>("");
  const [incomeSalary, setIncomeSalary] = useState<number>(0);
  const [incomeHouseProperty, setIncomeHouseProperty] = useState<number>(0);
  const [capitalGains, setCapitalGains] = useState<number>(0);
  const [incomeOtherSources, setIncomeOtherSources] = useState<number>(0);
  const [profitsBusiness, setProfitsBusiness] = useState<number>(0);
  const [agriculturalIncome, setAgriculturalIncome] = useState<number>(0);
  const [deductions, setDeductions] = useState<number>(0);
  const [netTaxableIncome, setNetTaxableIncome] = useState<number>(0);
  const [incomeTaxNormalRate, setIncomeTaxNormalRate] = useState<number>(0);
  const [shortTermCapitalGains, setShortTermCapitalGains] = useState<number>(0);
  const [longTermCapitalGains10, setLongTermCapitalGains10] =
    useState<number>(0);
  const [longTermCapitalGains20, setLongTermCapitalGains20] =
    useState<number>(0);
  const [lotteryWinnings, setLotteryWinnings] = useState<number>(0);
  const [incomeTaxRelief, setIncomeTaxRelief] = useState<number>(0);
  const [surcharge, setSurcharge] = useState<number>(0);
  const [healthEducationCess, setHealthEducationCess] = useState<number>(0);
  const [totalTaxLiability, setTotalTaxLiability] = useState<number>(0);
  const [reliefOtherThan87A, setReliefOtherThan87A] = useState<number>(0);
  const [tdsCreditUtilized, setTdsCreditUtilized] = useState<number>(0);
  const [assessedTax, setAssessedTax] = useState<number>(0);

  const calculateTax = (): void => {
    if (
      optingForTaxation.trim() === "" ||
      taxPayerType.trim() === "" ||
      residentialStatus.trim() === "" ||
      incomeSalary === 0 ||
      incomeHouseProperty === 0 ||
      capitalGains === 0 ||
      incomeOtherSources === 0 ||
      profitsBusiness === 0 ||
      agriculturalIncome === 0 ||
      netTaxableIncome === 0 ||
      incomeTaxNormalRate === 0 ||
      shortTermCapitalGains === 0 ||
      longTermCapitalGains10 === 0 ||
      longTermCapitalGains20 === 0 ||
      lotteryWinnings === 0 ||
      incomeTaxRelief === 0 ||
      surcharge === 0 ||
      healthEducationCess === 0 ||
      totalTaxLiability === 0 ||
      reliefOtherThan87A === 0 ||
      tdsCreditUtilized === 0 ||
      assessedTax === 0
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    // Calculating tax logic goes here
    const taxableIncome: number = netTaxableIncome - deductions;
    let totalTax = 0;
    // Calculate tax based on tax slabs
    if (taxableIncome <= 250000) {
      totalTax = 0;
    } else if (taxableIncome <= 500000) {
      totalTax = taxableIncome * 0.05;
    } else if (taxableIncome <= 1000000) {
      totalTax = taxableIncome * 0.2;
    } else {
      totalTax = taxableIncome * 0.3;
    }
    // Calculate surcharge if applicable
    if (taxableIncome > 5000000) {
      const surchargePercentage: number = surcharge === 0 ? 10 : surcharge;
      totalTax += (totalTax * surchargePercentage) / 100;
    }
    // Calculate health and education cess
    const cess: number = (totalTax * healthEducationCess) / 100;
    // Calculate total tax liability
    const taxLiability: number = totalTax + cess - incomeTaxRelief;
    // Calculate total tax liability after considering relief other than relief u/s 87A
    const totalTaxLiabilityAfterRelief: number =
      taxLiability - reliefOtherThan87A;
    // Calculate tax payable after considering TDS/TCS/MAT (AMT) credit utilized
    const taxPayable: number = totalTaxLiabilityAfterRelief - tdsCreditUtilized;
    // Calculate assessed tax
    const finalTax: number = taxPayable > 0 ? taxPayable : 0;
    setAssessedTax(finalTax);
  };

  return (
    <div className="tax-calculator">
      <div>
        <h1>Advance Tax Calculator</h1>
        <span>
          {" "}
          Advance Tax is a direct tax (income tax) payable in advance by an
          assessee on his estimated total income of a financial year. It is also
          termed as pay-as-you-earn as it is to be paid before the end of the
          Financial Year. As per section 208 of Income Tax Act, advance tax
          liability arises only if estimated tax liability exceeds Rs.10,000.
          Use this tool to calculate your Income-tax liability and Advance-tax
          liability as well, for the Financial Year 2022-23 (A.Y. 2023-24).
        </span>
      </div>
      <hr />

      <div className="field">
        <label htmlFor="optingForTaxation">
          Opting for taxation under Section 115BAC:
        </label>
        <select
          id="optingForTaxation"
          value={optingForTaxation}
          onChange={(e) => setOptingForTaxation(e.target.value)}
        >
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="taxPayerType">
          Male / Female / Senior Citizen / Super Senior Citizen:
        </label>
        <select
          id="taxPayerType"
          value={taxPayerType}
          onChange={(e) => setTaxPayerType(e.target.value)}
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="senior-citizen">Senior Citizen</option>
          <option value="super-senior-citizen">Super Senior Citizen</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="residentialStatus">Residential Status:</label>
        <select
          id="residentialStatus"
          value={residentialStatus}
          onChange={(e) => setResidentialStatus(e.target.value)}
        >
          <option value="">Select</option>
          <option value="resident">Resident</option>
          <option value="not-ordinary-resident">Not Ordinary Resident</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="incomeSalary">Income from Salary:</label>
        <input
          type="number"
          id="incomeSalary"
          value={incomeSalary}
          onChange={(e) => setIncomeSalary(Number(e.target.value))}
        />
      </div>

      <div className="field">
        <label htmlFor="incomeHouseProperty">Income From House Property:</label>
        <input
          type="number"
          id="incomeHouseProperty"
          value={incomeHouseProperty}
          onChange={(e) => setIncomeHouseProperty(Number(e.target.value))}
        />
      </div>

      <div className="field">
        <label htmlFor="capitalGains">Capital Gains:</label>
        <input
          type="number"
          id="capitalGains"
          value={capitalGains}
          onChange={(e) => setCapitalGains(Number(e.target.value))}
        />
      </div>

      <div className="field">
        <label htmlFor="incomeOtherSources">Income From Other Sources:</label>
        <input
          type="number"
          id="incomeOtherSources"
          value={incomeOtherSources}
          onChange={(e) => setIncomeOtherSources(Number(e.target.value))}
        />
      </div>

      <div className="field">
        <label htmlFor="profitsBusiness">
          Profits and Gains of Business or Profession:
        </label>
        <input
          type="number"
          id="profitsBusiness"
          value={profitsBusiness}
          onChange={(e) => setProfitsBusiness(Number(e.target.value))}
        />
      </div>

      <div className="field">
        <label htmlFor="agriculturalIncome">Agricultural Income:</label>
        <input
          type="number"
          id="agriculturalIncome"
          value={agriculturalIncome}
          onChange={(e) => setAgriculturalIncome(Number(e.target.value))}
        />
      </div>

      <div className="field">
        <label htmlFor="deductions">Deductions:</label>
        <input
          type="number"
          id="deductions"
          value={deductions}
          onChange={(e) => setDeductions(Number(e.target.value))}
        />
      </div>

      <div className="field">
        <label htmlFor="netTaxableIncome">Net Taxable Income:</label>
        <input
          type="number"
          id="netTaxableIncome"
          value={netTaxableIncome}
          onChange={(e) => setNetTaxableIncome(Number(e.target.value))}
        />
      </div>

      <div className="field">
        <label htmlFor="incomeTaxNormalRate">
          Income Liable to Tax at Normal Rate:
        </label>
        <input
          type="number"
          id="incomeTaxNormalRate"
          value={incomeTaxNormalRate}
          onChange={(e) => setIncomeTaxNormalRate(Number(e.target.value))}
        />
      </div>

      <div className="field">
        <label htmlFor="shortTermCapitalGains">
          Short Term Capital Gains (Covered u/s 111A) 15%:
        </label>
        <input
          type="number"
          id="shortTermCapitalGains"
          value={shortTermCapitalGains}
          onChange={(e) => setShortTermCapitalGains(Number(e.target.value))}
        />
      </div>

      <div className="field">
        <label htmlFor="longTermCapitalGains10">
          Long Term Capital Gains (Covered u/s 112A) 10%:
        </label>
        <input
          type="number"
          id="longTermCapitalGains10"
          value={longTermCapitalGains10}
          onChange={(e) => setLongTermCapitalGains10(Number(e.target.value))}
        />
      </div>

      <div className="field">
        <label htmlFor="longTermCapitalGains20">
          Long Term Capital Gains (Charged to tax @ 20%):
        </label>
        <input
          type="number"
          id="longTermCapitalGains20"
          value={longTermCapitalGains20}
          onChange={(e) => setLongTermCapitalGains20(Number(e.target.value))}
        />
      </div>

      <div className="field">
        <label htmlFor="lotteryWinnings">
          Winnings from Lottery, Crossword Puzzles, etc) 30%:
        </label>
        <input
          type="number"
          id="lotteryWinnings"
          value={lotteryWinnings}
          onChange={(e) => setLotteryWinnings(Number(e.target.value))}
        />
      </div>

      <div className="field">
        <label htmlFor="incomeTaxRelief">
          Income Tax after relief u/s 87A:
        </label>
        <input
          type="number"
          id="incomeTaxRelief"
          value={incomeTaxRelief}
          onChange={(e) => setIncomeTaxRelief(Number(e.target.value))}
        />
      </div>

      <div className="field">
        <label htmlFor="surcharge">Surcharge:</label>
        <input
          type="number"
          id="surcharge"
          value={surcharge}
          onChange={(e) => setSurcharge(Number(e.target.value))}
        />
      </div>

      <div className="field">
        <label htmlFor="healthEducationCess">Health and Education Cess:</label>
        <input
          type="number"
          id="healthEducationCess"
          value={healthEducationCess}
          onChange={(e) => setHealthEducationCess(Number(e.target.value))}
        />
      </div>

      <div className="field">
        <label htmlFor="totalTaxLiability">Total Tax Liability:</label>
        <input
          type="number"
          id="totalTaxLiability"
          value={totalTaxLiability}
          onChange={(e) => setTotalTaxLiability(Number(e.target.value))}
        />
      </div>

      <div className="field">
        <label htmlFor="reliefOtherThan87A">
          Relief other than relief u/s 87A:
        </label>
        <input
          type="number"
          id="reliefOtherThan87A"
          value={reliefOtherThan87A}
          onChange={(e) => setReliefOtherThan87A(Number(e.target.value))}
        />
      </div>

      <div className="field">
        <label htmlFor="tdsCreditUtilized">
          TDS/TCS/MAT (AMT) Credit Utilized:
        </label>
        <input
          type="number"
          id="tdsCreditUtilized"
          value={tdsCreditUtilized}
          onChange={(e) => setTdsCreditUtilized(Number(e.target.value))}
        />
      </div>

      <div className="field">
        <label htmlFor="assessedTax">Assessed Tax:</label>
        <input type="number" id="assessedTax" value={assessedTax} readOnly />
      </div>

      <button onClick={calculateTax}>Calculate Tax</button>
    </div>
  );
};

export default TaxCalculator;
