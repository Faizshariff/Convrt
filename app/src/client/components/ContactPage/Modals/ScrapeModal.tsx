import React, { useState } from 'react';
import { Modal, Box, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { Button as NextUIButton } from '@nextui-org/react';
import { useLocationSearch, useBusinessSearch } from '../../../hooks/useLocationSearch';
import { createTask } from 'wasp/client/operations'; // Import the createTask function to insert data into the database

interface AddTaskModalProps {
  isOpen: boolean;
  handleClose: () => void;
  isLoading: boolean;
  style: any;
  setIsLoading: (loading: boolean) => void;
}

interface LocationOption {
  label: string;
  lat: string;
  lon: string;
}

const ScrapeModal: React.FC<AddTaskModalProps> = ({ isOpen, handleClose, isLoading, style, setIsLoading }) => {
  const [inputValue, setInputValue] = useState(''); // For TextField value
  const [autocompleteInput, setAutocompleteInput] = useState(''); // For Autocomplete input
  const [selectedLocation, setSelectedLocation] = useState<{ lat: string; lon: string } | null>(null);

  // Hook for location autocomplete
  const { locationOptions, debouncedFetch, error: locationError } = useLocationSearch();
  // Hook for fetching business data
  const { fetchBusiness } = useBusinessSearch();

  // Handle input change for the Autocomplete
  const handleAutocompleteInputChange = (event: any, newInputValue: string) => {
    setAutocompleteInput(newInputValue); // Update Autocomplete input value
    debouncedFetch(newInputValue); // Trigger the debounced fetch
  };

  // Handle selecting an option from the Autocomplete
  const handleOptionSelect = (event: any, option: LocationOption | null) => {
    if (option) {
      setSelectedLocation({ lat: option.lat, lon: option.lon });
    }
  };

  // Handle TextField input change
  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // Function to handle scraping and adding the data to the database
  const handleGetPlaces = async () => {
    if (!selectedLocation) {
      console.warn('Location not selected');
      return;
    }

    setIsLoading(true);

    try {
      // Fetch business data using lat and lon of the selected location
      const data = await fetchBusiness(inputValue, selectedLocation.lat, selectedLocation.lon);

      if (!data || !Array.isArray(data)) {
        console.error('Invalid business data');
        return;
      }

      // Loop through the fetched business data and insert valid records into the database
      for (const business of data) {
        const { name, phone_number, website, address, emails_and_contacts } = business;

        // Check if the required fields are available
        if (!name || !phone_number || !website || !address) {
          console.log('Skipping row: Required fields missing');
          continue;
        }

        const emailValue = emails_and_contacts?.emails?.[0] || 'No email available'; // Safely get the email

        // Prepare the task data
        const taskData = {
          description: website || 'No description provided', // Use website as description
          name, // Business name
          email: emailValue, // First available email
          Tag: inputValue, // Input search term used as a tag
          Location: address, // Business address
          Number: phone_number, // Phone number
        };

        try {
          // Insert the task into the database using createTask
          await createTask(taskData);
        } catch (error) {
          console.error('Error inserting task:', error);
        }
      }
    } catch (error) {
      console.error('Error fetching business data:', error);
    } finally {
      setIsLoading(false); // Stop loading spinner
    }
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={style}>
        <h1 className="font-Poppins text-center">Scrape Maps Data</h1>

        <div className="w-full flex-col">
          <div className="flex flex-col space-y-6 space-x-2 md:flex-row mb-8 md:mb-4">
            <Autocomplete
              inputValue={autocompleteInput} // Control the input value of Autocomplete separately
              options={locationOptions}
              getOptionLabel={(option) => option.label || ''}
              onInputChange={handleAutocompleteInputChange} // Handle autocomplete input
              onChange={handleOptionSelect} // Handle option selection
              sx={{
                width: {
                  xs: 'auto',
                  sm: 300,
                },
                marginLeft: '2vw',
                marginTop: {
                  xs: '4vh',
                  sm: '4vh',
                },
              }}
              renderInput={(params) => <TextField {...params} label="Search Location" />}
            />

            <TextField
              sx={{
                width: {
                  sm: 'auto',
                  md: 300,
                },
              }}
              value={inputValue} // TextField has its own value
              onChange={handleTextFieldChange} // Handle TextField input separately
              label="Location"
            />
          </div>

          <div className="w-full flex justify-center md:justify-end">
            <NextUIButton
              className="bg-[#000] w-48 md:w-48 text-white cursor-pointer flex items-center gap-1 border text-lg rounded-lg"
              onClick={handleGetPlaces}
              disabled={isLoading}
            >
              {isLoading ? 'Scraping...' : 'Scrape'}
            </NextUIButton>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ScrapeModal;