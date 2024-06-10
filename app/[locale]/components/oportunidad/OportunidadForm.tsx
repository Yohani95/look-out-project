"use client"
import React, { useEffect, useState } from 'react'
import { Usuario } from '@/app/api/models/admin/Usuario';
import { useSession } from "next-auth/react";
import MyDatePicker from "@/app/[locale]/components/common/MyDatePicker";
import { handleSelectChange, handleInputChange } from "@/app/[locale]/utils/Form/UtilsForm";
import SelectField from '@/app/[locale]/components/common/SelectField';
import { fetchPersonGetbyIdClient } from "@/app/[locale]/utils/person/UtilsPerson";
import { set } from 'date-fns';
import Oportunidad from '@/app/api/models/oportunidad/Oportunidad';
interface OportunidadFormProps {
    oportunidadModel: Oportunidad;
    setOportunidad: React.Dispatch<React.SetStateAction<any>>;
    t: any;
    data: any;
}
const OportunidadForm: React.FC<OportunidadFormProps> = ({ oportunidadModel, setOportunidad, t, data }) => {
    //========DECLARACION DE VARIABLES ===============
    const [contactOptions, setContactOptions] = useState([]);
    const { data: session, status } = useSession();
    const user = session?.user as Usuario;

    useEffect(() => {
        fetchPersonGetbyIdClient(oportunidadModel.idCliente).then((person) => {
            const options = person?.data?.map((item) => ({
                value: item.id,
                label: item.perNombres + " " + item.perApellidoPaterno,
            }));
            setContactOptions(options);
        });
    }, [oportunidadModel.idCliente]);

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
                    <MyDatePicker
                        selectedDate={oportunidadModel.fechaCierre}
                        onChange={(date) =>
                            setOportunidad({ ...oportunidadModel, fechaCierre: date })
                        }
                        title={t.Common.date}
                    />
                </div>
                <SelectField
                    label={t.Account.country}
                    options={data.paises}
                    preOption={t.Account.select}
                    labelClassName="col-sm-1 col-form-label"
                    divClassName="col-sm-2"
                    onChange={(e) => handleSelectChange(e, "idPais", setOportunidad)}
                    selectedValue={oportunidadModel.idPais}
                />
            </div>
            <div className=" mb-3 row align-items-center">
                <SelectField
                    label={t.Account.name}
                    options={data.clientes}
                    preOption={t.Account.select}
                    labelClassName="col-sm-1 col-form-label"
                    divClassName="col-sm-3"
                    onChange={(e) => handleSelectChange(e, "idCliente", setOportunidad)}
                    selectedValue={oportunidadModel.idCliente}
                />
                {/* <div className="col-sm-2">
                    <button type="button" className="badge btn btn-primary">
                        {t.Common.request} (+){" "}
                    </button>
                </div> */}
                <label htmlFor="nombre" className="col-sm-1 col-form-label">
                    {t.Account.business_name}
                </label>
                <div className="col-sm-5">
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="nombre"
                        value={oportunidadModel.nombre}
                        onChange={handleInputChange(oportunidadModel, setOportunidad)}
                    />
                </div>
            </div>
            <div className=" mb-3 row align-items-center">
                <SelectField
                    label={t.Common.contact}
                    options={contactOptions}
                    preOption={t.Account.select}
                    labelClassName="col-sm-1 col-form-label"
                    divClassName="col-sm-3"
                    onChange={(e) => handleSelectChange(e, "idContacto", setOportunidad)}
                    selectedValue={oportunidadModel.idContacto}
                />
                {/* <div className="col-sm-2">
                    <button
                        type="button"
                        className="badge btn btn-primary"
                    //onClick={goContactCreate}
                    >
                        {t.Common.add} (+)
                    </button>
                </div> */}
                <SelectField
                    label={`${t.Account.type} ${t.Opportunity.opportunity}`}
                    options={data.tipoOportunidad}
                    preOption={t.Account.select}
                    className="my-contacto"
                    labelClassName="col-sm-1 col-form-label"
                    divClassName="col-sm-3"
                    onChange={(e) => handleSelectChange(e, "idTipoOportunidad", setOportunidad)}
                    selectedValue={oportunidadModel.idTipoOportunidad}
                />
                <SelectField
                    label={`estado`}
                    options={data.estadoOportunidad}
                    preOption={t.Account.select}
                    className="my-contacto"
                    labelClassName="col-sm-1 col-form-label"
                    divClassName="col-sm-3"
                    onChange={(e) => handleSelectChange(e, "idEstadoOportunidad", setOportunidad)}
                    selectedValue={oportunidadModel.idEstadoOportunidad}
                />
            </div>
            <div className="mb-3 row align-items-center">
                <label htmlFor="renovable" className="col-sm-1 col-form-label">
                    Renovable ?
                </label>
                <div className="col-sm-1 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="renovable"
                        name="renovable"
                        checked={oportunidadModel.renovable ?? false}
                        onChange={(e) => setOportunidad({ ...oportunidadModel, renovable: e.target.checked })}
                    />
                </div>
                <fieldset className="col-sm-2" disabled={!(oportunidadModel.renovable ?? false)}>
                    <MyDatePicker
                        selectedDate={oportunidadModel.fechaRenovacion}
                        onChange={(date) => setOportunidad({ ...oportunidadModel, fechaRenovacion: date })}
                        title={t.Common.date}
                    />
                </fieldset>
                <SelectField
                    label={"Empresa Prestadora"}
                    options={data.empresaPrestadora}
                    preOption={t.Account.select}
                    labelClassName="col-sm-1 col-form-label"
                    divClassName="col-sm-2"
                    onChange={(e) => handleSelectChange(e, "idEmpresaPrestadora", setOportunidad)}
                    selectedValue={oportunidadModel.idEmpresaPrestadora}
                />
                <SelectField
                    label={`area Servicio`}
                    options={data.areaServicio}
                    preOption={t.Account.select}
                    className="my-contacto"
                    labelClassName="col-sm-1 col-form-label"
                    divClassName="col-sm-3"
                    onChange={(e) => handleSelectChange(e, "idAreaServicio", setOportunidad)}
                    selectedValue={oportunidadModel.idAreaServicio}
                />
            </div>
            <hr />
            <div className="mb-3 row align-items-center">
                <label htmlFor="licitacion" className="col-sm-1 col-form-label">
                    Licitación ?
                </label>
                <div className="col-sm-1 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="licitacion"
                        name="licitacion"
                        checked={oportunidadModel.licitacion ?? false}
                        onChange={(e) => setOportunidad({ ...oportunidadModel, licitacion: e.target.checked })}
                    />
                </div>
                <SelectField
                    label={`${t.Ficha.type} ${t.Common.currency}`}
                    options={data.monedas}
                    preOption={t.Account.select}
                    labelClassName="col-sm-1 col-form-label"
                    divClassName="col-sm-2"
                    onChange={(e) => handleSelectChange(e, "idMoneda", setOportunidad)}
                    selectedValue={oportunidadModel.idMoneda}
                />
                <label htmlFor="monto" className="col-sm-1 col-form-label">
                    Monto
                </label>
                <div className="col-sm-2">
                    <input
                        type="number"
                        className="form-control"
                        id="monto"
                        name="monto"
                        value={oportunidadModel.monto ?? ""}
                        onChange={handleInputChange(oportunidadModel, setOportunidad)}
                    />
                </div>
            </div>

        </>
    )
}

export default OportunidadForm