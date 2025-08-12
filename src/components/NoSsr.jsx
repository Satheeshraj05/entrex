'use client';

import { useState, useEffect } from 'react';

export default function NoSsr({ children, defer = false, fallback = null }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't defer on the server, and not asap = only on client side
  if (typeof window === 'undefined' || !defer) {
    return children;
  }

  if (!mounted) {
    return fallback || <div style={{ display: 'inline-block' }} />;
  }

  return children;
}
