'use client';
import { ProspectoApiUrl } from '@/app/api/apiConfig';
import Utils from '@/app/api/models/common/Utils';
import React, { useState, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaTable } from 'react-icons/fa';
import NotificationSweet from '../common/NotificationSweet';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';

interface MassUploadModalProps {
  t: any;
}

const UploadExcelProspecto: React.FC<MassUploadModalProps> = ({ t }) => {
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
  const fileInputRef = useRef<HTMLInputElement>(null); // Referencia para el input de archivo
  const router = useRouter();
  // Extensiones permitidas
  const allowedExtensions = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
  ];

  // Validación con Yup
  const validationSchema = Yup.object().shape({
    file: Yup.mixed()
      .required(t.Common.selectFile)
      .test(
        'fileType',
        `${t.Common.invalidFileFormat} -> Excel`, // Mensaje de error personalizado
        (value) =>
          value &&
          value instanceof File &&
          allowedExtensions.includes(value.type) // Verifica el tipo de archivo
      ),
  });

  const handleFileUpload = async (values, { setSubmitting, resetForm }) => {
    Utils.showLoadingNotification(t);
    const selectedFile = values.file;

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await fetch(`${ProspectoApiUrl}/CargaMasiva`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          Utils.handleSuccessNotification(t, null); // Llamar al callback para indicar que la carga fue exitosa
          await router.refresh();
          resetForm(); // Reiniciar el formulario
        } else {
          const data = await response.json();
          const formattedErrors = data.errors
            .map((error) => `• ${error}`)
            .join('\n');
          NotificationSweet({
            title: t.notification.error.title,
            text: `${t.notification.error.text}:\n${formattedErrors}`, // Mostrar errores
            type: t.notification.error.type,
            showLoading: false,
          });
        }
      } catch (error) {
        console.log(error);
        Utils.handleErrorNotification(t);
      } finally {
        setShowModal(false); // Cierra el modal después
        setSubmitting(false); // Detener el estado de envío
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Reiniciar el input de archivo
        }
      }
    }
  };

  return (
    <>
      {/* Botón para abrir el modal */}
      <button
        type="button"
        className="btn btn-secondary m-2 d-flex align-items-center"
        onClick={() => setShowModal(true)} // Abrir modal al hacer clic
      >
        <FaTable size={16} className="me-2" />{' '}
        <span>{t.Common.uploadFile}</span>
      </button>

      {/* Modal para la carga del archivo */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t.Common.uploadFile}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ file: null }}
            validationSchema={validationSchema}
            onSubmit={handleFileUpload}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <input
                    name="file"
                    type="file"
                    className="form-control"
                    ref={fileInputRef} // Asignar la referencia al input
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const file = event.target.files
                        ? event.target.files[0]
                        : null;
                      if (file && allowedExtensions.includes(file.type)) {
                        setFieldValue('file', file); // Setear el archivo en Formik
                      } else {
                        setFieldValue('file', null); // Limpia el campo si el archivo no es válido
                        NotificationSweet({
                          title: t.notification.error.title,
                          text: `${t.Common.invalidFileFormat} -> Excel`, // Mensaje de archivo no válido
                          type: t.notification.error.type,
                        });
                      }
                    }}
                    accept=".xlsx,.xls"
                  />
                  <ErrorMessage
                    name="file"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setShowModal(false)}
                  >
                    {t.Common.cancel}
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                  >
                    {t.Common.uploadFile}
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UploadExcelProspecto;
