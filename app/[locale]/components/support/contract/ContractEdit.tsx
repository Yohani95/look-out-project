'use client';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Constantes } from '@/app/api/models/common/Constantes';
import { Usuario } from '@/app/api/models/admin/Usuario';
import ServiceFormSection from '@/app/[locale]/components/business/Services/ServiceFormSection';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import SupportForm from '../SupportForm';
import Soporte from '@/app/api/models/support/Soporte';
import NotificationSweet from '@/app/[locale]/components/common/NotificationSweet';
import {
  EditAction,
  createsoporte,
  revalidateDatasoporte,
  updatesoporte,
} from '@/app/api/actions/soporte/SoporteActions';
import DocumentosSoporte from '@/app/api/models/support/DocumentosSoporte';
import Utils from '@/app/api/models/common/Utils';
import { Label } from '@/components/ui/label';
function ContractEdit({ t, data }) {
  const { data: session } = useSession();
  const user = session?.user as Usuario;
  const [correlativo, setCorrelativo] = useState([]);
  const router = useRouter();
  //========FIN DECLARACION DE VARIABLES ===============

  // if (user?.rol?.rolId != Constantes.Roles.ADMIN) {
  //     return <p>You are not authorized to view this page!</p>;
  // }
  /*
       =================================================================================
       Seccion Funciones de componente
       =================================================================================
    */
  const validationSchema = Soporte.getValidationSchema(t);
  const formik = useFormik({
    initialValues: new Soporte(data.soporte),
    validationSchema,
    //validateOnMount: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        Utils.showLoadingNotification(t);
        delete values.personaKam;
        delete values.pais;
        delete values.empresaPrestadora;
        delete values.cliente;
        await updatesoporte(values, values.pryId)
          .then((res) => {
            router.refresh();
            Utils.handleSuccessNotification(t, router.back());
          })
          .catch((err) => {
            Utils.handleErrorNotification(t);
          });
      } catch (error) {
        console.error('Error in handleFormSubmit:', error);
        Utils.handleErrorNotification(t, router.back);
      } finally {
        revalidateDatasoporte();
        EditAction();
        setSubmitting(false); // Importante para indicar que el formulario ya no está siendo enviado.
      }
    },
  });
  return (
    <>
      <form
        onSubmit={(e) => {
          formik.handleSubmit(e);
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3 mt-2">
          <h6 className="text-[#2f4bce]  font-bold">Cuenta asociada</h6>
          <div className="col-sm-2 text-end">
            <h6>
              {t.Common.correlative} {t.Common.supports}
              {correlativo ? '#' : correlativo}
            </h6>
          </div>
        </div>
        <SupportForm
          t={t}
          soporteModel={formik.values}
          setSoporte={formik.setValues}
          data={data}
        />
        <div className="mt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fileKick">{t.service.docKickOff}</Label>
              <input
                className="form-control"
                type="file"
                id="fileKick"
                name="fileKick"
                onChange={async (event) => {
                  const fileInput = event.currentTarget;
                  if (fileInput.files && fileInput.files.length > 0) {
                    const newDocumentos = formik.values.documentosSoporte
                      ? [...formik.values.documentosSoporte]
                      : [];

                    // Buscar si ya existe un documento del mismo tipo
                    const existingDocumentoIndex = newDocumentos.findIndex(
                      (doc) =>
                        doc.idTipoDocumento ===
                        DocumentosSoporte.TIPO_DOCUMENTO.KICK_OFF
                    );

                    // Leer el archivo y convertirlo a base64
                    let reader = new FileReader();
                    let arrayBuffer = await new Promise((resolve) => {
                      reader.onload = (e) => resolve(e.target.result);
                      reader.readAsArrayBuffer(fileInput.files[0]);
                    });
                    let base64String = btoa(
                      new Uint8Array(arrayBuffer as ArrayBuffer).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ''
                      )
                    );

                    // Crear el nuevo documento
                    const newDocumento: DocumentosSoporte = {
                      id:
                        existingDocumentoIndex !== -1
                          ? newDocumentos[existingDocumentoIndex].id
                          : 0, // Reutilizar el ID si ya existe un documento del mismo tipo
                      idSoporte:
                        existingDocumentoIndex !== -1
                          ? newDocumentos[existingDocumentoIndex].idSoporte
                          : 0, // Reutilizar el ID de soporte si ya existe un documento del mismo tipo
                      contenidoDocumento: base64String,
                      soporte: null,
                      archivo: fileInput.files[0],
                      nombreDocumento: fileInput.files[0].name,
                      idTipoDocumento:
                        DocumentosSoporte.TIPO_DOCUMENTO.KICK_OFF,
                      fecha: new Date(),
                    };
                    delete newDocumento.archivo;
                    // Reemplazar el documento existente si ya existe uno del mismo tipo, de lo contrario, agregar el nuevo documento
                    if (existingDocumentoIndex !== -1) {
                      newDocumentos[existingDocumentoIndex] = newDocumento;
                    } else {
                      newDocumentos.push(newDocumento);
                    }

                    // Limitar la lista de documentos a 3
                    formik.setValues(
                      (prevState) =>
                        ({
                          ...prevState,
                          documentosSoporte: newDocumentos.slice(0, 3),
                        } as Soporte)
                    );
                  }
                }}
              />

              {formik.values.documentosSoporte &&
                formik.values.documentosSoporte.map((doc) => {
                  if (
                    doc.idTipoDocumento ===
                    DocumentosSoporte.TIPO_DOCUMENTO.KICK_OFF
                  ) {
                    return (
                      <div key={doc.id}>
                        <a
                          href={`data:application/octet-stream;base64,${doc.contenidoDocumento}`}
                          download={doc.nombreDocumento}
                          className="text-primary flex items-center"
                        >
                          {t.Common.downloadFile} {doc.nombreDocumento}
                        </a>
                      </div>
                    );
                  }
                  return null;
                })}
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end mb-3">
          <button
            type="button"
            className="btn btn-secondary m-2"
            onClick={(e) => {
              router.back();
            }}
          >
            {t.Common.cancel}
          </button>
          <button type="submit" className="btn btn-primary m-2">
            {t.Common.saveButton}
          </button>
        </div>
      </form>
    </>
  );
}

export default ContractEdit;
