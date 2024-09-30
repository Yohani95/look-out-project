'use client';
import React from 'react';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-tooltip';
import { useRouter } from 'next/navigation';
import NotificationSweet from '@/app/[locale]/components/common/NotificationSweet';
import Utils from '@/app/api/models/common/Utils';
import { deleteIndustria } from '@/app/actions/prospecto/IndustriaActions';

function IndustriaButtons({ t, industria }) {
  const router = useRouter();

  const handleEdit = async () => {
    const confirmed = await Utils.showConfirmationDialogEdit(t);
    if (confirmed) {
      router.push(`/prospect/industry/edit/${industria.id}`);
    }
  };

  const handleDelete = async () => {
    const confirmed = await Utils.showConfirmationDialogDelete(t);
    if (confirmed) {
      await deleteIndustria(industria.id)
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
  // Genera IDs únicos para los tooltips basados en industria.id
  const editTooltipId = `edit-tooltip-${industria.id}`;
  const deleteTooltipId = `delete-tooltip-${industria.id}`;

  return (
    <>
      {/* Botón de Editar con ID único */}
      <Button
        size="sm"
        variant="link"
        onClick={handleEdit}
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Asigna un ID único al icono de editar */}
        <FaEdit size={16} id={editTooltipId} />
        {/* Tooltip asociado al ID único */}
        <Tooltip anchorSelect={`#${editTooltipId}`} place="top">
          {t?.Common.edit}
        </Tooltip>
      </Button>

      {/* Botón de Eliminar con ID único */}
      <Button
        size="sm"
        variant="link"
        onClick={handleDelete}
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Asigna un ID único al icono de eliminar */}
        <FaTrash size={16} id={deleteTooltipId} />
        {/* Tooltip asociado al ID único */}
        <Tooltip anchorSelect={`#${deleteTooltipId}`} place="top">
          {t?.Common.delete}
        </Tooltip>
      </Button>
    </>
  );
}

export default IndustriaButtons;
