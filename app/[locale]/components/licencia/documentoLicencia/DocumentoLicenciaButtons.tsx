import React from 'react';
import { FaTrash, FaEdit, FaEye, FaFileDownload } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-tooltip';
import { useRouter } from 'next/navigation';
import ConfirmationDialog from '@/app/[locale]/components/common/ConfirmationDialog';
import NotificationSweet from '@/app/[locale]/components/common/NotificationSweet';
import { deletedocumentoLicencia } from '@/app/actions/licencia/DocumentoLicenciaActions';

function DocumentoLicenciaButtons({ t, documento }) {
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
      push(
        `/licenses/edit/${documento.idLicencia}/documents/edit/${documento.id}`
      );
    }
  };
  const handleDelete = async () => {
    const confirmed = await ConfirmationDialog(
      t.notification.deleting.title,
      t.notification.deleting.text,
      t.notification.deleting.type,
      t.notification.deleting.buttonOk,
      t.notification.deleting.buttonCancel
    );
    if (confirmed) {
      await NotificationSweet({
        title: t.notification.loading.title,
        text: '',
        type: t.notification.loading.type,
        showLoading: true,
      });

      await deletedocumentoLicencia(documento.id)
        .then(async (res) => {
          NotificationSweet({
            title: t.notification.error.title,
            text: t.notification.error.text,
            type: t.notification.error.type,
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
  const downloadDocumento = (documento) => {
    const uint8Array = new Uint8Array(
      atob(documento.contenidoDocumento)
        .split('')
        .map((char) => char.charCodeAt(0))
    );

    const blob = new Blob([uint8Array], { type: 'application/pdf' });

    // Crea una URL de objeto para el Blob
    const blobUrl = URL.createObjectURL(blob);

    // Crea un enlace (a) para descargar el Blob
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = documento.nombreDocumento; // Ajusta el nombre del archivo según tus necesidades

    // Agrega el enlace al documento y simula un clic para iniciar la descarga
    document.body.appendChild(link);
    link.click();

    // Elimina el enlace después de la descarga
    document.body.removeChild(link);

    // Liberar recursos
    URL.revokeObjectURL(blobUrl);
  };
  return (
    <>
      {/* Genera un ID único para el botón de editar */}
      <Button
        size="sm"
        variant="link"
        onClick={() => handleEdit(documento.id, t, router.push)}
      >
        <FaEdit size={16} id={`edit-${documento.id}`} />
        <Tooltip anchorSelect={`#edit-${documento.id}`} place="top">
          {t?.Common.edit}
        </Tooltip>
      </Button>

      {/* Genera un ID único para el botón de descargar */}
      <Button
        variant="link"
        onClick={() => downloadDocumento(documento)}
        style={{ fontSize: '14px' }}
        id={`download-${documento.id}`} // Usa un ID único
      >
        <FaFileDownload size={16} />
        <Tooltip anchorSelect={`#download-${documento.id}`}>
          {t.Common.downloadFile}
        </Tooltip>
      </Button>

      {/* Botón para eliminar, con un ID único */}
      <Button
        size="sm"
        variant="link"
        onClick={() => handleDelete()}
        id={`delete-${documento.id}`} // Usa un ID único
      >
        <FaTrash size={16} />
        <Tooltip anchorSelect={`#delete-${documento.id}`} place="top">
          {t?.Common.delete}
        </Tooltip>
      </Button>
    </>
  );
}

export default DocumentoLicenciaButtons;
