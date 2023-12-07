class Email {
  emaEmail: string | null;
  emaId: number;
  cliId: number | null;
  perId: number | null;
  temId: number | null;
  emaPrincipal: number | null;
  emaVigente: string | null;
  constructor(data: any) {
    if (data) {
      this.emaEmail = data.emaEmail || null;
      this.emaId = data.emaId || 0;
      this.cliId = data.cliId || null;
      this.perId = data.perId || null;
      this.temId = data.temId || null;
      this.emaPrincipal = data.emaPrincipal || null;
      this.emaVigente = data.emaVigente || 1;
    } else {
      this.emaEmail = null;
      this.emaId = 0;
      this.cliId = null;
      this.perId = null;
      this.temId = 1;
      this.emaPrincipal = 1;
      this.emaVigente = "1";
    }
  }
}
export default Email;