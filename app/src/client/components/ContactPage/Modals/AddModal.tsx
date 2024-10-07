import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Button as NextUIButton } from '@nextui-org/react';
import {  createTask,  } from 'wasp/client/operations';

interface AddTaskModalProps {
    isOpen: any;
    handleClose : any
    isLoading : boolean
    style : any
  }

const AddTaskModal : React.FC<AddTaskModalProps> = ({  isOpen, handleClose, isLoading, style } ) => {

    const [description, setDescription] = useState<string>('https://faizshariff.com');
    const [name, setName] = useState<string>('faiz');
    const [email, setEmail] = useState<string>('faizshariff540@gmail.com');
    const [subscribed, setSubscribed] = useState<boolean>(true);
    const [tag, setTag] = useState<string>('marketing');
    const [location,Setlocation] =  useState<string>('mumbai,india');
    const [number,Setnumber] = useState<string>('+91 9620964210');


  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const namedata = event.target.name.value;
      const emaildata = event.target.email.value;
      const tagdata = event.target.tag.value;
      const descriptiondata = event.target.description.value;
      const locationdata = event.target.location.value;
      const numberdata = event.target.number.value;
      if (!namedata || !emaildata || !tagdata) {
        console.log('Required fields missing');
        return;
      }
      await createTask({
        Location : locationdata,
        Number: numberdata,
        description: descriptiondata,
        name: namedata,
        email: emaildata,
        Subscribed: subscribed,
        Tag: tagdata,
      });
      setDescription('');
      setName('');
      setEmail('');
      setSubscribed(true);
      setTag('');
      Setlocation('');
      Setnumber('');
    } catch (err: any) {
      window.alert('Error: ' + (err.message || 'Something went wrong'));
    }
  };



  return (
    <Modal open={isOpen} onClose={handleClose}>
            <Box sx={style}>
              <div className='flex flex-col items-center border rounded-lg p-8 justify-between gap-3'>
                <Box component='form' onSubmit={handleSubmit} className='flex flex-col gap-4'>
                  <div className='flex flex-col gap-4'>
                    <div className='flex flex-col  md:flex-row md:space-x-4 space-y-4 md:space-y-0'>
                    <TextField id='tag' name='tag' label='Tag' variant='outlined' value={tag} onChange={(e) => setTag(e.target.value)} fullWidth />
                    <TextField id='number' name='number' label='Number' variant='outlined' value={number} onChange={(e) => Setnumber(e.target.value)} fullWidth />
                    </div>
                    <div className='flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>
                    <TextField id='name' name='name' label='Name' variant='outlined' value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                    <TextField id='location' name='location' label='Location' variant='outlined' value={location} onChange={(e) => Setlocation(e.target.value)} fullWidth />
                    </div>
                    <div className='flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>
                    <TextField id='email' name='email' label='Email' variant='outlined' value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
                    <TextField id='description' name='description' label='Website' variant='outlined' value={description} onChange={(e) => setDescription(e.target.value)} fullWidth />
                    </div>
                  </div>
                  <NextUIButton type='submit' className='bg-[#000] w-48 text-white cursor-pointer flex items-center gap-1 border text-lg rounded-lg' disabled={isLoading}>
                    {isLoading ? 'Adding...' : 'Add'}
                  </NextUIButton>
                </Box>
              </div>
            </Box>
          </Modal>
  );
};

export default AddTaskModal;
