"use client"
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function MyDatePicker() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div>
      <DatePicker
      className="form-control form-select"
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        placeholderText='date'
      />
    </div>
  );
}

export default MyDatePicker;
