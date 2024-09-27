'use client';
import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-tooltip';
import { useRouter } from 'next/navigation';
import Utils from '@/app/api/models/common/Utils';
import { deleteReunionProspecto } from '@/app/actions/prospecto/ReunionProspectoActions';

function ReunionProspectoButtons({ t, reunion }) {
  const router = useRouter();

  const handleEdit = async () => {
    const confirmed = await Utils.showConfirmationDialogEdit(t);
    if (confirmed) {
      router.push(`/prospect/meeting/edit/${reunion.id}`);
    }
  };

  const handleDelete = async () => {
    const confirmed = await Utils.showConfirmationDialogDelete(t);
    if (confirmed) {
      await deleteReunionProspecto(reunion.id)
        .then((res) => {
          Utils.handleSuccessNotification(t);
        })
        .catch((err) => {
          Utils.handleErrorNotification(t);
        });
    }
  };

  // Genera un ID único para el tooltip basado en `reunion.id`
  const editTooltipId = `edit-tooltip-${reunion.id}`;

  return (
    <>
      <Button size="sm" variant="link" onClick={handleEdit}>
        {/* Asigna un ID único al icono de editar */}
        <FaEdit size={16} id={editTooltipId} />
        {/* Tooltip asociado al ID único */}
        <Tooltip anchorSelect={`#${editTooltipId}`} place="top">
          {t?.Common.edit}
        </Tooltip>
      </Button>
      <Button size="sm" variant="link" onClick={handleDelete}>
        <FaTrash size={16} />
      </Button>
    </>
  );
}

export default ReunionProspectoButtons;
