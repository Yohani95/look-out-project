import DocumentoOportunidad from '@/app/api/models/oportunidad/DocumentoOportunidad';
import React from 'react'
import { Form } from 'react-bootstrap';

function DocumentoOportunidadForm({ idOportunidad, t, documentoModel, setDocumentoOportunidad, formik }) {
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileInput = event.currentTarget;

        if (fileInput.files && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            let reader = new FileReader();

            try {
                let arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
                    reader.onload = e => resolve(e.target!.result as ArrayBuffer);
                    reader.onerror = reject;
                    reader.readAsArrayBuffer(file);
                });

                let base64String = btoa(
                    new Uint8Array(arrayBuffer)
                        .reduce((data, byte) => data + String.fromCharCode(byte), '')
                );

                const documento: DocumentoOportunidad = {
                    id:documentoModel.id,
                    idOportunidad: idOportunidad,
                    nombreDocumento: file.name,
                    contenidoDocumento: base64String
                };

                setDocumentoOportunidad(documento);
            } catch (error) {
                console.error("Error reading file:", error);
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
                    isInvalid={formik.touched.nombreDocumento && !!formik.errors.nombreDocumento}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.nombreDocumento}
                </Form.Control.Feedback>
                {documentoModel.nombreDocumento &&
                    <div>
                        <a href={`data:application/octet-stream;base64,${documentoModel.contenidoDocumento}`} download={documentoModel.nombreDocumento}>
                            {t.Common.downloadFile} {documentoModel.nombreDocumento}
                        </a>
                    </div>
                }
            </Form.Group>
            <Form.Control.Feedback type="invalid">
                {formik.errors.nombreDocumento}
            </Form.Control.Feedback>
        </>
    )
}

export default DocumentoOportunidadForm