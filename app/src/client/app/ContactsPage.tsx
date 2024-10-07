import React, { useEffect, useState } from 'react';
import {  type User } from 'wasp/entities';

import { importmail } from 'wasp/client/operations';
import '../Main.css'; 
import NewTaskForm from '../components/ContactPage/NewTaskForm';

export default function DemoAppPage({ user }: { user: User }) {
  const [verified, setVerified] = useState<boolean>(false);

  useEffect(() => {
    handleMailExtractClick();
    if (user.sendEmail === true) {
      setVerified(true);
    }
  }, [user.sendEmail]);

  const handleMailExtractClick = async () => {
    const data = user.username;
    const userId = user.id;
    await importmail({ data, userId });
  };

  return (
    <div className='flex flex-col justify-start items-center w-full min-h-screen' style={{ maxHeight: '100vh' }}>
      <div className='w-11/12'>
        {verified ? (
          <NewTaskForm  />
        ) : (
          <h1>Verify your email first then reload the page</h1>
        )}
      </div>
    </div>
  );
}