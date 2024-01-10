import * as Yup from "yup";
import PeriodosProyecto from "./PeriodosProyecto";
import ProyectoParticipante from "./ProyectoParticipante";

class PeriodosProfesionales {
  id: number | null;
  diasTrabajados: number | null;
  diasAusentes: number | null;
  diasFeriados: number | null;
  diasVacaciones: number | null;
  diasLicencia: number | null;
  idPeriodo: number | null;
  idParticipante: number | null;
  montoDiario: number | null;
  montoTotalPagado: number | null;
  periodo: PeriodosProyecto | null;
  participante: ProyectoParticipante | null;

  constructor(data?: any) {
    this.id = data?.id || 0;
    this.diasTrabajados = data?.diasTrabajados || 0;
    this.diasAusentes = data?.diasAusentes || 0;
    this.diasFeriados = data?.diasFeriados || 0;
    this.diasVacaciones = data?.diasVacaciones || 0;
    this.diasLicencia = data?.diasLicencia || 0;
    this.idPeriodo = data?.id_periodo || 0;
    this.idParticipante = data?.id_participante || 0;
    this.montoDiario = data?.montoDiario || 0;
    this.montoTotalPagado = data?.montoTotalPagado || 0;
    //entidades
    this.periodo = data?.periodo || null;
    this.participante = data?.participante || null;
  }
  // Método para obtener la fecha de asignación como string
  public getFechaAsignacionString(): string | null {
    return this.participante?.fechaAsignacion
      ? new Date(this.participante.fechaAsignacion).toLocaleDateString()
      : "N/A";
  }
  static transformProfesionalData(profesional: any) {
    const profesionalInstance = new PeriodosProfesionales(profesional);
    return {
      ...profesional,
      _fechaInicio: profesionalInstance.getFechaAsignacionString(),
      _fechaTermino: profesionalInstance.getFechaTerminoString(),
    };
  }
  // Método para obtener la fecha de término como string
  public getFechaTerminoString(): string | null {
    return this.participante?.fechaTermino
      ? new Date(this.participante.fechaTermino).toLocaleDateString()
      : "N/A";
  }

  static getValidationSchema() {
    return Yup.object().shape({
      id: Yup.number().nullable(),
      diasTrabajados: Yup.number().nullable(),
      diasAusentes: Yup.number().nullable(),
      diasFeriados: Yup.number().nullable(),
      diasVacaciones: Yup.number().nullable(),
      diasLicencia: Yup.number().nullable(),
      idPeriodo: Yup.number().nullable(),
      idParticipante: Yup.number().nullable(),
    });
  }
  static createColumns(t: any) {
    return [
      {
        accessorKey: "id",
        header: "ID",
        size: 50,
      },
      {
        accessorKey: "participante.persona.perNombres",
        header: `${t.Common.name}`,
        size: 150,
      },
      {
        accessorKey: "diasTrabajados",
        header: `${t.Common.workedDays}`,
        size: 50,
      },
      {
        accessorKey: "diasAusentes",
        header: `${t.Common.absentDays}`,
        size: 100,
      },
      {
        accessorKey: "_fechaInicio",
        header: `${t.Common.dateAssignment}`,
        size: 100,
      },
      {
        accessorKey: "_fechaTermino",
        header: `${t.project.dateEnd}`,
        size: 100,
      },
      {
        accessorKey: "montoDiario",
        header: `${t.Common.dailyAmount}`,
        size: 100,
      },
      {
        accessorKey: "montoTotalPagado",
        header: `${t.Common.total}`,
        size: 100,
      },
      // {
      //   accessorKey: "diasFeriados",
      //   header: `${t.Common.holidays}`,
      //   size: 100,
      // },
      // {
      //   accessorKey: "diasVacaciones",
      //   header: `${t.Common.vacationDays}`,
      //   size: 100,
      // },
      // {
      //   accessorKey: "diasLicencia",
      //   header: `${t.Common.licenseDays}`,
      //   size: 100,
      // },
      // {
      //   accessorKey: "idParticipante",
      //   header: "ID Participante",
      //   size: 120,
      // },
      // {
      //   accessorKey: "actions",
      //   header: t.Common.actions,
      //   size: 100,
      // },
    ];
  }
}

export default PeriodosProfesionales;
