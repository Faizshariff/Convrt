import React, { useState, useEffect } from 'react';
import { useQuery } from 'wasp/client/operations';
import { getCampaigns, getAllTasksByUser, importmail } from 'wasp/client/operations';
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
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import '../../Main.css';
import {  Progress, Text, Group, Paper, SimpleGrid,} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import CampaignCard from './Campaigncard';




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
  width: { xs: '80%', sm: '70%', md: '50%' }, 
  bgcolor: 'background.paper',
  borderRadius: '16px',
  p: 4,
};

const CreateCampaignPage = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);
  const [verified, setVerified] = useState<boolean>(false);
  const [contact, setContact] = useState<string | null>(null);
  const [template, setTemplate] = useState<any>('default');
  const [nameData, setNameData] = useState<string>('');
  const [subjectData, setSubjectData] = useState<string>('');
  const [time, setTime] = useState<any>(null);
  const [schedule, setSchedule] = useState<boolean>(false);

  const { data: campaigns } = useQuery(getCampaigns);
  const { data: tasks } = useQuery(getAllTasksByUser);
  const history = useHistory();
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  const data = [
    { label: 'Mobile', count: '204,001', part: 59, color: '#47d6ab' },
    { label: 'Desktop', count: '121,017', part: 35, color: '#03141a' },
    { label: 'Tablet', count: '31,118', part: 6, color: '#4fcdf7' },
  ];

  useEffect(() => {
    if (user.sendEmail) {
      setVerified(true);
    }
    handleMailExtractClick();
  }, [user]);

  const handleMailExtractClick = async () => {
    const { username, id } = user;
    await importmail({ data: username, userId: id });
  };


  const descriptions = data.map((stat: any) => (
    <Box key={stat.label} style={{ borderBottomColor: stat.color }}>
      <Text tt="uppercase" fz="xs" c="dimmed" fw={700}>
        {stat.label}
      </Text>
  
      <Group  justify="space-between" align="flex-end" gap={0}>
        <Text fw={700}>
          {stat.count}
          </Text>
        
        <Text
          c={stat.color}
          fw={700}
          size="sm"
        >
          {stat.part}%
          
        </Text>
      </Group>
      <Progress 
          style={{
            width: '100%',
            height : '1vh'
          }}
          size={12} mt={4} color={stat.color} value={23} />
    </Box>
  ));

  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event: SelectChangeEvent) => {
    setTemplate(event.target.value as string);
  };

  const handleCampaign = async () => {
    if (!nameData || !subjectData || !contact) {
      alert("Please fill in all required fields.");
      return;
    }
    const dataToPass: any = {
      name: nameData,
      subject: subjectData,
      list: contact,
      template,
      schedule: schedule ? time.toISOString() : '',
    };
    const queryParams = new URLSearchParams(dataToPass).toString();
    history.push(`/write?${queryParams}`);
  };

  const uniqueTags = Array.from(new Set(tasks?.map((task: any) => task.Tag) || []));
  const sortedUniqueTags = uniqueTags.sort();

  
  const sortedCampaigns = campaigns?.slice().sort((a: any, b: any) => (a.Tag < b.Tag ? -1 : 1));

  return (
    <div>
      {verified ? (
        <>
          <div >

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
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Pick a Date & Time"
                    value={time}
                    onChange={(newValue) => setTime(newValue)}
                    sx={{ mb: 2 }}
                  />
                </LocalizationProvider>
              </Grid>
            )}

                <FormControlLabel className="mb-4 mt-4" style={{ marginBottom : '20px'}} control={<Checkbox  onChange={(e) => setSchedule(e.target.checked)} />} label="Schedule" />
                <br />
                <button
                  className="bg-[#000]  text-white cursor-pointer flex items-center p-4 border text-lg rounded-lg"
                  onClick={handleCampaign} >Create Campaign</button>
              </Box>
            </Modal>

            <div >
            <div className='flex flex-row justify-between px-2 content-center mb-6 md:mb-2'>
              <h2 className='ml-2 md:ml-4  mr-4 text-3xl font-semibold font-Poppins tracking-tight text-gray-900'>
               Campaigns
              </h2>
              <button
                  className="block md:hidden p-2 rounded-xl mb-4 w-fit px-2 font-Inter font-normal bg-black text-white  cursor-pointer flex items-center gap-1 border text-lg"
                  onClick={handleOpen}
                >
                  <AddIcon />
                </button>
            </div>
              <div className="w-full flex justify-end items-center">
                <button
                  className="hidden md:block  p-2 rounded-xl mb-12 w-fit px-4 font-Inter font-normal bg-black text-white  cursor-pointer flex items-center gap-1 border text-lg"
                  onClick={handleOpen}
                >
                  Create
                </button>
              </div>
              {sortedCampaigns && sortedCampaigns.length > 0 ? (
              <div>
         
  {sortedCampaigns?.map(campaign => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}


              </div>
            )  : (
                <Typography>No campaigns created</Typography>
              )}
            </div>
          </div>
        </>
      ) : (
        <Typography>Verify your email first then reload the page</Typography>
      )}
    </div>
  );
};

export default CreateCampaignPage;