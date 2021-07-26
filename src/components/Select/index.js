const Select = ({id, handleSelectChange, list, value}) => {
    return (
        <select id={id} className="form-control" onChange={(e)=>handleSelectChange(Number(e.target.value))} value={value} >
            {list.map((item,index) => {
                return <option key={item.value} value={item.value}>{item.label}</option>
            })}
        </select>
    )
};

export default Select;

