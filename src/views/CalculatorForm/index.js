import { useState} from "react";
import "./style.scss";
import { getNoOfPayments, getMortgageAmount }  from "../../utils";
import Select from "../../components/Select/";

const CalculatorForm = (props) => {
    const [amount, setAmount] = useState(10000);
    const [rate, setRate] = useState("");
    const [validationError, setValidationError] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);

    const years_limit_amortization_period = 30; 
    const amort_period_yrs = [...Array(years_limit_amortization_period)].map((item,index)=>{
    return {label: `${index+1} years`,
                value: index+1}
    });

    const months = 12;
    const amort_period_months = [...Array(months)].map((item,index)=>{
        return {label: `${index} months`,
                    value: index}
    });

    //Payment frequency
    const payment_frequency = [
        {label:"Weekly",value:52},
        {label:"Bi-Weekly",value:26},
        {label:"Monthly",value:12},
        {label:"Semi-monthly",value:24}
    ];


    const [period_yrs, setPeriodYrs] = useState(2);
    const [period_months, setPeriodMonths] = useState(2);
    const [frequency, setFrequency] = useState(payment_frequency[2].value);
    

    const calculateMortgage = () => {
        const noOfPayments = getNoOfPayments({period_yrs, period_months, frequency});
        const mortgageAmount = getMortgageAmount({amount, rate, noOfPayments, frequency});
        const getFrequencyLabel = payment_frequency.find(item => item.value === frequency);
        let hasError = false;
        if(!amount || !rate){
            hasError = true;
        }
        if(amount && (amount >= 10000000 || amount <= 5000)){
            hasError = true;
        }
        if(rate && (rate <= 0 || rate >= 10 )){
            hasError = true;
        }
        props.data(noOfPayments, mortgageAmount, getFrequencyLabel.label, amount, hasError );

    };

    const validateCalculationForm = () => {
        if(!amount || !rate){
            setValidationError(true);
            setErrorMessage(["Mortgage Amount and Interest Rate cannot be set to 0"]);
        }
        if(amount && (amount >= 10000000 || amount <= 5000)){
            setValidationError(true);
            setErrorMessage([...errorMessage,"Mortgage Amount entered should be between 5000 to 9999999"]);
        }
        if(rate && (rate >= 10 || rate <= 0)){
            setValidationError(true);
            setErrorMessage([...errorMessage,"Interest rate entered should be between 0 to 10"]);
        }
    };


    const handleFormSubmit = (e) => {
        e.preventDefault();
        validateCalculationForm();
        calculateMortgage();
        
    }

    const handleAmountChange = (e) => {
        removeErrors();
        setAmount(Number(e.target.value));

    };

    const handleRateChange = (e) => {
        removeErrors();
        setRate(Number(e.target.value));
    }

    const removeErrors = () => {
        setValidationError(false);
        setErrorMessage([]);
    };

    const handleSelectChangeForFrequency = (data) => {
        setFrequency(data);
    };

    const handleSelectChangeForYrs = (data) => {
        setPeriodYrs(data);
    };

    const handleSelectChangeForMonths = (data) => {
        setPeriodMonths(data);
    }



    return (
        <div className="mortgage-calculator-form">
            {validationError && errorMessage.length > 0 &&  <div className="error_message">{errorMessage.map((item,index)=>{
                return <p key={index}>{item}</p>})}
                </div>
            }   
            <form className="mortgage-form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="amount">Mortgage Amount</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">$</div>
                        </div>
                        <input 
                            id="amount" 
                            className="form-control"
                            name="amount" 
                            type="number" 
                            value={amount} 
                            onChange={handleAmountChange} 
                        
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="rate">Interest Rate</label>
                    <div className="input-group">
                        <input 
                            id="rate" 
                            className="form-control"
                            name="rate" 
                            type="number" 
                            pattern="[+-]?\d+(?:[.,]\d+)?"
                            value={rate} 
                            onChange={handleRateChange} 
                            
                        />
                    <div className="input-group-append">
                        <div className="input-group-text">%</div>
                    </div>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="period_yrs">Amortization Period</label>
                    <Select id="period_yrs" handleSelectChange={handleSelectChangeForYrs}  list={amort_period_yrs} value={period_yrs} />
                    <Select id="period_months" handleSelectChange={handleSelectChangeForMonths}  list={amort_period_months} value={period_months} />
                </div>

                <div className="form-group">
                    <label htmlFor="frequency">Payment Frequency</label>
                    <Select id="frequency" handleSelectChange={handleSelectChangeForFrequency}  list={payment_frequency} value={frequency} />
                </div>

                <button className="calculate">Calculate</button>
                
            </form>
        </div>
    )
}

export default CalculatorForm;