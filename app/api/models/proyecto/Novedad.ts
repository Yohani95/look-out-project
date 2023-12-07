import * as Yup from "yup";
import { revalidatePath } from "next/cache";
class Novedad {
  id: number | null;
  idPersona: number | null;
  idProyecto: number | null;
  fechaInicio: Date;
  fechaHasta: Date | null;
  observaciones: string | null;
  Idperfil: number | null;
  idTipoNovedad: number | null;

  constructor(data?: any) {
    this.id = data?.id || 0;
    this.idPersona = data?.idPersona || null;
    this.idProyecto = data?.idProyecto || null;
    this.fechaInicio = data ? new Date(data.fechaInicio) : new Date();
    this.fechaHasta = data
      ? data.fechaHasta
        ? new Date(data.fechaHasta)
        : null
      : null;
    this.observaciones = data?.observaciones || null;
    this.Idperfil = data?.Idperfil || null;
    this.idTipoNovedad = data?.idTipoNovedad || null;
  }

  static getValidationSchema(t) {
    return Yup.object().shape({
      id: Yup.number().nullable(),
      idPersona: Yup.number().nullable(),
      idProyecto: Yup.number().nullable(),
      fechaInicio: Yup.date().required(t.ValidationMessages.required),
      fechaHasta: Yup.date().nullable(),
      observaciones: Yup.string().nullable(),
      Idperfil: Yup.number().nullable(),
      idTipoNovedad: Yup.number().nullable(),
    });
  }
  static createColumns(t) {
    return [
      {
        accessorKey: "id",
        header: "ID",
        size: 50,
      },
      {
        accessorKey: "fechaInicio",
        header: t.service.noveltyDate,
        size: 200,
      },
      {
        accessorKey: "fechaHasta",
        header: t.service.dateTo,
        size: 200,
      },
      {
        accessorKey: "IdPerfil",
        header: t.Common.profile,
        size: 150,
      },
      {
        accessorKey: "idTipoNovedad",
        header: t.service.noveltyType,
        size: 100,
      },
      {
        accessorKey: "observaciones",
        header: t.Common.observations,
        size: 100,
      },
      {
        accessorKey: "acciones",
        header: t.Common.actions,
        size: 100,
      },
    ];
  }
  //   static createColumns(t) {
  //     return [
  //       { title: "ID", key: "id" },
  //       { title: t.user.idPerson, key: "idPersona" },
  //       { title: t.facture.project, key: "idProyecto" },
  //       { title: t.service.noveltyDate, key: "fechaInicio" },
  //       { title: t.service.dateTo, key: "fechaHasta" },
  //       { title: t.Common.profile, key: "Idperfil" },
  //       { title: t.service.noveltyType, key: "idTipoNovedad" },
  //       { title: t.Common.observations, key: "observaciones" },
  //     ];
  //   }
  // }
  static RefreshList(){
    "use server"
    revalidatePath("/")
  }
}
export default Novedad;
