"use client"
import Novedad from '@/app/api/models/proyecto/Novedad';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { novedadApiUrl } from '@/app/api/apiConfig';
import { handleFormSubmit } from '@/app/[locale]/utils/Form/UtilsForm';
import NovedadFormSection from './NovedadFormSection';
import { RefreshList } from '@/app/api/models/common/ActionsCommon';
import Persona from '@/app/api/models/admin/Persona';
import { fetchGetbyId } from "@/app/[locale]/utils/person/UtilsPerson";
import { fetchByIdProyecto } from "@/app/[locale]/utils/business/tarifario/UtilsTarifario";
import { fetchNoveltyType } from "@/app/[locale]/utils/business/Novelty/UtilsNovelType";
function NovedadEdit({ t, novedad, params }) {
    const [noveltyTypeOptions, setNoveltyTypeOptions] = useState([]);
    const [perfilOptions, setPerfilOptions] = useState([]);
    const [data, setData] = useState([]);
    const idProyecto = params.idProject;
    const apiUrls = {
        edit: `${novedadApiUrl}`,
        create: "",
    };
    const router = useRouter();
    const validationSchema = Novedad.getValidationSchema(t)
    const formik = useFormik({
        initialValues: new Novedad(novedad),
        validationSchema,
        //validateOnMount: true,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                // Utiliza una variable para almacenar la función handleFormSubmit
                values.idPersona = params.idPersona;
                values.idProyecto = idProyecto;
                await handleFormSubmit(values, t, null, true, null, apiUrls, params.id);
            } catch (error) {
                console.error("Error in handleFormSubmit:", error);
            } finally {
                RefreshList();
                router.refresh();
                setSubmitting(false); // Importante para indicar que el formulario ya no está siendo enviado.
            }
        },
    });
    useEffect(() => {
        fetchGetbyId(params.idPersona).then((data) => {
            // if (data.status && data.status === 404) {
            //     NotificationSweet({
            //         title: t.notification.warning.title,
            //         text: t.Common.notExist,
            //         type: t.notification.warning.type,
            //         push: router.push,
            //         link: "/business/closeServices/search",
            //     });
            //     return;
            // }
            const persona = new Persona(data);
            const rutElement = document.getElementById("rut");
            const nameElement = document.getElementById("name");
            if (rutElement) {
                rutElement.textContent = persona.perIdNacional || "N/A";
            }
            if (nameElement) {
                nameElement.textContent = persona.getNombreCompleto() || "N/A";
            }
        });
    }, []);
    useEffect(() => {
        fetchByIdProyecto(idProyecto).then((res) => {
            // if (res.status && res.status === 404) {
            //     NotificationSweet({
            //         title: t.notification.warning.title,
            //         text: t.Common.notExist,
            //         type: t.notification.warning.type,
            //         push: router.push,
            //         link: "/business/closeServices/search",
            //     });
            //     return;
            // }
            const options = res.data.map((data) => ({
                value: data.perfil.id,
                label: data.perfil.prf_Nombre,
            }));
            setPerfilOptions(options);
            setData([...data, options]);
        });
    }, []);
    //USE EFFECT CONTIENE EL LOANDING
    useEffect(() => {
        fetchNoveltyType().then((data) => {
            const options = data.map((type) => ({
                value: type.id,
                label: type.nombre,
            }));
            setNoveltyTypeOptions(options);
        });
    }, []);
    return (
        <>
            <form
                onSubmit={(e) => {
                    formik.handleSubmit(e);
                }}
            >
                <h4>{t.service.noveltyByProfessional}</h4> <br />
                <NovedadFormSection
                    t={t}
                    formData={formik.values}
                    setFormData={formik.setValues}
                    perfilOptions={perfilOptions}
                    noveltyTypeOptions={noveltyTypeOptions}
                />
                <div className="d-flex justify-content-end mt-2 mb-2 ">
                    <button type="submit" className="btn btn-primary m-2">
                        {t.Common.edit}
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger m-2"
                        onClick={() => {
                            router.back();
                        }}
                    >
                        {t.Common.goBack}
                    </button>
                </div>
            </form>
            <hr />
            {/* <BoxInfo title={t.service.historyNovelty}>
    <ListNovelty locale={locale} idPersona={idPersona} listaNovedades={listaNovedades}/>
  </BoxInfo> */}
        </>
    )
}

export default NovedadEdit