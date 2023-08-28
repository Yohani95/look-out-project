import { girosApiUrl } from "@/app/api/apiConfig";
export const fetchGiro = async () => {
    try {
      const response = await fetch(girosApiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };
  