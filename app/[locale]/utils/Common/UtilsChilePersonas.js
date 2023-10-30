export const validarRut=(rut)=> {
    if (!rut) {
        return false; // Si el RUT está vacío, no es válido
      }
    if (!/^[0-9]+-[0-9kK]{1}$/.test(rut)) {
      return false;
    }
    console.log(rut)
    const cleanRut = rut.replace('-', '');
    const rutDigits = cleanRut.slice(0, -1);
    const rutVerificador = cleanRut.slice(-1).toUpperCase();
  
    let suma = 0;
    let multiplicador = 2;
  
    for (let i = rutDigits.length - 1; i >= 0; i--) {
      suma += parseInt(rutDigits.charAt(i)) * multiplicador;
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }
  
    const resto = suma % 11;
    const digitoVerificador = 11 - resto;
  
    if (digitoVerificador === 10) {
      return rutVerificador === 'K';
    } else if (digitoVerificador === 11) {
      return rutVerificador === '0';
    } else {
      return rutVerificador === digitoVerificador.toString();
    }
  }
  