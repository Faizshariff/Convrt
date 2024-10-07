import { motion } from "framer-motion";
import CallMadeIcon from '@mui/icons-material/CallMade';

const ShinyButton = () => {
  return (
    <motion.button
      // Type assertion to avoid TypeScript error
      initial={{ "--x": "100%", scale: 1 } as any}
      animate={{ "--x": "-100%" } as any}
      whileTap={{ scale: 0.97 }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 1,
        type: "spring",
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
          type: "spring",
          stiffness: 10,
          damping: 5,
          mass: 0.1,
        },
      }}
      className="px-8 py-2 rounded-3xl relative radial-gradient"
    >
      
      <span className="flex justify-end text-neutral-100 tracking-wide font-light h-full w-full block relative linear-mask">
        <h1 className="mr-4 font-Poppins font-normal">Start now</h1>   <CallMadeIcon />
      </span>


      <span className="block absolute inset-0 rounded-md p-px linear-overlay" />
    </motion.button>
  );
};

export default ShinyButton;
