class Phone {
  telId: number;
  telNumero: string | null;
  cliId: number | null;
  perId: number | null;
  tteId: number | null;
  telVigente: number | null;
  TelPrincipal: number | null;

  constructor(data: any) {
    this.telId = data?.telId || 0;
    this.telNumero = data?.telNumero || null;
    this.cliId = data?.cliId || null;
    this.perId = data?.perId || null;
    this.tteId = data?.tteId || 1;
    this.telVigente = data?.telVigente || 1;
    this.TelPrincipal = data?.TelPrincipal || 0;
  }
}

export default Phone;
