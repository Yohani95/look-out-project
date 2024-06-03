"use client"
import React, { useState } from 'react'
import { Usuario } from '@/app/api/models/admin/Usuario';
import { useSession } from "next-auth/react";
import MyDatePicker from "@/app/[locale]/components/common/MyDatePicker";
import {handleSelectChange,handleInputChange} from "@/app/[locale]/utils/Form/UtilsForm";
import { SelectField } from '@/app/[locale]/components/common/SelectField';
function OportunidadForm({ oportunidadModel,
    setOportunidad,
    t,
    data }) {
    //========DECLARACION DE VARIABLES ===============
    const [contactOptions, setContactOptions] = useState([]);
    const { data: session, status } = useSession();
    const user = session?.user as Usuario;
    return (
        <>
            <div className="mb-3 row align-items-center">
                <label className="col-sm-1 col-form-label">{t.Account.KAM}</label>
                <div className="col-sm-3">
                    <span className="form-control">
                        {session
                            ? `${user.persona.perNombres} ${user.persona.perApellidoPaterno}`
                            : ""}
                    </span>
                </div>
                <label className="col-sm-2 col-form-label">
                    {t.Ficha.table.business.dateEnd}
                </label>
                <div className="col-sm-3">
                    {/* <MyDatePicker
                        selectedDate={oportunidadModel.pryFechaCierre}
                        onChange={(date) =>
                            setOportunidad({ ...oportunidadModel, pryFechaCierre: date })
                        }
                        title={t.Common.date}
                    /> */}
                </div>
                {/* <SelectField
                    label={t.Account.country}
                    options={data.paises}
                    preOption={t.Account.select}
                    labelClassName="col-sm-1 col-form-label"
                    divClassName="col-sm-2"
                    onChange={(e) => handleSelectChange(e, "paisId", setOportunidad)}
                    selectedValue={oportunidadModel.paisId}
                /> */}
            </div>
        </>
    )
}

export default OportunidadForm