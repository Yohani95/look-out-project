import { comunaApiUrl } from "@/app/api/apiConfig";
export const fetchComuna = async () => {
    try {
      const response = await fetch(comunaApiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };
  