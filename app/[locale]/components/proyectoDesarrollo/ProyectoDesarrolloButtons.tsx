'use client';

import React from 'react';
import { FaTrash, FaEdit, FaCalendarPlus } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-tooltip';
import { useRouter } from 'next/navigation';
import NotificationSweet from '@/app/[locale]/components/common/NotificationSweet';
import Utils from '@/app/api/models/common/Utils';
import { deleteProyectoDesarrollo } from '@/app/actions/proyectoDesarrollo/ProyectoDesarrolloActions';

function ProyectoDesarrolloButtons({ t, proyecto }) {
  const router = useRouter();

  const handleEdit = async () => {
    const confirmed = await Utils.showConfirmationDialogEdit(t);
    if (confirmed) {
      router.push(`/developmentProject/edit/${proyecto.id}`);
    }
  };
  const handleHito = async () => {
    router.push(`/developmentProject/milestone/${proyecto.id}`);
  };
  const handleDelete = async () => {
    const confirmed = await Utils.showConfirmationDialogDelete(t);
    if (confirmed) {
      await deleteProyectoDesarrollo(proyecto.id)
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

  // Genera IDs únicos para cada fila en función del id del proyecto
  const editId = `edit-tooltip-${proyecto.id}`;
  const deleteId = `delete-tooltip-${proyecto.id}`;
  const hitosId = `hitos-tooltip-${proyecto.id}`;
  return (
    <>
      <Button size="sm" variant="link" onClick={() => handleEdit()}>
        <FaEdit size={16} id={editId} />
        <Tooltip anchorSelect={`#${editId}`} place="left">
          {t?.Common.edit}
        </Tooltip>
      </Button>
      <Button size="sm" variant="link" onClick={() => handleHito()}>
        <FaCalendarPlus size={16} id={hitosId} />
        <Tooltip anchorSelect={`#${hitosId}`} place="left">
          {t?.Common.milestone}
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

export default ProyectoDesarrolloButtons;
