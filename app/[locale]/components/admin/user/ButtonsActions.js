import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
function ButtonsActions({ id, onDelete,onEdit }) {
  return (
    <>
      <Button size="sm" variant="link">
        <FaEdit size={16} onClick={onEdit}/>
      </Button>
      <Button size="sm" variant="link" onClick={onDelete}>
        <FaTrash size={16} />
      </Button>
    </>
  );
}

export default ButtonsActions;
