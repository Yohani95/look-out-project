'use client';

import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-tooltip';
import { useRouter } from 'next/navigation';
import NotificationSweet from '@/app/[locale]/components/common/NotificationSweet';
import Utils from '@/app/api/models/common/Utils';
import { deletePlanificacionProyectoDesarrollo } from '@/app/actions/proyectoDesarrollo/PlanificacionProyectoDesarrolloActions';

function PlanificacionProyectoDesarrolloButtons({ t, planificacion }) {
  const router = useRouter();

  const handleEdit = async () => {
    const confirmed = await Utils.showConfirmationDialogEdit(t);
    if (confirmed) {
      router.push(
        `/developmentProject/${planificacion.idProyectoDesarrollo}/planning/edit/${planificacion.id}`
      );
    }
  };

  const handleDelete = async () => {
    const confirmed = await Utils.showConfirmationDialogDelete(t);
    if (confirmed) {
      await deletePlanificacionProyectoDesarrollo(planificacion.id)
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

  // Genera IDs únicos para cada fila en función del id de la planificación
  const editId = `edit-tooltip-${planificacion.id}`;
  const deleteId = `delete-tooltip-${planificacion.id}`;
  if (planificacion.terminado) {
    return null; // No mostrar botón de borrar para los hitos terminados.
  }
  return (
    <>
      <Button size="sm" variant="link" onClick={handleEdit}>
        <FaEdit size={16} id={editId} />
        <Tooltip anchorSelect={`#${editId}`} place="left">
          {t?.Common.edit}
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

export default PlanificacionProyectoDesarrolloButtons;
