import React from 'react';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-tooltip';
import { FaLockOpen, FaEye, FaLock, FaFileDownload } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { Constantes } from '@/app/api/models/common/Constantes';
function HoursButtons({
  t,
  periodo,
  tipoSoporte = Constantes.TipoSorpote.CONTRATO,
}) {
  const router = useRouter();
  const handleDownload = () => {
    if (periodo.contenidoDocumento) {
      const uint8Array = new Uint8Array(
        atob(periodo.contenidoDocumento)
          .split('')
          .map((char) => char.charCodeAt(0))
      );

      const blob = new Blob([uint8Array], { type: 'application/pdf' });

      // Crea una URL de objeto para el Blob
      const blobUrl = URL.createObjectURL(blob);

      // Crea un enlace (a) para descargar el Blob
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = periodo.nombreDocumento; // Ajusta el nombre del archivo según tus necesidades

      // Agrega el enlace al documento y simula un clic para iniciar la descarga
      document.body.appendChild(link);
      link.click();

      // Elimina el enlace después de la descarga
      document.body.removeChild(link);

      // Liberar recursos
      URL.revokeObjectURL(blobUrl);
    }
  };
  return (
    <>
      {tipoSoporte !== Constantes.TipoSorpote.BOLSA && (
        <Button
          variant="link"
          onClick={() => router.push(`/facture/createSupport/${periodo.id}`)}
        >
          {periodo.estado === 1 ? (
            <FaLock
              size={16}
              id={`candado-${periodo.id}`}
              style={{ color: 'green' }}
            />
          ) : (
            <FaLockOpen size={16} id={`candado-${periodo.id}`} />
          )}
          <Tooltip anchorSelect={`#candado-${periodo.id}`} place="top">
            {t.Nav.facture.requestBilling}
          </Tooltip>
        </Button>
      )}

      {periodo.contenidoDocumento ? (
        <Button variant="link" onClick={handleDownload}>
          <FaFileDownload size={16} id={`document-${periodo.id}`} />
          <Tooltip anchorSelect={`#document-${periodo.id}`} place="top">
            {t.Common.downloadFile} {periodo.nombreDocumento}
          </Tooltip>
        </Button>
      ) : (
        <Button variant="link" disabled>
          <FaFileDownload size={16} id={`document-${periodo.id}`} />
          <Tooltip anchorSelect={`#document-${periodo.id}`} place="top">
            {t.Common.downloadFile} {periodo.nombreDocumento}
          </Tooltip>
        </Button>
      )}
    </>
  );
}

export default HoursButtons;
