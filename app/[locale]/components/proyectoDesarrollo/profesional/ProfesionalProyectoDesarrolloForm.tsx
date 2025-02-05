import React from 'react';
import ProfesionalProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/ProfesionalProyectoDesarrollo';
import SelectField from '@/app/[locale]/components/common/SelectField';
import { handleSelectChange } from '@/app/[locale]/utils/Form/UtilsForm';
import MyDatePicker from '@/app/[locale]/components/common/MyDatePicker';
import { FormikProps } from 'formik';

interface FormProps {
  profesionalModel: ProfesionalProyectoDesarrollo;
  setProfesional: React.Dispatch<React.SetStateAction<any>>;
  t: any;
  data: any;
  formik?: FormikProps<ProfesionalProyectoDesarrollo>;
}

const ProfesionalProyectoDesarrolloForm: React.FC<FormProps> = ({
  profesionalModel,
  setProfesional,
  t,
  data,
}) => {
  return (
    <>
      <div className="mb-3 mt-3 row align-items-center">
        <SelectField
          label={t.Common.professionals}
          options={data.personas}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-4"
          onChange={(e) => handleSelectChange(e, 'idPersona', setProfesional)}
          selectedValue={profesionalModel.idPersona}
        />

        <label className="col-sm-1 col-form-label">{t.project.dateStart}</label>
        <div className="col-sm-2">
          <MyDatePicker
            selectedDate={profesionalModel.fechaInicio}
            onChange={(date) =>
              setProfesional({ ...profesionalModel, fechaInicio: date })
            }
            title={t.Common.date}
            isRead={false}
          />
        </div>
        <label className="col-sm-1 col-form-label">{t.project.dateEnd}</label>
        <div className="col-sm-2">
          <MyDatePicker
            selectedDate={profesionalModel.fechaTermino}
            onChange={(date) =>
              setProfesional({ ...profesionalModel, fechaTermino: date })
            }
            title={t.Common.date}
            isRead={false}
          />
        </div>
      </div>
    </>
  );
};

export default ProfesionalProyectoDesarrolloForm;
