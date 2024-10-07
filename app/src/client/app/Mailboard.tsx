import React, { useState, useEffect } from 'react';
import { useQuery } from 'wasp/client/operations';
import {  getAllTasksByUser, importmail } from 'wasp/client/operations';
import { useHistory } from 'react-router-dom';
import { type User } from 'wasp/entities';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import EmailStatusChart from '../components/MailboardPage/Emailcharts';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import {  Button,  } from '@mantine/core';
import '../Main.css';

const NoBorderTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'none',
    },
  },
});

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '35%',
  bgcolor: 'background.paper',
  borderRadius: '16px',
  p: 4,
};

const FileUploadPage = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);
  const [verified, setVerified] = useState<boolean>(false);
  const [contact, setContact] = useState<string | null>(null);
  const [template, setTemplate] = useState<any>('');
  const [nameData, setNameData] = useState<string>('');
  const [subjectData, setSubjectData] = useState<string>('');
  const [time, setTime] = useState<any>(null);
  const [schedule, setSchedule] = useState<boolean>(false);

 
  const { data: tasks, isLoading: isTasksLoading } = useQuery(getAllTasksByUser);

  const history = useHistory();

  useEffect(() => {
    if (user.sendEmail) {
      setVerified(true);
    }
    handleMailExtractClick();
  }, []);

  const handleMailExtractClick = async () => {
    const { username, id } = user;
    await importmail({ data: username, userId: id });
  };



  const handleClose = () => setOpen(false);

  const handleChange = (event: SelectChangeEvent) => {
    setTemplate(event.target.value as string);
  };

  const handleCampaign = async () => {
    const dataToPass : any = {
      name: nameData,
      subject: subjectData,
      list: contact,
      template,
      schedule: schedule ? time.toISOString() : ''
    };
    const queryParams = new URLSearchParams(dataToPass).toString();
    history.push(`/write?${queryParams}`);
  };

  const uniqueTags = Array.from(new Set(tasks?.map((task: any) => task.Tag) || []));
  const sortedUniqueTags = uniqueTags.sort();

 

  return (
    <div>
      {verified ? (
        <>
          <div style={{
          }} className="mt-8 mb-96 pb-32 md:mb-24 md:pb-24 lg:mt-16 px-4 lg:px-8">

            <div className='flex flex-row content-center'>
          <h2 className='mb-3 lg:mb-3 ml-4 lg:ml-4  mr-4 text-3xl font-semibold font-Poppins tracking-tight text-gray-900 '>
            MailBoard              
          </h2>
          <Chip className='mt-1' avatar={<DonutSmallIcon />} label="New" />
          </div>
          <div className='text-sm ml-4 lg:ml-4 mb-8 lg:mb-12 mr-4 font-normal font-Inter tracking-tight text-zinc-400 '>
            <p>Analytics are refreshed every 90 days </p>
          </div>
        
            <Modal open={open} onClose={handleClose}>
              <Box sx={style}>
              <Typography sx={{
                marginBottom : '12px'
              }} className="text-center" id="modal-modal-title" variant="h6" component="h2">
                  Create Campaign
                </Typography>
                <Divider className="my-4 " style={{ borderWidth: '1px',  marginBottom: '32px', }} />
                <NoBorderTextField
                  fullWidth
                  variant="outlined"
                  label="Name"
                  value={nameData}
                  onChange={(e) => setNameData(e.target.value)}
                  style={{ marginBottom: '16px' }}
                />
                <NoBorderTextField
                  fullWidth
                  variant="outlined"
                  label="Subject"
                  value={subjectData}
                  onChange={(e) => setSubjectData(e.target.value)}
                  style={{ marginBottom: '16px' }}
                />
                <FormControl fullWidth style={{ marginBottom: '16px' }}>
                  <InputLabel>List</InputLabel>
                  <Select value={contact} onChange={(e) => setContact(e.target.value as string)}>
                    {sortedUniqueTags.map((tag: any) => (
                      <MenuItem key={tag} value={tag}>
                        {tag}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth style={{ marginBottom: '12px' }}>
                  <InputLabel>Mail</InputLabel>
                  <Select value={template} onChange={handleChange}>
                    <MenuItem value="default">Default</MenuItem>
                    <MenuItem value="new">Create New</MenuItem>
                  </Select>
                </FormControl>
                {schedule && (
                  <>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer  components={['DateTimePicker']}>
                        <DateTimePicker
                          label="Pick a Date & Time"
                          value={time}
                          onChange={(newValue) => setTime(newValue)}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </>
                )}
                <FormControlLabel className="mb-4 mt-4" style={{ marginBottom : '20px'}} control={<Checkbox  onChange={(e) => setSchedule(e.target.checked)} />} label="Schedule" />
                <br />
                <Button
                  className="bg-[#000]  text-white cursor-pointer flex items-center p-4 border text-lg rounded-lg"
                  onClick={handleCampaign} >Create Campaign</Button>
              </Box>
            </Modal>
            <EmailStatusChart />
          </div>
        </>
      ) : (
        <Typography>Verify your email first then reload the page</Typography>
      )}
    </div>
  );
};




export default FileUploadPage;

