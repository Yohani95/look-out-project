'use client';
import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { es, ptBR, enUS } from 'date-fns/locale';
import { useLocale } from 'next-intl';
import { PopperProps } from '@mui/material';
interface DatePickerFieldProps {
  title?: string;
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  labelClassName?: string;
  divClassName?: string;
  preOption?: string;
  isRequired?: boolean;
  withTime?: boolean;
  isRead?: boolean;
}

const locales = {
  es: es,
  en: enUS,
  br: ptBR,
};

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  title = 'Select Date',
  selectedDate,
  onChange,
  labelClassName = '',
  divClassName = '',
  preOption = 'Select Date',
  isRequired = true,
  withTime = false,
  isRead = false,
}) => {
  const idioma = useLocale();
  const selectedLocale = locales[idioma] || enUS;
  useEffect(() => {}, [selectedDate]);
  const popperSx: PopperProps['sx'] = {
    '& .MuiPaper-root': {
      minWidth: '300px', // Ancho mínimo del cuadro del selector
      maxHeight: '400px', // Altura máxima para el cuadro del selector de tiempo
      overflowY: 'auto', // Agrega un scroll dentro del selector
      zIndex: 1300, // Asegura que se muestre sobre otros elementos
    },
  };
  return (
    <>
      <div className={divClassName}>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={selectedLocale}
        >
          {withTime ? (
            <DateTimePicker
              label={title} // Usa el título proporcionado
              value={selectedDate}
              onChange={(date) => onChange(date)}
              readOnly={isRead}
              slotProps={{
                textField: {
                  fullWidth: true,
                  required: isRequired,
                  variant: 'outlined',
                  sx: { backgroundColor: '#fff', borderRadius: '4px' },
                },
                popper: {
                  sx: popperSx, // Aplicar los estilos personalizados al popper
                },
              }}
              ampm={false} // Utilizar formato de 24 horas
            />
          ) : (
            <DatePicker
              label={title} // Usa el título proporcionado
              value={selectedDate}
              onChange={(date) => onChange(date)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  required: isRequired,
                  variant: 'outlined',
                  sx: { backgroundColor: '#fff', borderRadius: '4px' },
                },
              }}
            />
          )}
        </LocalizationProvider>
      </div>
    </>
  );
};
export default DatePickerField;
