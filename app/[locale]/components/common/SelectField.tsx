import React from 'react';
import Select from 'react-select';

const SelectField = ({
  label = '',
  options = [],
  labelClassName = '',
  divClassName = '',
  preOption = 'Selecciona una opción',
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
          styles={{
            menu: (provided) => ({
              ...provided,
              zIndex: 1500, // Asegura que el menú de selección tenga una prioridad mayor
            }),
          }}
        />
      </div>
    </>
  );
};

export default SelectField;
