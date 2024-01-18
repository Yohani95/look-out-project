"use client";
import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import { useLocale } from "next-intl";
import { DatePicker, LocalizationProvider, } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { deDE,esES,ptBR } from '@mui/x-date-pickers/locales';
const locales = {
  "es": esES.components.MuiLocalizationProvider.defaultProps.localeText,
  "br": ptBR.components.MuiLocalizationProvider.defaultProps.localeText,
};

function MyDatePicker({ onChange, selectedDate, isRead=false, title, locale="en", shouldBeRequired = true }) {
  const idioma= useLocale();
  const selectedLocale = locales[idioma];
  const [value, setValue] = useState<Dayjs | null>(dayjs(selectedDate));
  const handleDateChange = (date: Dayjs) => {
    setValue(date);
    onChange(date.format());
  };
  console.log(selectedLocale)
  return (
    <LocalizationProvider  localeText={selectedLocale} dateAdapter={AdapterDayjs}>
        <DatePicker
          className="form-control form-select"
          defaultValue={null}
          value={value}
          onChange={handleDateChange}
          label={title || "Date"}
          readOnly={isRead}
          format="DD/MM/YYYY"
          views={['day', 'month','year', ]}
          localeText={selectedLocale}
          
        />
    </LocalizationProvider>
  );
}


export default MyDatePicker;