export class Constantes {
  TipoPersona = {
    PERSONA_ADMIN: 1,
    PERSONA_CONTACTO: 3,
    PERSONA_KAM: 2,
    PERSONA_PROFESIONAL: 4,
  };
  TipoNovedad = {
    VACACIONES: 1,
    LICENCIA_MEDICA: 2,
    TERMINO_SERVICIO: 3,
    CAMBIO_PERFIL: 4,
    PERMISO: 5,
  };
  static TipoPersona = {
    PERSONA_ADMIN: 1,
    PERSONA_CONTACTO: 3,
    PERSONA_KAM: 2,
    PERSONA_PROFESIONAL: 4,
  };
  static Roles={
    ADMIN:1,
    COMERCIAL:2,
    FINANZAS:3,
    DELEVERY:4
  }
  static generarOpcionesDeTiempo(t) {
    return [
      { value: 1, label: t.time.month },
      { value: 2, label: t.time.week },
      { value: 3, label: t.time.hour },
    ];
  }
}
