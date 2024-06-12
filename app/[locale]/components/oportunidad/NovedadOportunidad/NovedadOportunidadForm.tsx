import * as Yup from "yup";
import React from 'react'
import { Form } from 'react-bootstrap';
import MyDatePicker from "@/app/[locale]/components/common/MyDatePicker";
function NovedadOportunidadForm({ idOportunidad, t, novedadModel, setNovedadOportunidad, formik }) {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        setNovedadOportunidad({
            ...novedadModel,
            [name]: value
        });
    };

    return (
        <>
            <Form.Group controlId="nombre" className="mb-3">
                <Form.Label>{t.Common.name}</Form.Label>
                <Form.Control
                    type="text"
                    name="nombre"
                    value={novedadModel.nombre || ""}
                    onChange={handleInputChange}
                    isInvalid={formik.touched.nombre && !!formik.errors.nombre}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.nombre}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="descripcion" className="mb-3">
                <Form.Label>{t.Common.description}</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="descripcion"
                    value={novedadModel.descripcion || ""}
                    onChange={handleInputChange}
                    isInvalid={formik.touched.descripcion && !!formik.errors.descripcion}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.descripcion}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="fecha" className="mb-3">
                <Form.Label>{t.Common.date}</Form.Label>
                <MyDatePicker
                    selectedDate={novedadModel.fecha}
                    onChange={(date) => setNovedadOportunidad({ ...novedadModel, fecha: date })}
                    title={t.Common.date}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.fecha}
                </Form.Control.Feedback>
            </Form.Group>
        </>
    )
}

export default NovedadOportunidadForm