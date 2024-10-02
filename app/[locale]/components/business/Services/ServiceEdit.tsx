'use client';
import React, { useState, useEffect } from 'react';
import { handleFormSubmit } from '@/app/[locale]/utils/business/UtilsService';
import Proyecto from '@/app/api/models/proyecto/Proyecto';
import TarifarioCreate from '@/app/[locale]/components/business/Services/tarifarioConvenido/TarifarioCreate';
import TarifarioSearch from '@/app/[locale]/components/business/Services/tarifarioConvenido/TarifarioSearch';
import ServiceFormSection from './ServiceFormSection';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { EditAction } from '../../admin/professionals/ProfessionalsActions';
import BoxInfo from '../../common/BoxInfo';
import { FaFileDownload } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
function ServiceEdit({ t, proyecto, data, files }) {
  //========DECLARACION DE VARIABLES ===============
  const [correlativo, setCorrelativo] = useState([]);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    file1: null,
    file2: null,
  });
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  const router = useRouter();
  useEffect(() => {
    if (Array.isArray(files)) {
      files.forEach(async (file, index) => {
        try {
          // Hacer una nueva solicitud para obtener el Blob desde la URL
          const response = await fetch(file.url);
          if (response.ok) {
            const blob = await response.blob();
            const newFile = new File([blob], file.nombre);

            if (index < 2) {
              // Actualizar el estado formData según el índice del archivo
              setFormData((prevFormData) => ({
                ...prevFormData,
                [`file${index + 1}`]: newFile, // Usar la URL en lugar del Blob
              }));
            } else {
              // Esperar a que el estado se actualice antes de intentar usar el nuevo valor
              setFile(newFile);
            }
          }
        } catch (error) {
          console.error('Error fetching file blob:', error);
        }
      });
    }
  }, [files]); // Asegúrate de agregar `files` como dependencia

  /*
     =================================================================================
     Seccion Funciones de componente
     =================================================================================
  */
  const validationSchema = Proyecto.getValidationSchema(t);
  const formikProyecto = useFormik({
    initialValues: new Proyecto(proyecto),
    validationSchema,
    //validateOnMount: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Utiliza una variable para almacenar la función handleFormSubmit
        const proyectoDTO = {
          proyecto: values,
        };
        const data = new FormData();
        data.append('proyectoJson', JSON.stringify(proyectoDTO));
        // Agrega los archivos
        data.append('files', formData.file1);
        data.append('files', formData.file2);
        data.append('files', file);
        await handleFormSubmit(data, t, router.push, true);
      } catch (error) {
        console.error('Error in handleFormSubmit:', error);
      } finally {
        EditAction();
        setSubmitting(false); // Importante para indicar que el formulario ya no está siendo enviado.
      }
    },
  });
  return (
    <>
      <div className="d-flex justify-content-between align-items-center  mb-3 mt-2">
        <h4>{`${t.Common.edit} ${t.business.title}`}</h4>
        <div className="col-sm-2 text-end">
          <h6>
            {t.Common.correlative} {t.business.title}{' '}
            {proyecto.pryId === 0 ? 'N/A' : proyecto.pryId}
          </h6>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          formikProyecto.handleSubmit(e);
        }}
      >
        <ServiceFormSection
          t={t}
          proyectoModel={formikProyecto.values}
          setProyecto={formikProyecto.setValues}
          setFormData={setFormData}
          formData={formData}
          data={data}
        />
        <h5>{t.service.docKickOff}</h5>
        <div className="mb-3  row row align-items-center">
          <label htmlFor="fileInput" className="col-sm-1 col-form-label">
            {t.service.docKickOff}
          </label>
          <div className="col-sm-5">
            <input
              type="file"
              className="form-control"
              id="fileInput"
              onChange={handleFileChange}
              accept=".pdf, .doc, .docx"
            />
          </div>
          {file && (
            <>
              <label className="col-sm-3 col-form-label">
                {file ? file.name : ''}
              </label>
              <a
                className="col-sm-2 btn btn-link"
                href={file && URL.createObjectURL(file)}
                download={file && file.name}
              >
                {t.Common.downloadFile} {'      '}
                <FaFileDownload size={18} className="link" />
              </a>
            </>
          )}
        </div>
        <div className="d-flex justify-content-end mb-3">
          <button type="submit" className="btn btn-primary m-2">
            {t.Common.edit}
          </button>
          <button
            disabled={false}
            type="button"
            className="btn btn-danger m-2"
            onClick={(e) => {
              router.back();
            }}
          >
            {t.Common.cancel}
          </button>
        </div>
      </form>
      <hr />
      <BoxInfo title={t.business.agreedRate} startShow={false}>
        <TarifarioCreate
          t={t}
          data={data}
          idService={proyecto.pryId}
          proyecto={formikProyecto.values}
        />
      </BoxInfo>
    </>
  );
}

export default ServiceEdit;
