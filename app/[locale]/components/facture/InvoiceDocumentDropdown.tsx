import DocumentoFactura from '@/app/api/models/factura/DocumentoFactura';
import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import React from 'react';

// Componente especializado para documentos de facturas
const InvoiceDocumentDropdown = ({ documents, downloadDocumento, t }) => {
  // Si no hay documentos o el array está vacío, se retorna null
  if (!documents || (Array.isArray(documents) && documents.length === 0)) {
    return null;
  }

  const docsArray = Array.isArray(documents) ? documents : [documents];

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        {t.Common.documents || 'Descargar Documento de Factura'}
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent className="bg-white shadow-md border border-gray-200">
        {docsArray.map((doc, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => downloadDocumento(doc)}
            className="flex justify-between items-center hover:bg-gray-200 px-4 py-2"
          >
            <span>
              {doc.nombreDocumento ||
                (doc.idTipoDocumento === DocumentoFactura.TIPO_DOCUMENTO.FACTURA
                  ? t.Nav.facture.billing
                  : doc.idTipoDocumento === DocumentoFactura.TIPO_DOCUMENTO.OC
                  ? 'OC'
                  : doc.idTipoDocumento === DocumentoFactura.TIPO_DOCUMENTO.HES
                  ? 'HES'
                  : doc.idTipoDocumento ===
                    DocumentoFactura.TIPO_DOCUMENTO.FACTURA_ANULADA
                  ? t.Common.cancelInvoice
                  : t.Common.document)}
            </span>
            <span className="ml-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-full px-2">
              {doc.idTipoDocumento === DocumentoFactura.TIPO_DOCUMENTO.FACTURA
                ? t.Nav.facture.billing
                : doc.idTipoDocumento === DocumentoFactura.TIPO_DOCUMENTO.OC
                ? 'OC'
                : doc.idTipoDocumento === DocumentoFactura.TIPO_DOCUMENTO.HES
                ? 'HES'
                : doc.idTipoDocumento ===
                  DocumentoFactura.TIPO_DOCUMENTO.FACTURA_ANULADA
                ? t.Common.cancelInvoice
                : 'Otro'}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
};

export default InvoiceDocumentDropdown;
