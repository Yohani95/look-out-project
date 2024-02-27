export class Moneda
{
    monId: number;
    monNombre: string | null;
    monVigente: number | null;
    paiId: number | null;

    constructor(data?: any) {
        this.monId = data?.monId || 0;
        this.monNombre = data?.monNombre || null;
        this.monVigente = data?.monVigente || null;
        this.paiId=data?.paiId || null;
      }

    getSelectOptions() {
        return {
          value: this.monId,
          label: this.monNombre,
        };
      }
}
export default Moneda;

