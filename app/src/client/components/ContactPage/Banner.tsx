// ReusableButton.tsx
import React from 'react';
import { useMediaQuery } from '@mantine/hooks';



const Banner: React.FC = () => {

    const isSmallScreen = useMediaQuery('(max-width: 768px)');

  return (
    <>
          <section className="bg-white rounded-3xl px-0 md:px-4 py-4 antialiased dark:bg-gray-900 md:py-16">
  <div 
    style={{
      backgroundImage: `url('https://lh3.googleusercontent.com/d/1jA5th28_AsVBSPBKlx4hKwsRTY4ndaBV')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
    className="w-full h-full rounded-3xl p-4 md:p-4  lg:grid-cols-12 lg:gap-8 lg:p-16"
  >
    <div className="backdrop-blur-xl w-full h-full p-8 rounded-xl me-auto place-self-center lg:col-span-7">
      <h1 className="text-Inter mb-3 text-2xl font-bold leading-tight tracking-tight text-white dark:text-white md:text-4xl">
        Unlock Unlimited Potential with Pro
      </h1>
      <p className="text-Inter text-sm md:text-md w-full md:w-8/12 text-justify mb-6 text-white">
      {isSmallScreen ? 
      <></>
       : 
        <>
        Experience the ultimate in Lead hunting with our Pro Plan. Send up to 500,000 emails and unlimited calls every month and watch your business soar.
        </>}
        </p>
      <a
        href="#"
        className="text-Inter inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-center text-base font-medium text-black hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
      >
        Buy now
      </a>
    </div>
  </div>
</section>
    </>
  );
};

export default Banner;
