import React from "react";
import "./style.scss";

const CalculationSummary = (props) => {
    const {period, payment, amount , hasError} = props.data;
    if(!amount){
        return <div className="calculation-summary"> Please fill in the details for mortgage calculation!</div>
    }
    
    return (
        <div className="calculation-summary">
            <section>
               <h2>Calculation Summary:</h2>
               {hasError && 
                    <div className="calculation-summary info-msg"> Please fill in the correct details for mortgage calculation!</div>
                }   
                {!hasError && 
                <div>
                    <p>{`Your ${period} payment will be: `}</p>
                    <p>{`$`}<span className="mortgage_amount result">{payment }</span></p>
                    <p>{`         for mortgage amount ${amount}`}</p>
                </div>
                }   
               
            </section>
            
            
        </div>
    )
}

export default CalculationSummary;