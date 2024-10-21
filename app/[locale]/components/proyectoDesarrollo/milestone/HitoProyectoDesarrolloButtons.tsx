'use client';

import React from 'react';
import {
  FaTrash,
  FaEdit,
  FaCalendarPlus,
  FaFileInvoiceDollar,
} from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-tooltip';
import { useRouter } from 'next/navigation';
import NotificationSweet from '@/app/[locale]/components/common/NotificationSweet';
import Utils from '@/app/api/models/common/Utils';
import { deleteHitoProyectoDesarrollo } from '@/app/actions/proyectoDesarrollo/HitoProyectoDesarrolloActions';

function HitoProyectoDesarrolloButtons({ t, hito }) {
  const router = useRouter();

  const handleEdit = async () => {
    const confirmed = await Utils.showConfirmationDialogEdit(t);
    if (confirmed) {
      router.push(
        `/developmentProject/${hito.idProyectoDesarrollo}/milestone/edit/${hito.id}`
      );
    }
  };

  const handleDelete = async () => {
    const confirmed = await Utils.showConfirmationDialogDelete(t);
    if (confirmed) {
      await deleteHitoProyectoDesarrollo(hito.id)
        .then((res) => {
          NotificationSweet({
            title: t.notification.Deleted.title,
            text: t.notification.Deleted.text,
            type: t.notification.Deleted.type,
          });
        })
        .catch((err) => {
          Utils.handleErrorNotification(t);
        });
    }
  };

  // Genera IDs únicos para cada fila en función del id del hito
  const editId = `edit-tooltip-${hito.id}`;
  const deleteId = `delete-tooltip-${hito.id}`;
  const facturaID = `facture-tooltip-${hito.id}`;
  return (
    <>
      <Button size="sm" variant="link" onClick={() => handleEdit()}>
        <FaEdit size={16} id={editId} />
        <Tooltip anchorSelect={`#${editId}`} place="left">
          {t?.Common.edit}
        </Tooltip>
      </Button>
      <Button
        size="sm"
        variant="link"
        onClick={() => router.push(`/facture/createProject/${hito.id}`)}
      >
        <FaFileInvoiceDollar size={16} id={facturaID} />
        <Tooltip anchorSelect={`#${facturaID}`} place="left">
          {t?.business.milestoneFacture}
        </Tooltip>
      </Button>
      <Button size="sm" variant="link" onClick={() => handleDelete()}>
        <FaTrash size={16} id={deleteId} />
        <Tooltip anchorSelect={`#${deleteId}`} place="left">
          {t?.Common.delete}
        </Tooltip>
      </Button>
    </>
  );
}

export default HitoProyectoDesarrolloButtons;
