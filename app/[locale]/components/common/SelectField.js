'use client';
import React from 'react';
import Select from 'react-select';

const SelectField = ({
  label,
  options,
  labelClassName,
  divClassName,
  preOption,
  onChange,
  selectedValue,
  isRequired = true,
}) => {
  // Convierte las opciones en el formato que acepta react-select
  const formattedOptions =
    options?.map((option) => ({
      value: option.value,
      label: option.label,
    })) || [];

  // Encuentra el valor seleccionado actual
  const currentValue =
    formattedOptions.find((option) => option.value === selectedValue) || null;

  return (
    <>
      <label className={`${labelClassName}`}>{label}</label>
      <div className={`${divClassName}`}>
        <Select
          options={formattedOptions}
          value={currentValue}
          onChange={(selectedOption) =>
            onChange({ target: { value: selectedOption?.value } })
          }
          placeholder={preOption}
          isClearable={!isRequired}
          isSearchable
          required={isRequired}
        />
      </div>
    </>
  );
};

export default SelectField;
