import {TipoServicioApiUrl} from "@/app/api/apiConfig";
export const fetchTypeService = async () => {
    try {
      const response = await fetch(TipoServicioApiUrl,{cache:"no-cache"});
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };
  