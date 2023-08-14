"use client";
import React from "react";
import {
  FaCreditCard,
  FaCartPlus,
  FaDollarSign,
  FaMonero,
  FaTrash
} from "react-icons/fa";
import { handleDelete } from "../common/DeleteSweet";
import { Button } from "react-bootstrap";
const ButtonsRequest = ({ nameItem }) => {
  const onDeleteItem = () => {
    // Llama a la función handleDelete y pasa el nombre del item y la función onDelete como argumentos
    handleDelete({ nameItem }, "onDelete");
  };
  return (
    <>
      <Button variant="link">
        <FaTrash size={16} onClick={onDeleteItem}/>
      </Button>
    </>
  );
};

export default ButtonsRequest;
