'use client';
import React from 'react';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-tooltip';
import { useRouter } from 'next/navigation';
import ConfirmationDialog from '@/app/[locale]/components/common/ConfirmationDialog';
import NotificationSweet from '@/app/[locale]/components/common/NotificationSweet';
import { deleteContactoProspecto } from '@/app/actions/prospecto/ContactoProspectoActions';
import Utils from '@/app/api/models/common/Utils';
function ContactoProspectoButtons({ t, contacto }) {
  const router = useRouter();
  const handleEdit = async () => {
    const confirmed = await Utils.showConfirmationDialogEdit(t);
    if (confirmed) {
      router.push(`/prospect/contact/edit/${contacto.id}`);
    }
  };
  const handleDelete = async () => {
    const confirmed = await Utils.showConfirmationDialogDelete(t);
    if (confirmed) {
      await deleteContactoProspecto(contacto.id)
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
  // Genera IDs únicos para los tooltips basados en contacto.id
  const editTooltipId = `edit-tooltip-${contacto.id}`;
  const deleteTooltipId = `delete-tooltip-${contacto.id}`;

  return (
    <>
      {/* Botón de Editar con ID único */}
      <Button size="sm" variant="link" onClick={handleEdit}>
        <FaEdit size={16} id={editTooltipId} />
        <Tooltip anchorSelect={`#${editTooltipId}`} place="top">
          {t?.Common.edit}
        </Tooltip>
      </Button>

      {/* Botón de Eliminar con ID único */}
      <Button size="sm" variant="link" onClick={handleDelete}>
        <FaTrash size={16} id={deleteTooltipId} />
        <Tooltip anchorSelect={`#${deleteTooltipId}`} place="top">
          {t?.Common.delete}
        </Tooltip>
      </Button>
    </>
  );
}

export default ContactoProspectoButtons;
