import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-tooltip';
import { useRouter } from 'next/navigation';
import ConfirmationDialog from '@/app/[locale]/components/common/ConfirmationDialog';
import NotificationSweet from '@/app/[locale]/components/common/NotificationSweet';
import { deleteRol } from '@/app/actions/admin/RolActions';
import { Shield } from 'lucide-react';
function RolButtons({ t, rol }) {
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
      push(`/admin/rol/edit/${id}`);
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
      await deleteRol(rol.rolId)
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
        onClick={() => handleEdit(rol.rolId, t, router.push)}
      >
        <FaEdit size={16} id={`edit-${rol.rolId}`} />
        <Tooltip anchorSelect={`#edit-${rol.rolId}`} place="top">
          {t?.Common.edit}
        </Tooltip>
      </Button>
      {/* ver permisos */}
      <Button
        size="sm"
        variant="link"
        onClick={() => {
          router.push(`/admin/rol/permission/${rol.rolId}`);
        }}
      >
        <Shield size={16} id={`permisos-${rol.rolId}`} />
        <Tooltip anchorSelect={`#permisos-${rol.rolId}`} place="top">
          permisos
        </Tooltip>
      </Button>

      {/* Genera un ID único para el botón de eliminar */}
      <Button
        size="sm"
        variant="link"
        onClick={() => handleDelete(rol.rolId, t)}
      >
        <FaTrash size={16} id={`delete-${rol.rolId}`} />
        <Tooltip anchorSelect={`#delete-${rol.rolId}`} place="top">
          {t?.Common.delete}
        </Tooltip>
      </Button>
    </>
  );
}

export default RolButtons;
