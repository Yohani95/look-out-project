import { personKamApiUrl } from "@/app/api/apiConfig";
export const fetchPerson = async () => {
    try {
      const response = await fetch(personKamApiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };
  