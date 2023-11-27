import { monedaApiUrl } from "@/app/api/apiConfig";
export const fetchMoneda = async () => {
    try {
      const response = await fetch(monedaApiUrl,{cache:"no-cache"});
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };
  