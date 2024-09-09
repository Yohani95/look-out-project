'use client';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { es, ptBR, enUS } from 'date-fns/locale';
import { useLocale } from 'next-intl';

const locales = {
  es: es,
  en: enUS,
  br: ptBR,
};
const timeCaptions = {
  es: 'Hora',
  en: 'Time',
  br: 'Hora',
};
function MyDatePicker({
  onChange,
  selectedDate,
  isRead = false,
  title,
  locale = 'en',
  shouldBeRequired = true,
  withTime = false, // Nuevo flag para indicar si se debe seleccionar la hora
}) {
  const idioma = useLocale();
  const selectedLocale = locales[idioma];
  const selectedTimeCaption = timeCaptions[idioma] || 'Time';

  return (
    <DatePicker
      className="form-control form-select"
      selected={selectedDate}
      onChange={onChange}
      placeholderText={title || 'Date'}
      dateFormat={withTime ? 'dd/MM/yyyy HH:mm aa' : 'dd/MM/yyyy'} // Cambia el formato basado en el flag
      showTimeSelect={withTime} // Muestra la selección de hora si withTime es true
      timeFormat="HH:mm" // Formato de la hora (solo si withTime es true)
      timeIntervals={15} // Intervalos de 15 minutos (solo si withTime es true)
      //required={shouldBeRequired}
      timeCaption={selectedTimeCaption} // Texto dinámico según el idioma
      readOnly={isRead}
      locale={selectedLocale}
    />
  );
}

export default MyDatePicker;
