'use server';

import { emailApiUrl } from '@/app/api/apiConfig';
import Funcionalidad from '@/app/api/models/admin/Funcionalidad';
import { CrudOperations } from '@/app/api/models/common/CrudOperations';

export async function EnviarEmailFactura(emailData: any) {
  try {
    const response = await fetch(`${emailApiUrl}/enviar-email-factura`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });
    if (!response.ok) {
      throw new Error(
        `Error en la solicitud: ${response.status} - ${response.statusText}`
      );
    }

    return await response.ok;
  } catch (error) {
    console.error('Error al enviar el email:', error);
    return null; // Retorna null para que el código que lo llame lo maneje correctamente
  }
}
