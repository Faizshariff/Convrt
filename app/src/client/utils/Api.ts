import axios, { AxiosError } from 'axios';

// Interface for location suggestion
interface LocationSuggestion {
  label: string;
  lat: string;
  lon: string;
}

// Fetches location data from LocationIQ (no need to cache here since it's handled in the hook)
export const fetchLocationSuggestions = async (query: string): Promise<LocationSuggestion[]> => {
  const encodedQuery = encodeURIComponent(query);
  const url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${encodedQuery}&format=json`;
  try {
    const response = await axios.get(url);
    return response.data.map((item: { display_name: string; lat: string; lon: string }) => ({
      label: item.display_name,
      lat: item.lat,
      lon: item.lon,
    }));
  } catch (error) {
    // Handle different types of errors
    if (axios.isAxiosError(error)) {
      console.error(`LocationIQ API error: ${error.response?.status} - ${error.message}`);
      throw new Error('Failed to fetch location data from LocationIQ API');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};

// Fetches business data from RapidAPI
export const fetchBusinessData = async (inputValue: string, lat: string, lon: string): Promise<any[]> => {
  try {
    const response = await axios.get('https://local-business-data.p.rapidapi.com/search-in-area', {
      params: {
        query: inputValue,
        lat,
        lng: lon,
        zoom: 13,
        limit: 2,
        language: 'en',
        region: 'us',
        extract_emails_and_contacts: true,
      },
      headers: {
        'x-rapidapi-key': process.env.REACT_APP_MAPSDATA_API_KEY ,
        'x-rapidapi-host': 'local-business-data.p.rapidapi.com',
      },
    });

    return response.data.data;
  } catch (error) {
    // Handle different types of errors
    if (axios.isAxiosError(error)) {
      console.error(`RapidAPI error: ${error.response?.status} - ${error.message}`);
      throw new Error('Failed to fetch business data from RapidAPI');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};
