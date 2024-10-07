import { Group, ThemeIcon } from '@mantine/core';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';


interface StatCardProps {
    stat: any;
    isSmallScreen: any;
  }
  
export const StatCard: React.FC<StatCardProps> = ({ stat, isSmallScreen }) => (
    <div className='border rounded-3xl pt-4 pb-8 px-4 lg:px-6'>
      <Group>
        <div className="w-full relative">
          <ThemeIcon
            color="dark"
            variant="light"
            style={{ color: 'white', backgroundColor: 'black', position: 'absolute', right: 0 }}
            size={isSmallScreen ? 24 : 38}
            radius="xl"
          >
            <ArrowOutwardIcon className="text-blue" />
          </ThemeIcon>
          <h1 className="w-3/5 text-zinc-400 mb-2 text-sm font-semibold font-Inter">{stat.title}</h1>
          <h1 className="text-black text-2xl mb-4 lg:mb-8 font-bold font-Poppins">{stat.value}</h1>
        </div>
      </Group>
      <div className="w-full h-12 md:h-16">
        <svg
          className="w-full h-full"
          viewBox="0 0 2000 600"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M0 600h114.286V262.217q0-4-4-4H4q-4 0-4 4ZM142.857 600h114.286V249.916q0-4-4-4H146.857q-4 0-4 4ZM285.714 600H400V408.616q0-4-4-4H289.714q-4 0-4 4ZM428.571 600h114.286V69.454q0-4-4-4H432.571q-4 0-4 4ZM571.429 600h114.285V316.61q0-4-4-4H575.43q-4 0-4 4ZM714.286 600H828.57V346.068q0-4-4-4H718.286q-4 0-4 4ZM857.143 600h114.286V441.444q0-4-4-4H861.143q-4 0-4 4ZM1000 600h114.286V437.747q0-4-4-4H1004q-4 0-4 4ZM1142.857 600h114.286V199.828q0-4-4-4h-106.286q-4 0-4 4ZM1285.714 600H1400V364.638q0-4-4-4h-106.286q-4 0-4 4ZM1428.571 600h114.286V300.933q0-4-4-4h-106.286q-4 0-4 4ZM1571.429 600h114.285V344.184q0-4-4-4H1575.43q-4 0-4 4ZM1714.286 600h114.285V201.699q0-4-4-4h-106.285q-4 0-4 4ZM1857.143 600h114.286V318.464q0-4-4-4h-106.286q-4 0-4 4Z"
            fill="#444cf7"
          />
        </svg>
      </div>
    </div>
  );