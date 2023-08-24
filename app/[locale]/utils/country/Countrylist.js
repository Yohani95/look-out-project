import { paisApiUrl,apiHeaders } from "@/app/api/apiConfig";
const fetchCountries = async () => {
    try {
      const response = await fetch(paisApiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };
  
  export default fetchCountries;
  
