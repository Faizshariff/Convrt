import { useState, useCallback, useEffect, useMemo } from 'react';
import debounce from 'lodash/debounce';
import { fetchLocationSuggestions,  fetchBusinessData } from '../../../utils/Api';
import useSessionStorageMap from '../../../hooks/useLocalStorage' 

export const useLocationSearch = (debounceDelay = 500) => {
    const [locationOptions, setLocationOptions] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
  
    // Use caching logic with the custom hook
    const [cachedLocations, setCachedLocations] = useSessionStorageMap<{ [key: string]: any[] }>(
      'locationSuggestions',
      {}
    );
  
    const fetchLocations = useCallback(
      async (query: string) => {
        if (!query) return;
  
        // Check cache first
        if (cachedLocations[query]) {
          setLocationOptions(cachedLocations[query]);
          return;
        }
  
        try {
          const results = await fetchLocationSuggestions(query);
          setLocationOptions(results);
  
          // Cache the results
          setCachedLocations((prevCache) => ({
            ...prevCache,
            [query]: results,
          }));
        } catch (err) {
          console.error('Error fetching locations:', err); // Log the actual error for debugging
          setError('Failed to fetch locations. Please try again.');
        }
      },
      [cachedLocations, setCachedLocations]
    );
  
    // Debounce the API call
    const debouncedFetch = useMemo(() => debounce(fetchLocations, debounceDelay), [fetchLocations]);
  
    // Cleanup the debounced function when the component unmounts
    useEffect(() => {
      return () => {
        debouncedFetch.cancel();
      };
    }, [debouncedFetch]);
  
    return {
      locationOptions,
      debouncedFetch,
      error,
    };
  };

export const useBusinessSearch = () => {
    const [businessData, setBusinessData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
  
    const fetchBusiness = useCallback(
      async (inputValue: string, lat: string, lon: string) => {
        try {
          const data = await fetchBusinessData(inputValue, lat, lon);
          setBusinessData(data);
          return data; // Make sure to return the data
        } catch (err) {
          setError('Error fetching business data');
          throw err; // Rethrow the error so it can be caught where fetchBusiness is called
        }
      },
      []
    );
  
    return {
      businessData,
      fetchBusiness,
      error,
    };
  };
  