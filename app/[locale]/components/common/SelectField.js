import React from 'react';

const SelectField = ({ label, options, labelClassName, divClassName,preOption,action,onChange,selectedValue }) => {
  const isRequired = action && selectedValue === ''; // Verifica si el campo es requerido y no se ha seleccionado nada
  return (
    <>
      <label className={`${labelClassName}`}>
        {label}
      </label>
      <div className={`${divClassName}`}>
        <select className="form-control form-select" disabled={action} onChange={onChange} required value={selectedValue}>
        <option value="">{preOption}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {isRequired && (
          <div className="invalid-feedback">
            Please select an option.
          </div>
        )}
      </div>
      </>
  );
};

export default SelectField;
