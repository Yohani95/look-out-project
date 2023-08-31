import React from "react";
import { FaTrash, FaBuilding, FaEdit, FaEye } from "react-icons/fa";
import { handleDelete } from "../common/DeleteSweet";
import { Button } from "react-bootstrap";
const ActionButtons = ({onDelete,onEdit,onView }) => {
  return (
    <>
      <Button variant="link">
        <FaEye size={16} onClick={onView}/>
      </Button>
      {/* <Button variant="link" size="sm">
        <FaBuilding className="custom-icon" />
      </Button> */}
      <Button size="sm" variant="link">
        <FaEdit size={16} onClick={onEdit}/>
      </Button>
      <Button size="sm" variant="link" >
        <FaTrash size={16} className="" onClick={onDelete}/>
      </Button>
    </>
  );
};

export default ActionButtons;