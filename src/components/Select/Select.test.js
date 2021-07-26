import React from "react";
import {render, fireEvent, screen} from '@testing-library/react'

import Select from "./index";


test('renders the options text/label', () => {
    const handleSelectChangeForFrequency = jest.fn();
    const list = [{label:"Weekly",value:1},{label:"Bi-Weekly",value:2}];
    const value = 1;
    render(<Select id="months"  handleSelectChange={handleSelectChangeForFrequency}  list={list} value={value} />)
    expect(screen.getByText("Bi-Weekly")).toBeInTheDocument();
    expect(screen.getByText("Weekly")).toBeInTheDocument();

});

test('renders the option value properly', () => {
    const handleSelectChangeForFrequency = jest.fn();
    const list = [{label:"Weekly",value:1},{label:"Bi-Weekly",value:2}];
    const value = 1;
    render(<Select id="months"  handleSelectChange={handleSelectChangeForFrequency}  list={list} value={value} />)
    expect(screen.getByText("Weekly")).toHaveValue("1");
    expect(screen.getByText("Bi-Weekly")).toHaveValue("2");
});

test('renders all the options provided', () => {
    const handleSelectChangeForFrequency = jest.fn();
    const list = [{label:"Weekly",value:1},{label:"Bi-Weekly",value:2}];
    const value = 1;
    render(<Select id="months"  handleSelectChange={handleSelectChangeForFrequency}  list={list} value={value} />)
    const optionList = screen.getAllByRole("option");
    expect(optionList.length).toEqual(2);
});

