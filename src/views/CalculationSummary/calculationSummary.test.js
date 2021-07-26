import { render, screen } from '@testing-library/react';

import CalculationSummary from "./index";

test('renders summary title', () => {
    const data = {noOfPayments : 2, payment : 202, period: 26, amount: 1000, hasError: false};
    const {container, getByText} = render(<CalculationSummary data={data} />)
    expect(getByText('Calculation Summary:')).toBeInTheDocument()

});
