import React from 'react'
import { Button } from 'react-bootstrap'
import { Tooltip } from "react-tooltip";
import { FaLockOpen, FaEye, FaLock, FaFileDownload } from 'react-icons/fa';
import { useRouter } from "next/navigation";
function HoursButtons({ t, periodo }) {
  const router = useRouter();
  const handleDownload = () => {
    if (periodo.contenidoDocumento) {
      const uint8Array = new Uint8Array(atob(periodo.contenidoDocumento).split('').map((char) => char.charCodeAt(0)));

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
      <Button variant="link" onClick={() =>
        router.push(`/facture/createSupport/${periodo.id}`)
      }>
        {periodo.estado == 1 ? <FaLock size={16} className="candado" style={{ color: 'green' }} /> : <FaLockOpen size={16} className="candado" />}
        <Tooltip anchorSelect=".candado" place="top">
          {t.Nav.facture.requestBilling}
        </Tooltip>
      </Button>
      {periodo.contenidoDocumento ? (
        <Button variant="link" onClick={handleDownload}>
          <FaFileDownload size={16} className={`document ${periodo.nombreDocumento}`} />
          <Tooltip anchorSelect={`.document.${periodo.nombreDocumento}`} place="top">
            {t.Common.downloadFile} {periodo.nombreDocumento}
          </Tooltip>
        </Button>
      ) : (
        <Button variant="link" disabled>
          <FaFileDownload size={16} className="document" />
        </Button>
      )}
    </>
  )
}

export default HoursButtons