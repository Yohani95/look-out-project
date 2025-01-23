'use client';
import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface MultiSelectProps {
  label: string;
  options: { id: number; nombre: string }[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  selectedValues,
  onChange,
  placeholder = 'Select...',
}) => {
  const [internalSelected, setInternalSelected] =
    useState<string[]>(selectedValues);

  useEffect(() => {
    setInternalSelected(selectedValues); // Actualizar si los valores externos cambian
  }, [selectedValues]);

  const handleSelect = (selected: string) => {
    if (selected === 'all') {
      // Seleccionar o deselectar todo
      const newValues =
        internalSelected.length === options.length
          ? [] // Deseleccionar todo
          : options.map((option) => option.id.toString()); // Seleccionar todo
      setInternalSelected(newValues);
      onChange(newValues);
    } else {
      const newValues = internalSelected.includes(selected)
        ? internalSelected.filter((value) => value !== selected) // Quitar selección
        : [...internalSelected, selected]; // Agregar selección
      setInternalSelected(newValues);
      onChange(newValues);
    }
  };

  return (
    <div className="w-full sm:w-[300px]">
      <Select value="" onValueChange={handleSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-white z-50 shadow-lg rounded-md border border-gray-300">
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            <SelectItem value="all" className="cursor-pointer menu-item">
              {internalSelected.length === options.length
                ? 'Deseleccionar Todo'
                : 'Seleccionar Todo'}
            </SelectItem>
            {options.map((option) => (
              <SelectItem
                key={option.id}
                value={option.id.toString()}
                className="flex items-center gap-2 cursor-pointer menu-item"
              >
                {internalSelected.includes(option.id.toString()) && (
                  <span className="text-custom-blue">✔</span>
                )}
                {option.nombre}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default MultiSelect;
