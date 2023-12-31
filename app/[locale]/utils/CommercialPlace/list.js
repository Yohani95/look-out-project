import { placeApiUrl,apiHeaders } from "@/app/api/apiConfig";
const fetchSectorComerciales = async () => {
    try {
      const response = await fetch(placeApiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };
  
  export default fetchSectorComerciales;
  