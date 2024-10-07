import { useState, useCallback, useEffect } from 'react';

type SetValue<T> = T | ((val: T) => T);

// Initialize an in-memory cache (Map) outside of the hook to retain data within the session
const inMemoryCache = new Map<string, any>();

function useSessionStorageMap<T>(key: string, initialValue: T): [T, (value: SetValue<T>) => void] {
  // Use state to store the value, leveraging the cache when available
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Try to get the value from the in-memory cache first
    if (inMemoryCache.has(key)) {
      return inMemoryCache.get(key);
    }
    return initialValue; // Return initialValue if not found in cache
  });

  // Memoized function to update the cache and state
  const setValue = useCallback(
    (value: SetValue<T>) => {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore); // Update state
      inMemoryCache.set(key, valueToStore); // Update the in-memory cache
    },
    [key, storedValue] // Dependencies
  );

  return [storedValue, setValue];
}

export default useSessionStorageMap;
