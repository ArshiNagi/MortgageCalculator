export const getNoOfPayments = ({period_yrs, period_months, frequency}) => {
    //Payment Frequency is weekly
    if(frequency === 52) {
        return ((period_yrs * 52) + (period_months * 52/12));
    }

    //Payment Frequency is bi-weekly
    if(frequency === 26) {
        return ((period_yrs * 26) + (period_months * 26/12));
    }

    //Payment Frequency is monthly
    if(frequency === 12) {
        return ((period_yrs * 12) + period_months);
    }

    //Payment Frequency is semi-monthly
    if(frequency === 24) {
        return ((period_yrs * 24) + (period_months * 2));
    }
}

export const getMortgageAmount = ({amount, rate, noOfPayments, frequency}) => {
    //Calculate rate_percent based on the frequency in order to calculate the final mortgage amount
    let rate_percent = (rate / 100) / frequency;
    
    const mortgage_amount =  parseFloat(amount * [(rate_percent * (Math.pow(1 + rate_percent, noOfPayments)) ) /   ((Math.pow(1 + rate_percent, noOfPayments)) - 1)]).toFixed(2);
    return mortgage_amount;
}