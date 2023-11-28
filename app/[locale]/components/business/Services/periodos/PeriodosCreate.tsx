import PeriodosProyecto from '@/app/api/models/proyecto/PeriodosProyecto';
import { useFormik } from 'formik';
import React from 'react'

function PeriodosCreate({t,periodo}) {
  const validationSchema = PeriodosProyecto.getValidationSchema(t);
  const formik = useFormik({
    initialValues: new PeriodosProyecto(null),
    validationSchema,
    //validateOnMount: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Utiliza una variable para almacenar la función handleFormSubmit
        //await handleFormSubmit(values, t, null, false, null, apiurl);
        //fetchData();
      } catch (error) {
        console.error("Error in handleFormSubmit:", error);
      } finally {
        setSubmitting(false); // Importante para indicar que el formulario ya no está siendo enviado.
      }
    },
  });
  const ParseDate=()=>{
    const [startDateStr, endDateStr] = periodo.split(" - ");
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
  }
  return (
    <>
      <form>
        <div className="d-flex justify-content-end mb-3">
          <button type="submit" className="text-end  btn btn-primary">
            Pre-cierre
          </button>
        </div>
      </form>
    </>
  )
}

export default PeriodosCreate