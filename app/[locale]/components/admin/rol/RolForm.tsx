import { RolClass } from '@/app/api/models/admin/Rol';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormikProps } from 'formik';
import React from 'react';
interface FormProps {
  rolModel: RolClass;
  setRol: React.Dispatch<React.SetStateAction<any>>;
  t: any; // Función de traducción
  data: any; // Datos adicionales (tipos de novedad, proyectos, etc.)
  formik?: FormikProps<RolClass>;
}
const RolForm: React.FC<FormProps> = ({
  rolModel,

  t,
  formik,
}) => {
  return (
    <>
      <div className="mb-3  mt-3 row align-items-center">
        <div className="col-sm-3">
          <Label htmlFor="rolNombre">{t.Common.name}</Label>
          <Input
            id="rolNombre"
            type="text"
            placeholder={t.Common.enterPassword}
            value={rolModel.rolNombre}
            onChange={formik?.handleChange}
            required
          />
        </div>
        <div className="col-sm-3">
          <Label htmlFor="rolDescripcion">{t.Common.description}</Label>
          <Input
            id="rolDescripcion"
            type="text"
            placeholder={t.Common.enterPassword}
            value={rolModel.rolDescripcion}
            onChange={formik?.handleChange}
            required
          />
        </div>
      </div>
    </>
  );
};

export default RolForm;
