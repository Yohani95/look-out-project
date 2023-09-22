import {TipoServicioApiUrl} from "@/app/api/apiConfig";
export const fetchTypeService = async () => {
    try {
      const response = await fetch(TipoServicioApiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };
  