import { useState } from 'react';

function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return { isOpen, handleOpen, handleClose };
}

export default useModal;
