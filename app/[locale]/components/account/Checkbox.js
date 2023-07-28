import React from 'react';

const Checkbox = ({ row }) => {
  return <input type="checkbox" checked={row.isSelected} />;
};

export default Checkbox;