import { estadoClienteApiUrl } from "@/app/api/apiConfig";
export const fetchEstadoCliente = async () => {
    try {
      const response = await fetch(estadoClienteApiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };
  