import DocumentoLicencia from '@/app/api/models/licencia/DocumentoLicencia';
import React from 'react';
import { Form } from 'react-bootstrap';
import { handleInputChange } from '@/app/[locale]/utils/Form/UtilsForm';
function DocumentoLicenciaForm({
  idLicencia,
  t,
  documentoModel,
  setDocumentoLicencia,
  formik,
}) {
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileInput = event.currentTarget;

    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      let reader = new FileReader();

      try {
        let arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
          reader.onload = (e) => resolve(e.target!.result as ArrayBuffer);
          reader.onerror = reject;
          reader.readAsArrayBuffer(file);
        });

        let base64String = btoa(
          new Uint8Array(arrayBuffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );

        const documento: DocumentoLicencia = {
          ...documentoModel,
          id: documentoModel.id,
          idLicencia: idLicencia,
          nombreDocumento: file.name,
          contenidoDocumento: base64String,
        };

        setDocumentoLicencia(documento);
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
  };
  return (
    <>
      <Form.Group controlId="archivo">
        <Form.Label>{t.Common.uploadFile}</Form.Label>
        <Form.Control
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg"
          onChange={handleFileChange}
          isInvalid={
            formik.touched.nombreDocumento && !!formik.errors.nombreDocumento
          }
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.nombreDocumento}
        </Form.Control.Feedback>
        {documentoModel.nombreDocumento && (
          <div>
            <a
              href={`data:application/octet-stream;base64,${documentoModel.contenidoDocumento}`}
              download={documentoModel.nombreDocumento}
            >
              {t.Common.downloadFile} {documentoModel.nombreDocumento}
            </a>
          </div>
        )}
      </Form.Group>
      <Form.Control.Feedback type="invalid">
        {formik.errors.nombreDocumento}
      </Form.Control.Feedback>
      <Form.Group controlId="descripcion" className="mb-3">
        <Form.Label>{t.Common.description}</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="descripcion"
          value={documentoModel.descripcion || ''}
          onChange={handleInputChange(documentoModel, setDocumentoLicencia)}
          isInvalid={
            formik?.touched?.descripcion && !!formik.errors.descripcion
          }
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.descripcion}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
}

export default DocumentoLicenciaForm;
