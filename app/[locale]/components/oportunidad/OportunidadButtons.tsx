import React from 'react'
import {
    FaTrash,
    FaEdit,
    FaEye,
  } from "react-icons/fa";
  import { Button } from "react-bootstrap";
  import { Tooltip } from "react-tooltip";
  import { useRouter } from "next/navigation";
  import ConfirmationDialog from "@/app/[locale]/components/common/ConfirmationDialog";
function OportunidadButtons({t,oportunidad}) {
    const router = useRouter();
    const handleEdit = async (id, trans, push) => {
      const confirmed = await ConfirmationDialog(
        trans.notification.edit.title,
        trans.notification.edit.text,
        trans.notification.edit.type,
        trans.notification.edit.buttonOk,
        trans.notification.edit.buttonCancel
      );
      if (confirmed) {
        push(`/opportunities/edit/${oportunidad.id}`)
      }
    };
    const handleDelete = async (id, trans, push) => {
        const confirmed = await ConfirmationDialog(
          trans.notification.edit.title,
          trans.notification.edit.text,
          trans.notification.edit.type,
          trans.notification.edit.buttonOk,
          trans.notification.edit.buttonCancel
        );
        if (confirmed) {
          push(`/opportunities/edit/${oportunidad.id}`)
        }
      };
  return (
    <>
    <Button size="sm" variant="link" onClick={() => handleEdit(oportunidad.id, t, router.push)}>
      <FaEdit size={16} className="my-anchor-element" />
      <Tooltip anchorSelect=".my-anchor-element" place="top">
        {t?.Common.edit}
      </Tooltip>
    </Button>
    <Button size="sm" variant="link">
      <FaTrash size={16} className="" />
    </Button>
  </>
  )
}

export default OportunidadButtons