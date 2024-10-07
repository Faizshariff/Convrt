import React from 'react';
import {
  Paper,
  Group,
  SimpleGrid,
  Box,
  Text,
  Progress,
  Avatar,
  ThemeIcon,
} from '@mantine/core';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useMediaQuery } from '@mantine/hooks';

const CampaignCard = ({ campaign } : any) => {
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const totalEmailsCount = campaign.emails.length;
  const openedEmailsCount = campaign.emails.filter((email : any) => email.status === 'OPENED').length;
  const deliveredEmailsCount = campaign.emails.filter((email : any) => email.status === 'DELIVERED').length;
  const bouncedEmailsCount = campaign.emails.filter((email : any) => email.status === 'BOUNCED').length;

  return (
    <Paper className='mb-4' withBorder p="xl" radius="xl">
      <div className='w-full relative'>
        <Avatar.Group style={{ marginBottom: '8px' }}>
          <Avatar src="https://ilustrandodudas.com/wp-content/uploads/2018/07/behance_jobs.jpg" />
          <Avatar src="https://static.vecteezy.com/ti/vetor-gratis/p2/3740838-rg-logo-monogram-with-slash-style-design-template-gratis-vetor.jpg" />
          <Avatar src="https://i.pinimg.com/564x/dd/31/4d/dd314d0ec8d09681989a63a914257a09.jpg" />
        </Avatar.Group>
        <ThemeIcon
          color="dark"
          variant="light"
          style={{ color: 'white', backgroundColor: 'black', position: 'absolute', right: 0, top: 0 }}
          size={isSmallScreen ? 24 : 38}
          radius="xl"
        >
          <ArrowOutwardIcon className="text-blue" />
        </ThemeIcon>
        <Group justify="space-between">
          <Group align="flex-end" gap="xs">
            <h1 className='font-Poppins font-bold text-2xl' style={{ marginTop: '4px', marginBottom: '2px' }}>
              {campaign.name}
            </h1>
          </Group>
        </Group>

        <SimpleGrid spacing="xl" cols={{ base: 1, xs: 3 }} mt="xl">
          <Box>
            <Text className='font-Poppins' tt="uppercase" fz="xs" c="dimmed" fw={600}>
              Delivered Emails
            </Text>
            <Progress
              style={{ width: '100%', height: '1vh' }}
              size={12} mt={4} color={'#444CF7'} value={deliveredEmailsCount / totalEmailsCount * 100} />
          </Box>

          <Box>
            <Text className='font-Poppins' tt="uppercase" fz="xs" c="dimmed" fw={600}>
              Opened Emails
            </Text>
            <Progress
              style={{ width: '100%', height: '1vh' }}
              size={12} mt={4} color={'#444CF7'} value={openedEmailsCount / totalEmailsCount * 100} />
          </Box>

          <Box>
            <Text className='font-Poppins' tt="uppercase" fz="xs" c="dimmed" fw={600}>
              Bounced Mails
            </Text>
            <Progress
              style={{ width: '100%', height: '1vh' }}
              size={12} mt={4} color={'#444CF7'} value={bouncedEmailsCount / totalEmailsCount * 100} />
          </Box>
        </SimpleGrid>
      </div>
    </Paper>
  );
};

export default CampaignCard;
