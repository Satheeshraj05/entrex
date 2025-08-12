'use client';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Box } from '@mui/material';
import theme from '../../theme';
import dynamic from 'next/dynamic';

// Dynamically import the BookingsList component with SSR disabled
const BookingsList = dynamic(
  () => import('../../components/BookingsList'),
  { ssr: false }
);

const BookingsPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh',
        backgroundColor: '#F7F7F7',
        py: 4
      }}>
        <Container maxWidth="lg">
          <BookingsList />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default BookingsPage;
