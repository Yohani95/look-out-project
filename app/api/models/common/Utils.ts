import { format } from "date-fns";

class Utils {
  static getFechaString(fecha: Date | null | undefined): string {
    return fecha ? format(new Date(fecha), "dd/MM/yyyy") : "N/A";
  }
}

export default Utils;
