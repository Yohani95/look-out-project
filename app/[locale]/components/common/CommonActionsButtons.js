import React from "react";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
import { Button } from "react-bootstrap";
const CommonActionsButtons = ({onDelete,onEdit,onView }) => {
  return (
    <>
      <Button variant="link">
        <FaEye size={16} onClick={onView}/>
      </Button>
      <Button size="sm" variant="link">
        <FaEdit size={16} onClick={onEdit}/>
      </Button>
      <Button size="sm" variant="link" >
        <FaTrash size={16} className="" onClick={onDelete}/>
      </Button>
    </>
  );
};

export default CommonActionsButtons;