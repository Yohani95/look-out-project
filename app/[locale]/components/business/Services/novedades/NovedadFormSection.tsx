import React, { useEffect, useState } from 'react'
import MyDatePicker from "@/app/[locale]/components/common/MyDatePicker";
import SelectField from "@/app/[locale]/components/common/SelectField";
import {
    handleInputChange,
    handleSelectChange,
} from "@/app/[locale]/utils/Form/UtilsForm";
import { Constantes } from '@/app/api/models/common/Constantes';
function NovedadFormSection({ t, formData, setFormData, perfilOptions, noveltyTypeOptions }) {
    const constantes = new Constantes();
    const [dateStatus, setdateStatus] = useState(true);
    const [perfilStatus, setPerfilStatus] = useState(true);
    useEffect(() => {
        if (
            formData.idTipoNovedad == constantes.TipoNovedad.LICENCIA_MEDICA ||
            formData.idTipoNovedad == constantes.TipoNovedad.VACACIONES
        ) {
            setdateStatus(false);
        } else {
            setdateStatus(true);
        }
        if (formData.idTipoNovedad == constantes.TipoNovedad.CAMBIO_PERFIL) {
            setPerfilStatus(false);
        } else {
            setPerfilStatus(true);
        }
    }, [formData]);
    return (
        <>
            <div className="mb-3 row align-items-center">
                <label
                    htmlFor="estimatedClosingDate"
                    className="col-sm-1 col-form-label"
                >
                    {t.Common.rut}
                </label>
                <div className="col-sm-5">
                    <span className="form-control" id="rut" />
                </div>
                <label htmlFor="name" className="col-sm-1 col-form-label">
                    {t.Common.name}
                </label>
                <div className="col-sm-5">
                    <span className="form-control" id="name" />
                </div>
            </div>
            <hr />
            <div className="mb-3 row align-items-center">
                <SelectField
                    label={`${t.service.noveltyType}`}
                    options={noveltyTypeOptions}
                    preOption={t.Account.select}
                    labelClassName="col-sm-1 col-form-label"
                    divClassName="col-sm-3"
                    onChange={(e) =>
                        handleSelectChange(e, "idTipoNovedad", setFormData)
                    }
                    selectedValue={formData.idTipoNovedad}
                />
            </div>
            <div className="mb-3 row align-items-center">
                <label
                    htmlFor="estimatedClosingDate"
                    className="col-sm-1 col-form-label"
                >
                    {t.service.noveltyDate}
                </label>
                <div className="col-sm-5">
                    <MyDatePicker
                        selectedDate={formData.fechaInicio}
                        onChange={(date) =>
                            setFormData({ ...formData, fechaInicio: date })
                        }
                        title={t.Common.date}
                    />
                </div>
                <label
                    htmlFor="estimatedClosingDate"
                    className="col-sm-1 col-form-label"
                >
                    {t.service.dateTo}
                </label>

                <div className="col-sm-5">
                    <fieldset disabled={dateStatus}>
                        <MyDatePicker
                            selectedDate={formData.fechaHasta}
                            onChange={(date) =>
                                setFormData({ ...formData, fechaHasta: date })
                            }
                            title={t.Common.date}
                        />
                    </fieldset>
                </div>
            </div>
            <fieldset disabled={perfilStatus}>
                <div className="mb-3 row align-items-center">
                    <SelectField
                        label={`${t.service.newRol}`}
                        options={perfilOptions}
                        preOption={t.Account.select}
                        labelClassName="col-sm-1 col-form-label"
                        divClassName="col-sm-3"
                        onChange={(e) => handleSelectChange(e, "idPerfil", setFormData)}
                        selectedValue={formData.idPerfil}
                    />
                </div>
            </fieldset>
            <div className="mb-3 row align-items-center">
                <label htmlFor="observacion" className="col-sm-1 col-form-label">
                    {t.Common.observations}
                </label>
                <div className="col-sm-11">
                    <textarea
                        className="form-control"
                        id="observaciones"
                        name="observaciones"
                        value={formData.observaciones}
                        onChange={handleInputChange(formData, setFormData)}
                        required
                    />
                </div>
            </div>
        </>
    )
}

export default NovedadFormSection