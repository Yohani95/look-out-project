'use client';
import React from 'react';
import ProyectoDesarrolloForm from './ProyectoDesarrolloForm';
import { useRouter } from 'next/navigation';
import ProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/ProyectoDesarrollo';
import BoxInfo from '@/app/[locale]/components/common/BoxInfo';
interface FormProps {
  t: any; // Función de traducción
  data: any;
  id: number; // ID del proyecto
}

const ProyectoDesarrolloMilestone: React.FC<FormProps> = ({ t, data, id }) => {
  const router = useRouter();

  // Aquí simplemente estamos mostrando los datos sin necesidad de usar Formik
  const proyectoModel = new ProyectoDesarrollo(data.proyectoDesarrollo);
  console.log(proyectoModel);
  return (
    <>
      <h4>{`${t.Common.edit} ${t.Common.project}`}</h4>
      <fieldset disabled>
        <ProyectoDesarrolloForm
          t={t}
          proyectoModel={proyectoModel} // Datos ya existentes del proyecto
          setProyecto={() => {}} // No necesitamos esta función para visualización
          data={data}
          formik={null} // No se necesita pasar formik
        />
      </fieldset>
      <BoxInfo title={t.Common.milestone}>
        <form>
          <div className="d-flex justify-content-end mb-2">
            <button
              type="button"
              className="btn btn-danger m-2"
              onClick={async () => {
                await router.refresh();
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
      </BoxInfo>
      <div className="d-flex justify-content-end mb-2">
        <button
          type="button"
          className="btn btn-danger m-2"
          onClick={async () => {
            await router.refresh();
            router.back();
          }}
        >
          {t.Common.cancel}
        </button>
      </div>
    </>
  );
};

export default ProyectoDesarrolloMilestone;
