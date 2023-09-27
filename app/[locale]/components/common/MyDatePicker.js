"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function MyDatePicker({ onChange, selectedDate,isRead=false }) {
  return (
    <div>
      <DatePicker
        className="form-control form-select"
        selected={selectedDate}
        onChange={onChange}
        placeholderText="date"
        dateFormat="dd/MM/yyyy"
        required
        readOnly={isRead}
      />
    </div>
  );
}

export default MyDatePicker;
