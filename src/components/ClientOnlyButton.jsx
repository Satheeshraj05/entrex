'use client';

import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

export default function ClientOnlyButton({ children, ...props }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render the button on the server
  if (!mounted) {
    return <div style={{ display: 'inline-block', minWidth: '64px', minHeight: '36px' }} />;
  }

  return <Button {...props}>{children}</Button>;
}
