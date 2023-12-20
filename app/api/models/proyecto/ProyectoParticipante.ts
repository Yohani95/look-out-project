import * as Yup from 'yup';

class ProyectoParticipante {
  ppaId: number| null;
  pryId: number| null;
  perId: number | null;
  carId: number | null;
  perTarifa: number | null;
  prfId: number | null;
  fechaAsignacion: Date | null;
  fechaTermino: Date | null;
  estado: number | null;
  tarifarioId: number | null;
  constructor(
    ppaId: number| null,
    pryId: number| null,
    perId: number | null,
    carId: number | null,
    perTarifa: number | null,
    prfId: number | null,
    fechaAsignacion: Date | null,
    fechaTermino: Date | null,
    estado: number | null,
    tarifarioId: number | null
  ) {
    this.ppaId = ppaId;
    this.pryId = pryId;
    this.perId = perId;
    this.carId = carId;
    this.perTarifa = perTarifa;
    this.prfId = prfId;
    this.fechaAsignacion = fechaAsignacion;
    this.fechaTermino = fechaTermino;
    this.estado = estado|| 1;
    this.tarifarioId=tarifarioId;
  }

  static validationRules = (t: any) =>
    Yup.object().shape({
      //pryId: Yup.number().required(t?.ValidationMessages.required),
      // perId: Yup.number().nullable(),
      // carId: Yup.number().nullable(),
      // perTarifa: Yup.number().nullable(),
      // prfId: Yup.number().nullable(),
      // fechaAsignacion: Yup.date().nullable(),
      // fechaTermino: Yup.date().nullable(),
      // estado: Yup.number().nullable(),
      // Agrega más reglas de validación según sea necesario
    });
}
export default ProyectoParticipante;