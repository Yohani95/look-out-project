'use client';

import React from 'react';
import { FaTrash, FaEdit, FaClock } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-tooltip';
import { useRouter } from 'next/navigation';
import NotificationSweet from '@/app/[locale]/components/common/NotificationSweet';
import Utils from '@/app/api/models/common/Utils';
import { deleteProfesionalProyectoDesarrollo } from '@/app/actions/proyectoDesarrollo/ProfesionalProyectoDesarrolloActions';

function ProfesionalProyectoDesarrolloButtons({ t, profesional }) {
  const router = useRouter();

  const handleEdit = async () => {
    const confirmed = await Utils.showConfirmationDialogEdit(t);
    if (confirmed) {
      router.push(
        `/developmentProject/${profesional.idProyectoDesarrollo}/professional/${profesional.id}/edit`
      );
    }
  };
  const handleHour = async () => {
    // const confirmed = await Utils.showConfirmationDialogEdit(t);
    // if (confirmed) {
    router.push(`/developmentProject/hours/${profesional.id}/search`);
    // }
  };
  const handleDelete = async () => {
    const confirmed = await Utils.showConfirmationDialogDelete(t);
    if (confirmed) {
      await deleteProfesionalProyectoDesarrollo(profesional.id)
        .then(() => {
          NotificationSweet({
            title: t.notification.Deleted.title,
            text: t.notification.Deleted.text,
            type: t.notification.Deleted.type,
          });
        })
        .catch(() => {
          Utils.handleErrorNotification(t);
        });
    }
  };

  // Genera IDs únicos para cada fila en función del id del profesional
  const editId = `edit-tooltip-${profesional.id}`;
  const deleteId = `delete-tooltip-${profesional.id}`;
  const hourId = `hourid-tooltip-${profesional.id}`;
  return (
    <>
      <Button size="sm" variant="link" onClick={handleEdit}>
        <FaEdit size={16} id={editId} />
        <Tooltip anchorSelect={`#${editId}`} place="left">
          {t?.Common.edit}
        </Tooltip>
      </Button>
      <Button size="sm" variant="link" onClick={handleHour}>
        <FaClock size={16} id={hourId} />
        <Tooltip anchorSelect={`#${hourId}`} place="left">
          {t?.Common.add}
        </Tooltip>
      </Button>
      <Button size="sm" variant="link" onClick={handleDelete}>
        <FaTrash size={16} id={deleteId} />
        <Tooltip anchorSelect={`#${deleteId}`} place="left">
          {t?.Common.delete}
        </Tooltip>
      </Button>
    </>
  );
}

export default ProfesionalProyectoDesarrolloButtons;
