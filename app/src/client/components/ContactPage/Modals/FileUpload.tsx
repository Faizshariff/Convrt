import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Button as NextUIButton } from '@nextui-org/react';
import {  createTask,  } from 'wasp/client/operations';
import { usePapaParse } from 'react-papaparse';

interface AddTaskModalProps {
    isOpen: any;
    handleClose : any
    isLoading : boolean
    style : any
    setIsLoading : any
  }

const FileUploadModal : React.FC<AddTaskModalProps> = ({  isOpen, handleClose, isLoading, style, setIsLoading } ) => {

    const { readString } = usePapaParse();



    const handleFileUpload = async (e: any) => {
        try {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const file = formData.get('file-upload') as File;
          
          if (!file || !file.name || !file.type) {
            throw new Error('No file selected');
          }
      
          setIsLoading(true);
      
          const reader = new FileReader();
          reader.onload = () => {
            const fileContent = reader.result as string;
            
            readString(fileContent, {
              header: true,
              dynamicTyping: true,
              complete: async (results: any) => {
                for (const row of results.data) {
                  // Check for required fields
                  if (!row.name || !row.email || !row.Tag) {
                    console.log('Skipping row: Required fields missing');
                    continue;
                  }
      
                  // Set default values for optional fields
                  const subscribeValue = row.Subscribed !== undefined ? /true/.test(row.Subscribed) : false;
                  const descriptionValue = row.website || "No description provided";
                  const nameValue = row.name;
                  const emailValue = row.email;
                  const tagValue = row.Tag;
                  const locationValue = row.location ;
                  const NumberValue = row.number ;
      
                  try {
                    await createTask({
                      description: descriptionValue,
                      name: nameValue,
                      email: emailValue,
                      Subscribed: subscribeValue,
                      Tag: tagValue,
                      Location: locationValue,
                      Number : NumberValue,
                    });
                  } catch (error) {
                    console.error('Error processing row:', error);
                  }
                }
              },
              error: (error) => {
                console.error('Error parsing CSV:', error);
              },
            });
          };
      
          reader.readAsText(file);
        } catch (error) {
          console.log('Error uploading file. Please try again');
          console.error('Error uploading file', error);
        } finally {
          setIsLoading(false);
        }
      };




  return (
    <Modal open={isOpen} onClose={handleClose}>
            <Box sx={style}>
            <div className='space-y-48'>
                <form onSubmit={handleFileUpload} className='border rounded-lg p-8 flex flex-col gap-2'>
                  <input type='file' name='file-upload' accept='.pdf, .csv, text/*' className='text-gray-600 mb-12' />
                  <NextUIButton type='submit' className='bg-[#000] w-full text-white cursor-pointer flex items-center gap-1 border text-lg rounded-lg' disabled={isLoading}>
                    {isLoading ? 'Uploading...' : 'Upload'}
                  </NextUIButton>
                </form>
              </div>
            </Box>
          </Modal>
  );
};

export default FileUploadModal;
