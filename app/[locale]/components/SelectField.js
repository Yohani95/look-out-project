import React from 'react';
import { useTranslations } from 'next-intl';

const SelectField = ({ label, options, labelClassName, divClassName,preOption }) => {
  const t = useTranslations('Ficha');

  return (
    <>
      <label className={`${labelClassName}`}>
        {label}
      </label>
      <div className={`${divClassName}`}>
        <select className="form-control">
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
