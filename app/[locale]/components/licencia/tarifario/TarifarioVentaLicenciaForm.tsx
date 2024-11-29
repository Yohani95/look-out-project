import React from 'react';
import { Form } from 'react-bootstrap';
import MyDatePicker from '@/app/[locale]/components/common/MyDatePicker';
import SelectField from '@/app/[locale]/components/common/SelectField';
import {
  handleSelectChange,
  handleInputChange,
} from '@/app/[locale]/utils/Form/UtilsForm';
import TarifarioVentaLicencia from '@/app/api/models/licencia/TarifarioVentaLicencia';
import { FormikProps } from 'formik';
interface TarifarioFormProps {
  tarifarioModel: TarifarioVentaLicencia;
  setTarifario: React.Dispatch<React.SetStateAction<any>>;
  t: any; // Función de traducción
  data: any;
  formik: FormikProps<TarifarioVentaLicencia>;
}
const TarifarioVentaLicenciaForm: React.FC<TarifarioFormProps> = ({
  tarifarioModel,
  setTarifario,
  formik,
  t,
  data,
}) => {
  return (
    <>
      <div className="mb-3 row align-items-center">
        <SelectField
          label={t.Common.license}
          options={data.licencias}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-3"
          onChange={(e) => handleSelectChange(e, 'idLicencia', setTarifario)}
          selectedValue={tarifarioModel.idLicencia}
        />
        <SelectField
          label={t.Common.brand}
          options={data.marca}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-3"
          onChange={(e) =>
            handleSelectChange(e, 'idMarcaLicencia', setTarifario)
          }
          selectedValue={tarifarioModel.idMarcaLicencia}
          isInvalid={
            formik.touched.idMarcaLicencia && !!formik.errors.idMarcaLicencia
          }
        />
        <SelectField
          label={t.Common.wholesaler}
          options={data.mayorista}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-3"
          onChange={(e) =>
            handleSelectChange(e, 'idMayoristaLicencia', setTarifario)
          }
          selectedValue={tarifarioModel.idMayoristaLicencia}
          isInvalid={
            formik.touched.idMayoristaLicencia &&
            !!formik.errors.idMayoristaLicencia
          }
        />
      </div>

      <div className="mb-3 row align-items-center">
        <label className="col-sm-1 col-form-label">{t.project.dateStart}</label>
        <div className="col-sm-3">
          <MyDatePicker
            selectedDate={tarifarioModel.fechaVigencia}
            onChange={(date) =>
              setTarifario({ ...tarifarioModel, fechaVigencia: date })
            }
            title={t.Common.date}
          />
        </div>

        <label className="col-sm-1 col-form-label">{t.project.dateEnd}</label>
        <div className="col-sm-3">
          <MyDatePicker
            selectedDate={tarifarioModel.fechaTermino}
            onChange={(date) =>
              setTarifario({ ...tarifarioModel, fechaTermino: date })
            }
            title={t.Common.date}
          />
        </div>
        <label htmlFor="valor" className="col-sm-1 col-form-label">
          {t.Common.amount} c/u
        </label>
        <div className="col-sm-3">
          <Form.Control
            type="number"
            name="valor"
            id="valor"
            value={tarifarioModel.valor || ''}
            onChange={handleInputChange(tarifarioModel, setTarifario)}
            isInvalid={formik.touched.valor && !!formik.errors.valor}
          />
          <Form.Control.Feedback type="invalid">
            {formik.touched.valor && formik.errors.valor}
          </Form.Control.Feedback>
        </div>
      </div>
      <div className="mb-3 row align-items-center">
        {/* <SelectField
          label={`${t.Ficha.type} ${t.Common.currency}`}
          options={data.monedas}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-2"
          onChange={(e) => handleSelectChange(e, 'idMoneda', setTarifario)}
          selectedValue={tarifarioModel.idMoneda}
        /> */}
        <label htmlFor="valor" className="col-sm-1 col-form-label">
          N° {t.Common.license}
        </label>
        <div className="col-sm-3">
          <Form.Control
            type="number"
            name="cantidad"
            id="cantidad"
            value={tarifarioModel.cantidad || ''}
            onChange={handleInputChange(tarifarioModel, setTarifario)}
            isInvalid={formik.touched.cantidad && !!formik.errors.cantidad}
          />
          <Form.Control.Feedback type="invalid">
            {formik.touched.cantidad && formik.errors.cantidad}
          </Form.Control.Feedback>
        </div>
      </div>
    </>
  );
};

export default TarifarioVentaLicenciaForm;
