import { Container, Grid, SimpleGrid, Skeleton, rem } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export default function Features() {
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  const PRIMARY_COL_HEIGHT = rem(isSmallScreen ? 300 : 500);
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  const bg1 = isSmallScreen ?
  'https://lh3.googleusercontent.com/d/1fM_5YocWeCdW21wA1dAlP1jeZZybotjp' : 
  'https://lh3.googleusercontent.com/d/1m-2viCD0Njjy5S1bp3Yg9cdRFuzRR1JT'

  const bg2 = isSmallScreen ?
  'https://lh3.googleusercontent.com/d/1f4yjYLcePmXANi-XjmHiochRjBjgaAr6' : 
  'https://lh3.googleusercontent.com/d/1M80jf13chFjgroLHr7lHM02Cx7Gu802A'

  const bg3 = isSmallScreen ?
  'https://lh3.googleusercontent.com/d/1CB9_JGdkg41K_IDs3S01pAorLl3dD9ft' : 
  'https://lh3.googleusercontent.com/d/1pwqykLWA0eADMoT1vEx74LyDBxmClbem'


  const bg4 = isSmallScreen ?
  'https://lh3.googleusercontent.com/d/1p82A4Tgcq5tPZA30kW-0kaH0sKX1TnZp' : 
  'https://lh3.googleusercontent.com/d/1NnFOHlxkw7xxHPBKDq-flCNoBDzQ4y18'


  return (
    <div className="w-full h-full">
      <Container fluid style={{ width: '100%' }} my="md">
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
          {/* First grid item with background */}
          <div
            style={{
              backgroundImage: `url(${bg1})`, 
              backgroundSize: 'cover',
              backgroundPosition: 'left top',
              backgroundRepeat: 'no-repeat',
              height: PRIMARY_COL_HEIGHT,
              borderRadius: '0.75rem', // Matches the 'md' radius
            }}
          />
          <Grid gutter="md">
            <Grid.Col>
              {/* Second grid item with background */}
              <div
                style={{
                  backgroundImage: `url(${bg2})`, 
                  backgroundSize: 'cover',
                  backgroundPosition: 'left top',
                  backgroundRepeat: 'no-repeat',
                  height: SECONDARY_COL_HEIGHT,
                  borderRadius: '0.375rem',
                }}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              {/* Third grid item with background */}
              <div
                style={{
                  backgroundImage: `url(${bg3})`, 
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  height: SECONDARY_COL_HEIGHT,
                  borderRadius: '0.375rem',
                }}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              {/* Fourth grid item with background */}
              <div
                style={{
                  backgroundImage: `url(${bg4})`, 
                  backgroundSize: 'cover',
                  backgroundPosition: 'right center',
                  backgroundRepeat: 'no-repeat',
                  height: SECONDARY_COL_HEIGHT,
                  borderRadius: '0.375rem',
                }}
              />
            </Grid.Col>
          </Grid>
        </SimpleGrid>
      </Container>
    </div>
  );
}