"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function MyDatePicker({ onChange, selectedDate,isRead=false,title,locale,shouldBeRequired = true}) {
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
        locale={locale}
      />
    </div>
  );
}

export default MyDatePicker;
