"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {es,ptBR,enUS} from 'date-fns/locale'
import { useLocale } from "next-intl";
const locales = {
  "es": es,
  "en": enUS,
  "br": ptBR
};
function MyDatePicker({ onChange, selectedDate,isRead=false,title,locale="en",shouldBeRequired = true}) {
  const idioma= useLocale();
  const selectedLocale = locales[idioma];
  return (
    <div>
      <DatePicker
        className="form-control form-select"
        selected={selectedDate}
        onChange={onChange}
        placeholderText={title || "Date"}
        dateFormat="dd/MM/yyyy"
        required={shouldBeRequired}
        readOnly={isRead}
        locale={selectedLocale}
      />
    </div>
  );
}

export default MyDatePicker;
