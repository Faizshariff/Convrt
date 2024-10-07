 import React from 'react';
 import { DataGrid, GridColDef } from '@mui/x-data-grid';
 import { TiDelete } from 'react-icons/ti';
 import { Button as NextUIButton } from '@nextui-org/react';
 import Avatar from '@mui/material/Avatar';
 import Typography from '@mui/material/Typography';
 import Chip from '@mui/material/Chip';
 import { type Task, type User } from 'wasp/entities';
 import { deleteTask, createTask, useQuery, getAllTasksByUser } from 'wasp/client/operations';

 const TaskTable = () => {

  const { data: tasks, isLoading: isTasksLoading } = useQuery(getAllTasksByUser);


  const handleDeleteClick = async (id: string) => {
    await deleteTask({ id });
  };



const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 150, renderCell: (params) => (
    <div className='flex  items-center'>
      <Avatar 
        src={params.row.logoUrl} 
        alt={params.row.name} 
        className='mr-4'
      >
        {params.row.name?.charAt(0)}
      </Avatar>
      <h1 className='font-Inter font-bold '>{params.row.name}</h1>
    </div>
  )},
  {
    field: 'status',
    headerName: 'Status',
    minWidth: 120,
    flex: 1,
    renderCell: (params) => <Typography>{params.row.Status}</Typography>,
  },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'number', headerName: 'Number', width: 200 },
  { field: 'location', headerName: 'location', width: 200 },
  {
    field: 'tag',
    headerName: 'Tag',
    minWidth: 150,
    flex: 1,
    renderCell: (params) => (
      <Chip label={params.row.tag} style={{ backgroundColor: '#444CF7', color: 'white' }} />
    ),
  },
  { field: 'description', headerName: 'Website', width: 250 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 100,
    renderCell: (params) => (
      <NextUIButton
        onClick={() => handleDeleteClick(params.row.id)}
        className='text-red-600 hover:text-red-700'
      >
        <TiDelete size='20' />
      </NextUIButton>
    ),
  },
];



const sortedTasks = tasks?.slice().sort((a: Task, b: Task) => {
  if (a.Tag < b.Tag) return -1;
  if (a.Tag > b.Tag) return 1;
  return 0;
});

const rows = sortedTasks?.map((task) => ({
  id: task.id,
  name: task.name,
  email: task.email,
  tag: task.Tag,
  description: task.description,
  location: task.Location,
  number: task.Number,
  status: task.Status,
}));


   return (
     <div className='w-full flex justify-center'>
     {isTasksLoading && <div>Loading...</div>}
     {sortedTasks && sortedTasks.length > 0 ? (
       <div className='w-full'>
         <DataGrid
           rows={rows}
           columns={columns}
           pageSizeOptions={[15, 30]}
           checkboxSelection
         />
       </div>
     ) : (
       <div className='text-gray-600 text-center'>Add Contacts to begin</div>
     )}
   </div>
   );
 };
 export default TaskTable; 
