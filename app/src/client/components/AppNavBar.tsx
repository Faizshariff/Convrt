import { Link } from 'wasp/client/router';
import { useAuth } from 'wasp/client/auth';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { BiLogIn } from 'react-icons/bi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { HiBars3 } from 'react-icons/hi2';
import DropdownUser from './DropdownUser';
import { UserMenuItems } from '../components/UserMenuItems';
import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';

const navigation = [
  { name: 'Contacts', href: '/contact-list' },
  { name: 'Mailboard', href: '/mailboard' },
  { name: 'Campaign', href: '/campaign' },
];

const NavLogo = () => <img className='h-8 w-8' src={'https://lh3.googleusercontent.com/d/17l_Nmgg4ag0TU2GCUxaBx2C_PmtIWuS4=s220?authuser=0'} alt='Your SaaS App' />;

export default function AppNavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');

  const { data: user, isLoading: isUserLoading } = useAuth();


  useEffect(() => {
    // Generate a random user avatar URL
    const randomId = Math.floor((Math.random() * 90) + 1); // Generates a number between 1 and 90
    const avatarUrl = `https://randomuser.me/api/portraits/men/${randomId}.jpg`;
    setAvatarUrl(avatarUrl);  // Set the generated URL
  }, []); 



  return (
    <header className='absolute inset-x-0 top-0 z-50 sticky  bg-white bg-opacity-50 backdrop-blur-lg backdrop-filter dark:border dark:border-gray-100/10 dark:bg-boxdark-2'>
      <nav className='p-6 items-center flex justify-between lg:justify-evenly w-full py-6 lg:px-8' aria-label='Global'>
     
      <div className='ml-0 lg:ml-24   lg:flex-1'>
  <a  href='/' className='-m-1.5 flex lg:flex-1 items-center  p-1.5'>
  <img 
          className='rounded-xl h-8 w-8 mr-4 object-cover' 
          
          src='https://drive.google.com/thumbnail?id=17l_Nmgg4ag0TU2GCUxaBx2C_PmtIWuS4' 
          alt='Convrt' 
        />
        <h1 className='flex  text-center font-Poppins text-xl text-zinc-800 font-bold'>Convrt</h1>
  </a>
</div>

        <div className='flex  lg:hidden'>
          <button
            type='button'
            className=' inline-flex items-center justify-center rounded-md px-2  text-white dark:text-white'
            onClick={() => setMobileMenuOpen(true)}
          >
             <Avatar alt="Remy Sharp" src={avatarUrl} />
          </button>
        </div>


        <div className='hidden w-2/5 bg-black rounded-full justify-center py-4 lg:flex lg:gap-x-12'>
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className='text-sm font-Inter font-normal leading-6 text-white duration-300 ease-in-out dark:text-white'
            >
              {item.name}
            </a>
          ))}
        </div>



        <div className='hidden w-full ml-24 lg:flex lg:flex-1 gap-3 justify-around items-center'>

       

          {isUserLoading ? null : !user ? (
            <a href={!user ? '/login' : '/account'} className='text-sm font-semibold leading-6 m-2'>
              <div className='flex items-center duration-300 ease-in-out text-gray-900  dark:text-white'>
                Log in <BiLogIn size='1.1rem' className='ml-1 mt-[0.1rem]' />
              </div>
            </a>
          ) : (
            <div className='ml-2'>
              <DropdownUser user={user} />
            </div>
          )}
        </div>
      </nav>
      <Dialog as='div' className='lg:hidden' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className='fixed inset-0 z-50' />
        <Dialog.Panel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:text-white dark:bg-boxdark px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
          <div className='flex items-center justify-between'>
            <a href='/' className='-m-1.5 p-1.5'>
              <span className='sr-only'>Your SaaS</span>
              <NavLogo />
            </a>
            <button
              type='button'
              className='-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-50'
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className='sr-only'>Close menu</span>
              <AiFillCloseCircle className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-gray-500/10'>
              <div className='space-y-2 py-6'>
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white hover:dark:bg-boxdark-2'
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            
              <div className='py-6'>
                {isUserLoading ? null : !user ? (
                  <Link to='/login'>
                    <div className='flex justify-end items-center duration-300 ease-in-out text-gray-900 hover:text-yellow-500 dark:text-white'>
                      Log in <BiLogIn size='1.1rem' className='ml-1' />
                    </div>
                  </Link>
                ) : (
                  <UserMenuItems user={user} setMobileMenuOpen={setMobileMenuOpen} />
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}