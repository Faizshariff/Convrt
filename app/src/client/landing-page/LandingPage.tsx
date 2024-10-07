import { Link } from 'wasp/client/router';
import { useAuth } from 'wasp/client/auth';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { HiBars3 } from 'react-icons/hi2';
import { BiLogIn } from 'react-icons/bi';
import {  navigation, } from './contentSections';
import DropdownUser from '../components/DropdownUser';
import { UserMenuItems } from '../components/UserMenuItems';
import Testimonials from './Testimonials';
import Features from './Features';
import Footer from './Footer';
import ShinyButton from '../components/Button'
import CustomerLogo from './Customerlogo';
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import '../Main.css'
import { useMediaQuery } from '@mantine/hooks';


export default function LandingPage() {

  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  const bannerRef = useRef(null);

  // Track the entire scroll progress
  const { scrollYProgress } = useScroll();

  // Scale the image from normal size to very large (full screen)
  const scale = useTransform(scrollYProgress, [0, 0.5, 0.75, 1], [1, 1.97, 1.97, 1.5]); // Adjusted scale range


  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: user, isLoading: isUserLoading } = useAuth();

  const NavLogo = () => <img className='h-8 w-8 rounded-lg' src='https://drive.google.com/thumbnail?id=17l_Nmgg4ag0TU2GCUxaBx2C_PmtIWuS4' alt='Convrt' />;

  return (
    <div className=' bg-white dark:text-white dark:bg-boxdark-2 '>
      {/* Header */}
      <header className='absolute inset-x-0 top-0 z-50 dark:bg-boxdark-2'>
        <nav className='flex items-center justify-between p-6 lg:px-8' aria-label='Global'>
          <div className='flex items-center lg:flex-1'>
            <a
              href='/'
              className='flex  items-center -m-1.5 p-1.5 text-gray-900 duration-300 ease-in-out hover:text-yellow-500'
            >
              <NavLogo />
              <span className=' ml-2 flex  text-center font-Poppins text-xl text-zinc-800 font-bold'>Convrt</span>
            </a>
          </div>
          <div className='flex lg:hidden'>
            <button
              type='button'
              className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-white'
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className='sr-only'>Open main menu</span>
              <HiBars3 className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
          <div className='hidden lg:flex lg:gap-x-12'>
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className='text-sm font-semibold font-Inter leading-6 text-gray-400 duration-300 ease-in-out hover:text-zinc-500 dark:text-white'
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className='hidden lg:flex lg:flex-1 lg:justify-end lg:align-end'>
            {/* <!-- Dark Mode Toggler --> */}
            <div className='flex items-center gap-3 2xsm:gap-7'>
              {isUserLoading ? null : !user ? (
              <Link to='/login'>
              <div className='p-2 px-3 border border-black bg-white rounded-xl text-black color-white flex justify-start items-center duration-300 ease-in-out text-gray-900 hover:text-yellow-500 dark:text-white'>
                Log in 
              </div>
            </Link>
              ) : (
                <DropdownUser user={user} />
              )}
            </div>
          </div>
        </nav>
        <Dialog as='div' className='lg:hidden' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className='fixed inset-0 z-50' />
          <Dialog.Panel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-boxdark dark:text-white'>
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
                      className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-boxdark-2'
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className='py-6'>
                  {isUserLoading ? null : !user ? (
                    <Link to='/login'>
                      <div className='p-2 px-3 border border-black bg-white rounded-xl text-black color-white flex justify-start items-center duration-300 ease-in-out text-gray-900 hover:text-yellow-500 dark:text-white'>
                        Log in 
                      </div>
                    </Link>
                  ) : (
                    <UserMenuItems user={user} />
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <main className='dark:bg-boxdark-2 '>
        {/* Hero section */}
        <div className='relative pt-14 w-full '>
          <div
            className='absolute top-0 right-0 -z-10 transform-gpu overflow-hidden w-full blur-3xl sm:top-0 '
            aria-hidden='true'
          >
            <div
              className='aspect-[1020/880] w-[55rem] flex-none sm:right-1/4 sm:translate-x-1/2 dark:hidden bg-gradient-to-tr from-amber-400 to-purple-300 opacity-40'
              style={{
                clipPath: 'polygon(80% 20%, 90% 55%, 50% 100%, 70% 30%, 20% 50%, 50% 0)',
              }}
            />
          </div>
          <div
            className='absolute inset-x-0 top-[calc(100%-40rem)] sm:top-[calc(100%-65rem)] -z-10 transform-gpu overflow-hidden blur-3xl'
            aria-hidden='true'
          >
            <div
              className='relative aspect-[1020/880] sm:-left-3/4 sm:translate-x-1/4 dark:hidden bg-gradient-to-br from-amber-400 to-purple-300  opacity-50 w-[72.1875rem]'
              style={{
                clipPath: 'ellipse(80% 30% at 80% 50%)',
              }}
            />
          </div>
          <div  className='py-24 sm:py-32'>
            <div className='mx-auto max-w-8xl'>
              <div className='lg:mb-18 mx-auto max-w-3xl text-center'>
                <h1 className='text-4xl mb-4 md:mb-12 font-Poppins font-semibold text-gray-900 sm:text-6xl dark:text-white'>
                Supercharge Your Lead Generation
                </h1>
               <ShinyButton />
              </div>
              {/* Banner Section with scaling effect */}
              <div ref={bannerRef} className="relative flex justify-center  h-[200vh] mb-12 md:mb-24 mt-24 ">  {/* container div*/}
                <motion.div  className={` w-full h-full flex justify-center  `}> {/* to center the div */}
               <motion.div 
                   style={{ scale, 
                    top : isSmallScreen ? '40%' : '20%',
                    }}
                
                  className="bg-[url('https://lh3.googleusercontent.com/d/1VB6wu4bpnIEHEfwKlkGd_VPtTWHnr6r8')] bg-cover image-wrapper w-[50vw] h-[30vh] md:h-[50vh] sticky "
                >  {/* actual image div */}
                </motion.div> 
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        <h1 className='font-Inter font-bold text-center mb-8 hidden md:block'> OUR PARTENERS</h1>
      <CustomerLogo />
        <Features />
       <Testimonials />
      </main>
       <Footer />

    </div>
  );
}
