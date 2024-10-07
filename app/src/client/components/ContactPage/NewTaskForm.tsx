import React, { useCallback, useEffect, useState } from 'react';
import { createTask } from 'wasp/client/operations';
import { Button as NextUIButton } from '@nextui-org/react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useMediaQuery } from '@mantine/hooks';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import '../../Main.css';
import Banner from './Banner';
import TaskTable from './Table';
import ReusableButton from './ContactButton';
import useModal from '../../hooks/useModal';
import AddTaskModal from './Modals/AddModal';
import FileUploadModal from './Modals/FileUpload';
import ScrapeModal from './Modals/ScrapeModal';

export default function NewTaskForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const isSmallScreen = useMediaQuery('(max-width: 768px)');

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '80%', sm: '70%', md: '50%' },
        bgcolor: 'background.paper',
        borderRadius: '16px',
        p: 4,
        outline: 'none',
    };

    const { isOpen: isOpen, handleOpen: handleOpen, handleClose: handleClose } = useModal();
    const { isOpen: isOpen2, handleOpen: handleOpen2, handleClose: handleClose2 } = useModal();
    const { isOpen: isOpen3, handleOpen: handleOpen3, handleClose: handleClose3 } = useModal();

    return (
        <div className='w-full flex flex-col items-center justify-start'>
            <div className='rounded-md w-full'>
                <Banner />
                <div className='w-full p-4 flex flex-col justify-between mb-4'>
                    <h2 className='hidden md:block text-4xl font-semibold font-Poppins tracking-tight text-gray-900'>
                        Contacts
                    </h2>
                    <div className='ml-0 mb-2 md:mb-6 md:ml-0 w-full flex justify-between md:justify-end space-x-8 md:space-x-3'>
                        {/* Buttons to Add Data */}
                        <ReusableButton
                            onClick={handleOpen2}
                            icon={<PersonAddIcon style={{ color: 'white' }} />}
                            label='Add Data'
                            label2='Add'
                            isSmallScreen={isSmallScreen}
                        />
                        <ReusableButton
                            onClick={handleOpen}
                            icon={<UploadFileIcon style={{ color: 'white' }} />}
                            label='Upload File'
                            label2='Upload'
                            isSmallScreen={isSmallScreen}
                        />
                        <ReusableButton
                            onClick={handleOpen3}
                            icon={<AddLocationAltIcon style={{ color: 'white' }} />}
                            label='Scrape Data'
                            label2='Scrape'
                            isSmallScreen={isSmallScreen}
                        />
                        {/* End of Buttons */}

                        {/* Modals of Buttons */}
                        <FileUploadModal
                            isOpen={isOpen}
                            handleClose={handleClose}
                            isLoading={isLoading}
                            style={style}
                            setIsLoading={setIsLoading}
                        />
                        <AddTaskModal
                            isOpen={isOpen2}
                            handleClose={handleClose2}
                            isLoading={isLoading}
                            style={style}
                        />
                        <ScrapeModal
                            isOpen={isOpen3}
                            handleClose={handleClose3}
                            isLoading={isLoading}
                            style={style}
                            setIsLoading={setIsLoading}
                        />
                        {/* End of Modals */}
                    </div>
                </div>
                <div className='mb-2 sm:mb-24'>
                    <TaskTable />
                </div>
            </div>
        </div>
    );
}
