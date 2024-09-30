import React from 'react';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-tooltip';
import { useRouter } from 'next/navigation';
import ConfirmationDialog from '@/app/[locale]/components/common/ConfirmationDialog';
import { deleteVentaLicencia } from '@/app/actions/licencia/VentaLicenciaActions';
import NotificationSweet from '@/app/[locale]/components/common/NotificationSweet';
function VentaLicenciaButtons({ t, licencia }) {
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
      push(`/licenses/edit/${licencia.id}`);
    }
  };
  const handleDelete = async (id, trans) => {
    const confirmed = await ConfirmationDialog(
      trans.notification.deleting.title,
      trans.notification.deleting.text,
      trans.notification.deleting.type,
      trans.notification.deleting.buttonOk,
      trans.notification.deleting.buttonCancel
    );
    if (confirmed) {
      await deleteVentaLicencia(licencia.id)
        .then((res) => {
          console.log(res);
          NotificationSweet({
            title: t.notification.Deleted.title,
            text: t.notification.Deleted.text,
            type: t.notification.Deleted.type,
          });
        })
        .catch((err) => {
          NotificationSweet({
            title: t.notification.error.title,
            text: t.notification.error.text,
            type: t.notification.error.type,
          });
        });
    }
  };
  return (
    <>
      {/* Genera un ID único para el botón de editar */}
      <Button
        size="sm"
        variant="link"
        onClick={() => handleEdit(licencia.id, t, router.push)}
      >
        <FaEdit size={16} id={`edit-${licencia.id}`} />
        <Tooltip anchorSelect={`#edit-${licencia.id}`} place="top">
          {t?.Common.edit}
        </Tooltip>
      </Button>

      {/* Genera un ID único para el botón de eliminar */}
      <Button
        size="sm"
        variant="link"
        onClick={() => handleDelete(licencia.id, t)}
      >
        <FaTrash size={16} id={`delete-${licencia.id}`} />
        <Tooltip anchorSelect={`#delete-${licencia.id}`} place="top">
          {t?.Common.delete}
        </Tooltip>
      </Button>
    </>
  );
}

export default VentaLicenciaButtons;
