"use client";
import React from "react";
import {
  FaCreditCard,
  FaCartPlus,
  FaDollarSign,
  FaMonero
} from "react-icons/fa";
import { handleDelete } from "../common/DeleteSweet";
import { Button } from "react-bootstrap";
const ButtonsFacture = ({ nameItem }) => {
  const onDeleteItem = () => {
    // Llama a la función handleDelete y pasa el nombre del item y la función onDelete como argumentos
    handleDelete({ nameItem }, "onDelete");
  };
  return (
    <>
      <Button variant="link">
        <FaCartPlus size={16} />
      </Button>
      <Button variant="link">
        <FaCreditCard size={16} />
      </Button>
      <Button variant="link">
        <FaDollarSign size={16} />
      </Button>
    </>
  );
};

export default ButtonsFacture;
