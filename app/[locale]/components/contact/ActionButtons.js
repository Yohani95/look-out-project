"use client";
import React from "react";
import { FaTrash, FaBuilding, FaEdit, FaEye } from "react-icons/fa";
import { handleDelete } from "../common/DeleteSweet";
import { Button } from "react-bootstrap";
const ActionButtons = ({nameItem}) => {
  const onDeleteItem = () => {
    // Llama a la función handleDelete y pasa el nombre del item y la función onDelete como argumentos
    handleDelete({nameItem}, "onDelete");
  };
  return (
    <>
      <Button variant="link">
        <FaEye size={16} />
      </Button>
      <Button variant="link" size="sm">
        <FaBuilding className="custom-icon" />
      </Button>
      <Button size="sm" variant="link">
        <FaEdit size={16} />
      </Button>
      <Button size="sm" variant="link" onClick={onDeleteItem}>
        <FaTrash size={16} className="" />
      </Button>
    </>
  );
};

export default ActionButtons;
