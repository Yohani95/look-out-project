import React from 'react';

const SelectField = ({ label, options, labelClassName, divClassName,preOption,action,onChange }) => {
  return (
    <>
      <label className={`${labelClassName}`}>
        {label}
      </label>
      <div className={`${divClassName}`}>
        <select className="form-control form-select" disabled={action} onChange={onChange}>
        <option value="">{preOption}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      </>
  );
};

export default SelectField;
