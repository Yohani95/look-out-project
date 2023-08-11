"use client";
import React from "react";
import { FaTrash, FaBuilding, FaEdit, FaEye,FaUnlock ,FaChartLine,FaPlusSquare} from "react-icons/fa";
import { handleDelete } from "../common/DeleteSweet";
import { Button } from "react-bootstrap";
const ButtonsProfessional = ({nameItem}) => {
  const onDeleteItem = () => {
    // Llama a la función handleDelete y pasa el nombre del item y la función onDelete como argumentos
    handleDelete({nameItem}, "onDelete");
  };
  return (
    <>
      <Button variant="link" title="asd">
        <FaEye size={16} />
      </Button>
      <Button  variant="link" title="asd">
        <FaPlusSquare size={16} />
      </Button>
    </>
  );
};

export default ButtonsProfessional;
