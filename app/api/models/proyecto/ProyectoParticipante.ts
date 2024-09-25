import * as Yup from 'yup';
import Persona from '../admin/Persona';

class ProyectoParticipante {
  ppaId: number | null;
  pryId: number | null;
  perId: number | null;
  carId: number | null;
  perTarifa: number | null;
  prfId: number | null;
  fechaAsignacion: Date | null;
  fechaTermino: Date | null;
  estado: number | null;
  tarifarioId: number | null;
  persona: Persona | null;
  constructor(data?: ProyectoParticipante) {
    this.ppaId = data?.ppaId || 0;
    this.pryId = data?.pryId || null;
    this.perId = data?.perId || null;
    this.carId = data?.carId || null;
    this.perTarifa = data?.perTarifa || null;
    this.prfId = data?.prfId || null;
    this.fechaAsignacion = data?.fechaAsignacion
      ? new Date(data?.fechaAsignacion)
      : null;
    this.fechaTermino = data?.fechaTermino || null;
    this.estado = data?.estado || 1;
    this.tarifarioId = data?.tarifarioId || null;
    this.persona = data?.persona || null;
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
