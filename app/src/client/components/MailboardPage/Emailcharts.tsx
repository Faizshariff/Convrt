import React, { useEffect, useState } from 'react';
import { useQuery } from 'wasp/client/operations';
import { getCampaigns } from 'wasp/client/operations';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useMediaQuery } from '@mantine/hooks';
import { PieChart } from '@mui/x-charts/PieChart';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import '../../Main.css';
import { StatCard } from './Statcard';

const EmailStatusChart = () => {
  const { data: campaigns, isLoading: isCampaignsLoading } = useQuery(getCampaigns);
  const [stats, setStats] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (campaigns) {
      let totalEmails = 0;
      let openedEmails = 0;
      let deliveredEmails = 0;
      let clickedEmails = 0;
      let bouncedEmails = 0;

      campaigns.forEach((campaign: any) => {
        totalEmails += campaign.emails.length;
        campaign.emails.forEach((email: any) => {
          if (email.opened) openedEmails++;
          if (email.delivered) deliveredEmails++;
          if (email.status === 'CLICKED') clickedEmails++;
          if (email.bounced) bouncedEmails++;
        });
      });

      const openRate = ((openedEmails / totalEmails) * 100).toFixed(2);
      const deliveryRate = ((deliveredEmails / totalEmails) * 100).toFixed(2);
      const bounceRate = ((bouncedEmails / totalEmails) * 100).toFixed(2);



      const newStats = [
        { title: 'Total Mails Sent', value: totalEmails, },
        { title: 'Opened Mails', value: openedEmails, },
        { title: 'Delivered Mails', value: deliveredEmails, },
        { title: 'Bounced Mails', value: bouncedEmails,},
      ];
      setStats(newStats);

      const newChartData = [
        { id: 0, title: 'Delivery Rate' , value: deliveryRate , color : '#B2C8FF'  },
        { id: 1, title: 'Open Rate' , value: openRate , color :  '#80A3FF' },
        { id: 2, title: 'Bounce Rate' , value: bounceRate , color : '#444CF7' },
      ];
      setChartData(newChartData);
    }
  }, [campaigns]);

  if (isCampaignsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ height: '60vh' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {stats.map((stat, index) => (
              <Grid item xs={6} sm={6} md={6} key={index}>
                <StatCard stat={stat} isSmallScreen={isSmallScreen} />
              </Grid>
            ))}
          </Grid>
        </Grid>


        <Grid 
  item 
  xs={12} 
  md={6} 
  className="pl-0 md:pl-4 pt-12 md:pt-0 flex justify-center items-center lg:items-start"
>
  <Grid
    container
    className={`w-full md:w-11/12 rounded-xl border p-4 md:p-4 flex ${
      isSmallScreen ? 'flex-col' : 'flex-row justify-around'
    }`}
    justifyContent="center"
    alignItems="center"
  >
    {/* Heading Section */}
    <Grid item xs={12} className="w-full mb-4">
      <h1 className="mb-4 md:mb-0 mt-4 md:mt-0 text-center font-Inter text-lg font-semibold">Overall Analytics</h1>
    </Grid>

    {/* Pie Chart Section */}
    <div
      className={`${
        isSmallScreen
          ? 'w-full flex justify-center mb-8'
          : 'w-6/12 flex justify-center items-center'
      }`}
    >
      <PieChart
      colors={['#444CF7', '#80A3FF', '#B2C8FF']}
        series={[
          {
            data: [
              { id: 0, value: 10 },
              { id: 1, value: 15 },
              { id: 2, value: 20 },
            ],
            innerRadius: isSmallScreen ? 20 : 50, // Responsive inner radius
            paddingAngle: isSmallScreen ? 0 : 3,
            cornerRadius: isSmallScreen ? 0 : 5,
          },
        ]}
        width={isSmallScreen ? 280 : 400} // Responsive width
        height={isSmallScreen ? 200 : 250} // Responsive height
        sx={{
          marginLeft : '30%',
        }}
      />
    </div>

    {/* List Section */}
    <div
      className={`${
        isSmallScreen
          ? 'w-full text-center flex justify-center items-center'
          : 'w-6/12 flex justify-center items-center'
      }`}
    >
      <ul className="w-full px-8 list-none">
        {chartData.map((data, index) => (
          <li className="mb-4 w-full flex items-center" key={index}>
            <FiberManualRecordIcon sx={{ color : data.color}} className="mr-6 md:mr-2" />
           <span className='flex text-center font-Inter'> <h1 className='w-28 md:w-28 mr-8 md:mr-4 '>{data.title}</h1> <h1 className='font-semibold font-Poppins color-zinc-300'> {data.value}</h1> </span>
          </li>
        ))}
      </ul>
    </div>
  </Grid>
</Grid>



      </Grid>
    </Box>
  );
};


export default EmailStatusChart;
