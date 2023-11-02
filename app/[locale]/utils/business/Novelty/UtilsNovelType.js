import { tipoNovedadApiUrl } from "@/app/api/apiConfig";
export const fetchNoveltyType = async () => {
    try {
      const response = await fetch(tipoNovedadApiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };