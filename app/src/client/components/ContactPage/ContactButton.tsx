// ReusableButton.tsx
import React from 'react';
import { Button as NextUIButton } from '@nextui-org/react';

interface ReusableButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  label2 : any;
  isSmallScreen: any;
  
}

const ReusableButton: React.FC<ReusableButtonProps> = ({ onClick, icon, label, label2 , isSmallScreen }) => {
  return (
    <NextUIButton
    className={`bg-black text-white p-2 py-6 md:py-6 px-4 md:px-6 text-sm font-semibold`}
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50px',
      width: isSmallScreen ? '100%' : 'auto',
    }}
  >
    { isSmallScreen ? <> {label2} </> : <> {label} </> }
  </NextUIButton>
  );
};

export default ReusableButton;
