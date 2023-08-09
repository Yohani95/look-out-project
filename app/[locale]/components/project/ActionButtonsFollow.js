"use client";
import React from "react";
import { FaTrash, FaBuilding, FaEdit, FaEye,FaUnlock ,FaArrowUp} from "react-icons/fa";
import { handleDelete } from "../common/DeleteSweet";
import { Button } from "react-bootstrap";
function ActionButtonsFollow({nameItem}) {
    const onDeleteItem = () => {
        // Llama a la función handleDelete y pasa el nombre del item y la función onDelete como argumentos
        handleDelete({nameItem}, "onDelete");
      };
      return (
        <>
         <Button variant="link" title="asd">
            <FaArrowUp size={16} />
          </Button>
           <Button variant="link" title="asd">
            <FaEye size={16} />
          </Button>
          <Button  variant="link " title="asd" onClick={onDeleteItem}>
            <FaTrash size={16} />
          </Button>
        </>
      );
}

export default ActionButtonsFollow