import React, {useState} from "react";
import CalculatorForm from "../CalculatorForm/";
import CalculationSummary from "../CalculationSummary/";
import "./style.scss";


const MortgageCalculator = () => {
    
    const [summaryData, setSummaryData] = useState({});

    const getCalculatedData = (noOfPayments, mortgageAmount, period, amount, hasError) => {
        setSummaryData({noOfPayments, payment : mortgageAmount, period, amount, hasError})
    };

    return (
        <div className="mortgage-calculator container">
            <div className="row">
                <div className="col-md-6 calculator-sections">
                    <CalculatorForm data={getCalculatedData} />
                </div>
                <div className="col-md-6 calculator-sections">
                    <CalculationSummary data={summaryData} />
                </div>
            </div>
        </div>
    )
}

export default MortgageCalculator;