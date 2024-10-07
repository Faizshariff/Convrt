import { type User } from 'wasp/entities';
import { useEffect, useRef, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { UserMenuItems } from './UserMenuItems';
import { cn } from '../../shared/utils';

const DropdownUser = ({ user }: { user: Partial<User> }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  useEffect(() => {
    // Generate a random user avatar URL
    const randomId = Math.floor((Math.random() * 90) + 1); // Generates a number between 1 and 90
    const avatarUrl = `https://randomuser.me/api/portraits/men/${randomId}.jpg`;
    setAvatarUrl(avatarUrl);  // Set the generated URL
  }, []); 


  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) {
        return;
      }
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className='relative'>
      <button
        ref={trigger}
        onClick={toggleDropdown}
        className='flex items-center gap-4 duration-300 ease-in-out text-gray-900 hover:text-yellow-500'
      >
            <Avatar alt="Remy Sharp" src={avatarUrl} />
      </button>

      {/* <!-- Dropdown --> */}
      <div
        ref={dropdown}
        className={cn(
          'absolute right-0 mt-4 flex w-62.5 flex-col rounded-lg border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark dark:text-white',
          {
            hidden: !dropdownOpen,
          }
        )}
      >
        <UserMenuItems user={user} setMobileMenuOpen={toggleDropdown} />
      </div>
    </div>
  );
};

export default DropdownUser;
