'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, CircularProgress } from '@mui/material';

// This component will only render on the client side
export default function ClientBookingForm(props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Dynamically import the BookingForm with SSR disabled
  const BookingForm = dynamic(
    () => import('./BookingForm'),
    {
      ssr: false,
      loading: () => (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ),
    }
  );

  if (!isMounted) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  return <BookingForm {...props} />;
}
