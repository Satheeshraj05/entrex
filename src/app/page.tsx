'use client';

import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Box, 
  CssBaseline, 
  ThemeProvider, 
  createTheme,
  TextField,

  MenuItem,
  Link as MuiLink
} from '@mui/material';

import Image from 'next/image';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the BookingForm with SSR disabled
const ClientBookingForm = dynamic(
  () => import('../components/ClientBookingForm'),
  { ssr: false }
);

interface FAQItemProps {
  faq: {
    question: string;
    answer: string;
  };
}

const FAQItem = ({ faq }: FAQItemProps) => (
  <Box 
    sx={{
      borderBottom: '1px solid #eee',
      py: 3,
      '&:last-child': {
        borderBottom: 'none'
      }
    }}
  >
    <Box 
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        '&:hover h4': {
          color: '#00A699'
        }
      }}
    >
      <Typography 
        variant="h6" 
        component="h4"
        sx={{
          fontWeight: 600,
          color: '#333',
          transition: 'color 0.2s ease',
          fontSize: '1.1rem',
          pr: 2
        }}
      >
        {faq.question}
      </Typography>
      <Box sx={{
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#00A699',
        flexShrink: 0
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Box>
    </Box>
    {faq.answer && (
      <Box sx={{ mt: 2, pl: 1 }}>
        <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7 }}>
          {faq.answer}
        </Typography>
      </Box>
    )}
  </Box>
);

// Theme is now imported and used in the themeInstance below

// Create a theme instance (keeping this for backward compatibility)
const themeInstance = createTheme({
  palette: {
    primary: {
      main: '#FF5A5F',
      light: '#FF7E82',
      dark: '#E04E53',
      contrastText: '#fff',
    },
    secondary: {
      main: '#00A699',
      light: '#33B8AD',
      dark: '#008489',
    },
    background: {
      default: '#F7F7F7',
      paper: '#ffffff',
    },
    text: {
      primary: '#222222',
      secondary: '#717171',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
      color: '#222222',
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
      color: '#222222',
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#222222',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#717171',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '12px 24px',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#E04E53',
          },
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#B0B0B0',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#222222',
            borderWidth: 1,
          },
        },
        input: {
          padding: '14px 16px',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#717171',
          '&.Mui-focused': {
            color: '#222222',
          },
        },
      },
    },
  },
});

function Home() {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBookingSuccess = () => {
    // Success handler for booking form
    console.log('Booking successful!');
  };

  return (
    <ThemeProvider theme={themeInstance}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Main content wrapper */}
        {/* Header */}
        <AppBar 
          position="fixed" 
          color="transparent" 
          elevation={0}
          sx={{ 
            bgcolor: 'white',
            borderBottom: '1px solid #EBEBEB',
            zIndex: 1100
          }}
        >
          <Container maxWidth={false} sx={{ maxWidth: '1760px', px: { xs: 4, sm: 6, lg: 8 } }}>
            <Toolbar disableGutters sx={{ minHeight: '80px', justifyContent: 'flex-end' }}>
              {/* Logo */}
              <Box 
                component="img"
                src="/Background (3) 1.png"
                alt="Logo"
                sx={{ 
                  height: 40,
                  width: 'auto',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  objectFit: 'contain'
                }}
              />

              {/* Navigation Links - Right Aligned */}
              <Box sx={{ 
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: 2,
                ml: 'auto'
              }}>
                {['About Us', 'Services', 'Tour Packages', 'Luxury Car Rentals', 'Clients', 'Contact Us'].map((item, index) => (
                  <Button 
                    key={item}
                    color="inherit"
                    sx={{
                      color: index === 0 ? '#FF5A5F' : 'text.secondary',
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      px: 2,
                      py: 1.5,
                      borderRadius: '22px',
                      whiteSpace: 'nowrap',
                      '&:hover': { 
                        bgcolor: 'rgba(0, 0, 0, 0.02)',
                        color: index === 0 ? '#FF5A5F' : 'text.primary'
                      },
                      textTransform: 'none',
                      minWidth: 'auto',
                      height: '42px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {item}
                  </Button>
                ))}
              </Box>

              {/* Right-side Actions - Removed as per user request */}
            </Toolbar>
          </Container>
        </AppBar>

        {/* Main Content - Hero Section */}
        <Box sx={{ bgcolor: 'white', pt: 16, pb: 8 }}>
          <Container maxWidth="lg">
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', lg: 'row' },
              gap: 8,
              alignItems: 'center'
            }}>
              {/* Left Side - Content */}
              <Box sx={{ 
                flex: 1,
                maxWidth: { lg: '50%' },
                textAlign: { xs: 'center', lg: 'left' }
              }}>
                <Typography 
                  variant="h1" 
                  component="h1" 
                  sx={{ 
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    lineHeight: 1.1,
                    mb: 3,
                    fontWeight: 600
                  }}
                >
                  Seamless, Safe, and Smart Commute Solutions for Your Workforce
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontSize: '1.25rem',
                    color: 'text.secondary',
                    mb: 4,
                    maxWidth: '90%',
                    mx: { xs: 'auto', lg: 0 }
                  }}
                >
                  Efficient and reliable transportation services tailored for your business needs.
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2,
                  justifyContent: { xs: 'center', lg: 'flex-start' }
                }}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    size="large"
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: '8px',
                      fontSize: '1rem',
                      textTransform: 'none',
                    }}
                  >
                    Learn More
                  </Button>
                </Box>
              </Box>

              {/* Right Side - Booking Form */}
              <Box sx={{ 
                width: { xs: '100%', lg: '40%' },
                bgcolor: 'white',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                p: 4,
                mt: { xs: 4, md: 0 },
                position: 'relative',
                zIndex: 1,
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: '16px',
                  padding: '2px',
                  background: 'linear-gradient(90deg, #FF5A5F 0%, #00A699 100%)',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'destination-out',
                  maskComposite: 'exclude',
                  zIndex: -1
                }
              }}>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    mb: 3, 
                    fontWeight: 600,
                    background: 'linear-gradient(90deg, #FF5A5F 0%, #00A699 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                  }}
                >
                  Book Your Ride Instantly
                </Typography>
                
                {mounted && <ClientBookingForm onSuccess={handleBookingSuccess} />}

                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <Link href="/bookings" passHref>
                    <MuiLink 
                      component="button" 
                      variant="body2"
                      sx={{ 
                        color: 'primary.main',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                        }
                      }}
                    >
                      View all bookings
                    </MuiLink>
                  </Link>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Features Section */}
        <Box sx={{ py: 8, bgcolor: '#F7F7F7', borderRadius: '24px', mt: 8, mb: 8 }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography 
                variant="h2" 
                component="h2" 
                sx={{ 
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  fontWeight: 600,
                  mb: 2
                }}
              >
                Why Choose Us
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'text.secondary',
                  maxWidth: '600px',
                  mx: 'auto',
                  fontSize: '1.1rem'
                }}
              >
                We provide the best experience for your travel needs with our exceptional services
              </Typography>
            </Box>

            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 4,
              mt: 6
            }}>
              {[
                {
                  icon: '🏨',
                  title: 'Best Hotels',
                  description: 'Hand-picked hotels with the highest standards of quality and comfort.'
                },
                {
                  icon: '✈️',
                  title: 'Easy Booking',
                  description: 'Simple and fast booking process with instant confirmation.'
                },
                {
                  icon: '💰',
                  title: 'Best Price',
                  description: 'We guarantee the best prices for all our accommodations.'
                },
                {
                  icon: '⭐',
                  title: 'Top Ratings',
                  description: 'Highly rated by thousands of satisfied customers.'
                },
                {
                  icon: '🌍',
                  title: 'Worldwide',
                  description: 'Find accommodations in over 100 countries worldwide.'
                },
                {
                  icon: '📱',
                  title: 'Mobile App',
                  description: 'Book on the go with our easy-to-use mobile application.'
                }
              ].map((feature, index) => (
                <Box 
                  key={index}
                  sx={{
                    p: 4,
                    bgcolor: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    }
                  }}
                >
                  <Box 
                    sx={{
                      width: 64,
                      height: 64,
                      bgcolor: 'rgba(0, 166, 153, 0.1)',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px',
                      mb: 3
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    sx={{ 
                      mb: 1.5,
                      fontWeight: 600
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary',
                      lineHeight: 1.6
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>

        {/* Why ENTREX for Employee Commute */}
        <Box sx={{ py: 8, bgcolor: 'white' }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography 
                variant="h2" 
                component="h2" 
                sx={{ 
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  fontWeight: 600,
                  mb: 2
                }}
              >
                Why ENTREX for Employee Commute?
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'text.secondary',
                  maxWidth: '800px',
                  mx: 'auto',
                  fontSize: '1.1rem',
                  mb: 6
                }}
              >
                We provide the best experience for your employee commute needs with our exceptional services
              </Typography>
            </Box>

            <Box sx={{ 
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              gap: 4,
              alignItems: 'center',
              minHeight: 'auto',
              maxWidth: '1200px',
              margin: '0 auto',
            }}>
              <Box sx={{ 
                flex: '0 0 60%',
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                padding: '10px',
                gap: 2,
                alignContent: 'flex-start',
                height: 'auto'
              }}>
              {[
                {
                  icon: '📍',
                  title: 'Real-Time GPS Tracking',
                  description: 'Live tracking of all your vehicles for complete visibility and security.'
                },
                {
                  icon: '👔',
                  title: 'Management',
                  description: 'Comprehensive tools for efficient fleet and employee management.'
                },
                {
                  icon: '👨‍✈️',
                  title: 'Verified Chauffeurs',
                  description: 'Professional, trained, and thoroughly vetted drivers for your safety.'
                },
                {
                  icon: '🌐',
                  title: 'PAN India Coverage',
                  description: 'Nationwide network ensuring services across all major cities and towns.'
                },
                {
                  icon: '📞',
                  title: '24×7 Control Room',
                  description: 'Round-the-clock monitoring and support for all your transportation needs.'
                },
                {
                  icon: '📈',
                  title: 'Data-Driven Reporting',
                  description: 'Detailed analytics and insights for informed decision making.'
                }
              ].map((feature, index) => (
                <Box 
                  key={index}
                  sx={{
                    p: 3,
                    bgcolor: 'transparent',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <Box 
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: 'rgba(0, 166, 153, 0.1)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      mb: 2,
                      mx: 'auto'
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    sx={{ 
                      mb: 1,
                      fontWeight: 600,
                      textAlign: 'center',
                      fontSize: '1rem'
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary',
                      lineHeight: 1.5,
                      textAlign: 'center',
                      fontSize: '0.875rem'
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              ))}
              </Box>
              
              {/* Right Side - Image */}
              <Box sx={{ 
                flex: '0 0 40%',
                padding: '10px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '& img': {
                  width: '100%',
                  maxHeight: '600px',
                  objectFit: 'contain',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }
              }}>
                <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
                  <Image 
                    src="/images/employee_commute.png" 
                    alt="Employee Commute"
                    width={600}
                    height={400}
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'cover',
                      borderRadius: '16px'
                    }}
                  />
                </div>
              </Box>
            </Box>

            {/* New Section with Car Image */}
            <Box sx={{ py: 8, bgcolor: '#fff' }}>
              <Typography variant="h2" sx={{ 
                textAlign: 'center', 
                mb: 2,
                fontSize: { xs: '1.8rem', md: '2.5rem' },
                fontWeight: 600,
                color: '#333'
              }}>
                Why Your Website Is Your Best Salesperson
              </Typography>
              <Typography variant="body1" sx={{ 
                textAlign: 'center', 
                mb: 6,
                maxWidth: '600px',
                mx: 'auto',
                color: '#666',
                fontSize: '1.1rem'
              }}>
                Experience comfort and reliability with our premium fleet
              </Typography>

              <Box sx={{ 
                display: 'flex',
                flexDirection: { xs: 'column', lg: 'row' },
                gap: 8,
                alignItems: 'center',
                maxWidth: '1400px',
                margin: '0 auto',
                padding: { xs: '0 30px', md: '0 60px' }
              }}>
                {/* Left Side - Car Image */}
                <Box sx={{ 
                  flex: '0 0 45%',
                  padding: '60px 30px 60px 0',
                  '& img': {
                    width: '100%',
                    maxWidth: '600px',
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                  }
                }}>
                  <div style={{ position: 'relative', width: '100%', height: 'auto', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
                    <Image 
                      src="/images/car_image.png" 
                      alt="Premium Fleet"
                      width={600}
                      height={400}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                </Box>

                {/* Right Side - Features */}
                <Box sx={{ 
                  flex: '0 0 55%',
                  padding: '60px 0 60px 60px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '40px',
                  '& h3': {
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: '#333',
                    lineHeight: 1.3
                  },
                  '& h6': {
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: '#333',
                    lineHeight: 1.4
                  },
                  '& p': {
                    color: '#666',
                    lineHeight: 1.7
                  }
                }}>
                  <Box sx={{ pr: 3, mb: 1 }}>
                    <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', mb: 2, color: '#333', fontWeight: 700, fontSize: '1.75rem' }}>
                      <Box component="span" sx={{ 
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 3,
                        flexShrink: 0
                      }}>
                        <Image 
                          src="/mobile.png" 
                          alt="Hatchbacks & Sedans" 
                          width={40} 
                          height={40} 
                          style={{ width: '40px', height: '40px' }} 
                        />
                      </Box>
                      Hatchbacks & Sedans
                    </Typography>
                  </Box>

                  <Box sx={{ pr: 3, mb: 1 }}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 2, fontSize: '1.5rem', color: '#333', fontWeight: 600 }}>
                      <Box component="span" sx={{ 
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        flexShrink: 0
                      }}>
                        <Image 
                          src="/eye.png" 
                          alt="MUVs & SUVs" 
                          width={36} 
                          height={36} 
                          style={{ width: '36px', height: '36px' }} 
                        />
                      </Box>
                      MUVs & SUVs
                    </Typography>
                  </Box>

                  <Box sx={{ pr: 3, mb: 1 }}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 2, fontSize: '1.5rem', color: '#333', fontWeight: 600 }}>
                      <Box component="span" sx={{ 
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        flexShrink: 0
                      }}>
                        <Image 
                          src="/map.png" 
                          alt="Tempo Travelers" 
                          width={36} 
                          height={36} 
                          style={{ width: '36px', height: '36px' }} 
                        />
                      </Box>
                      Mini & Large Tempo Travelers
                    </Typography>
                  </Box>

                  <Box sx={{ pr: 3, mb: 1 }}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 2, fontSize: '1.5rem', color: '#333', fontWeight: 600 }}>
                      <Box component="span" sx={{ 
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        flexShrink: 0
                      }}>
                        <Image 
                          src="/award.png" 
                          alt="Luxury Coaches" 
                          width={36} 
                          height={36} 
                          style={{ width: '36px', height: '36px' }} 
                        />
                      </Box>
                      Luxury Air-Conditioned Coaches (on request)
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* New Section with Four Feature Boxes */}
            <Box sx={{ py: 8, bgcolor: '#f9f9f9' }}>
              <Container maxWidth="lg">
                <Box sx={{ 
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
                  gap: 4,
                  textAlign: 'center'
                }}>
                  {/* Feature 1 */}
                  <Box sx={{ 
                    p: 4,
                    bgcolor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                    }
                  }}>
                    <Box sx={{ 
                      width: '80px',
                      height: '80px',
                      mx: 'auto',
                      mb: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      bgcolor: 'rgba(0, 166, 153, 0.1)'
                    }}>
                      <Image 
                        src="/user-plus-duotone 1.png" 
                        alt="User Plus" 
                        width={40}
                        height={40}
                        style={{ width: '40px', height: '40px' }} 
                      />
                    </Box>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#333' }}>
                      User-Centric Design
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6 }}>
                      Intuitive interfaces that put your users first, ensuring seamless navigation and engagement.
                    </Typography>
                  </Box>

                  {/* Feature 2 */}
                  <Box sx={{ 
                    p: 4,
                    bgcolor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                    }
                  }}>
                    <Box sx={{ 
                      width: '80px',
                      height: '80px',
                      mx: 'auto',
                      mb: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      bgcolor: 'rgba(0, 166, 153, 0.1)'
                    }}>
                      <Image 
                        src="/package-duotone (1) 1.png" 
                        alt="Package" 
                        width={40}
                        height={40}
                        style={{ width: '40px', height: '40px' }} 
                      />
                    </Box>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#333' }}>
                      All-in-One Solution
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6 }}>
                      Comprehensive packages that cover all your digital needs from design to deployment.
                    </Typography>
                  </Box>

                  {/* Feature 3 */}
                  <Box sx={{ 
                    p: 4,
                    bgcolor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                    }
                  }}>
                    <Box sx={{ 
                      width: '80px',
                      height: '80px',
                      mx: 'auto',
                      mb: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      bgcolor: 'rgba(0, 166, 153, 0.1)'
                    }}>
                      <Image 
                        src="/Notepad.png" 
                        alt="Notepad" 
                        width={40}
                        height={40}
                        style={{ width: '40px', height: '40px' }} 
                      />
                    </Box>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#333' }}>
                      Custom Solutions
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6 }}>
                      Tailored strategies designed specifically for your business goals and requirements.
                    </Typography>
                  </Box>

                  {/* Feature 4 */}
                  <Box sx={{ 
                    p: 4,
                    bgcolor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                    }
                  }}>
                    <Box sx={{ 
                      width: '80px',
                      height: '80px',
                      mx: 'auto',
                      mb: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      bgcolor: 'rgba(0, 166, 153, 0.1)'
                    }}>
                      <Image 
                        src="/package-duotone (1) 1 (1).png" 
                        alt="Package Duo" 
                        width={40}
                        height={40}
                        style={{ width: '40px', height: '40px' }} 
                      />
                    </Box>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#333' }}>
                      Seamless Integration
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6 }}>
                      Smooth integration with your existing systems and workflows for maximum efficiency.
                    </Typography>
                  </Box>
                </Box>
              </Container>
            </Box>
          </Container>
        </Box>

        {/* How It Works Section */}
        <Box sx={{ py: 10, bgcolor: '#f9f9f9' }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography variant="h4" component="h2" sx={{ 
                fontWeight: 700, 
                color: '#333',
                mb: 2,
                position: 'relative',
                display: 'inline-block',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  width: '60px',
                  height: '4px',
                  bottom: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#00A699',
                  borderRadius: '2px'
                }
              }}>
                How It Works
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#666', maxWidth: '800px', mx: 'auto', mt: 3 }}>
                Choose from a wide range of well-maintained vehicles tailored for employee transportation across all business sizes and shift types.
              </Typography>
            </Box>

            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
              gap: 4,
              position: 'relative',
              '&:before': {
                content: '""',
                position: 'absolute',
                top: '60px',
                left: '12.5%',
                right: '12.5%',
                height: '2px',
                backgroundColor: '#00A699',
                display: { xs: 'none', md: 'block' }
              }
            }}>
              {/* Step 1 */}
              <Box sx={{ 
                p: 5, 
                bgcolor: 'white',
                borderRadius: '12px',
                textAlign: 'center',
                position: 'relative',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  transition: 'transform 0.3s ease',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
                }
              }}>
                <Box sx={{
                  width: '80px',
                  height: '80px',
                  mx: 'auto',
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  bgcolor: 'rgba(0, 166, 153, 0.1)'
                }}>
                  <Image 
                    src="/user-plus-duotone 1.png" 
                    alt="Requirement Mapping" 
                    width={40}
                    height={40}
                    style={{ width: '40px', height: '40px' }} 
                  />
                </Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#333' }}>
                  Requirement Mapping
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6 }}>
                  We understand your workforce size, shifts, routes, and security requirements.
                </Typography>
              </Box>

              {/* Step 2 */}
              <Box sx={{ 
                p: 5, 
                bgcolor: 'white',
                borderRadius: '12px',
                textAlign: 'center',
                position: 'relative',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  transition: 'transform 0.3s ease',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
                }
              }}>
                <Box sx={{
                  width: '80px',
                  height: '80px',
                  mx: 'auto',
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  bgcolor: 'rgba(0, 166, 153, 0.1)'
                }}>
                  <Image 
                    src="/package-duotone (1) 1.png" 
                    alt="Deployment Plan" 
                    width={40}
                    height={40}
                    style={{ width: '40px', height: '40px' }} 
                  />
                </Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#333' }}>
                  Deployment Plan
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6 }}>
                  We prepare routing plans, driver assignments, and pickup/drop schedules using AI-based planning tools.
                </Typography>
              </Box>

              {/* Step 3 */}
              <Box sx={{ 
                p: 5, 
                bgcolor: 'white',
                borderRadius: '12px',
                textAlign: 'center',
                position: 'relative',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  transition: 'transform 0.3s ease',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
                }
              }}>
                <Box sx={{
                  width: '80px',
                  height: '80px',
                  mx: 'auto',
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  bgcolor: 'rgba(0, 166, 153, 0.1)'
                }}>
                  <Image 
                    src="/Notepad.png" 
                    alt="Live Execution" 
                    width={40}
                    height={40}
                    style={{ width: '40px', height: '40px' }} 
                  />
                </Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#333' }}>
                  Live Execution
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6 }}>
                  Vehicles are dispatched on time with real-time monitoring and backup protocols.
                </Typography>
              </Box>

              {/* Step 4 */}
              <Box sx={{ 
                p: 5, 
                bgcolor: 'white',
                borderRadius: '12px',
                textAlign: 'center',
                position: 'relative',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  transition: 'transform 0.3s ease',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
                }
              }}>
                <Box sx={{
                  width: '80px',
                  height: '80px',
                  mx: 'auto',
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  bgcolor: 'rgba(0, 166, 153, 0.1)'
                }}>
                  <Image 
                    src="/package-duotone (1) 1 (1).png" 
                    alt="Transparent Billing" 
                    width={40}
                    height={40}
                    style={{ width: '40px', height: '40px' }} 
                  />
                </Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#333' }}>
                  Transparent Billing
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6 }}>
                  Automated trip logs, easy reconciliation, and centralized invoicing.
                </Typography>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Who We Serve Section */}
        <Box sx={{ py: 10, bgcolor: 'white' }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography variant="h4" component="h2" sx={{ 
                fontWeight: 700, 
                color: '#333',
                mb: 2,
                position: 'relative',
                display: 'inline-block',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  width: '60px',
                  height: '4px',
                  bottom: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#00A699',
                  borderRadius: '2px'
                }
              }}>
                Who We Serve
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#666', maxWidth: '800px', mx: 'auto', mt: 3 }}>
                Every ENTREX ride comes with thoughtful in-car provisions to ensure your comfort, safety, and satisfaction.
              </Typography>
            </Box>

            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(5, 1fr)' },
              gap: 3,
              alignItems: 'center',
              justifyItems: 'center',
              px: { xs: 2, sm: 4, md: 0 }
            }}>
              {[
                { icon: '/Frame 1984077396.png', alt: 'IT Companies' },
                { icon: '/Frame 1984077395.png', alt: 'BPO & Call Centers' },
                { icon: '/Frame 1984077397.png', alt: 'Hospitals & Clinics' },
                { icon: '/Frame 1984077399.png', alt: 'Manufacturing Units' },
                { icon: '/Frame 1984077402.png', alt: 'Colleges & Universities' },
                { icon: '/Frame 1984077403.png', alt: 'Business Parks' },
                { icon: '/Frame 1984077404.png', alt: 'Shared Workspaces' },
                { icon: '/Frame 1984077405.png', alt: 'Hotels & Hospitality' },
                { icon: '/Frame 1984077406.png', alt: 'Warehousing & Logistics' },
                { icon: '/Frame 2147225337.png', alt: 'Government & PSU' }
              ].map((item, index) => (
                <Box 
                  key={index}
                  sx={{ 
                    p: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '180px',
                    overflow: 'hidden',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    '&:hover img': {
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  <div style={{ 
                    position: 'relative',
                    width: '80%',
                    height: '80%',
                    transition: 'all 0.3s ease-in-out',
                    cursor: 'pointer'
                  }}>
                    <Image 
                      src={item.icon} 
                      alt={item.alt}
                      fill
                      style={{ 
                        objectFit: 'contain'
                      }} 
                    />
                  </div>
                </Box>
              ))}
            </Box>

            <Box sx={{ textAlign: 'center', mt: 8 }}>
              <Button 
                variant="contained" 
                size="large"
                sx={{
                  background: 'linear-gradient(90deg, #F3AA45 0%, #ED2628 100%)',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  '&:hover': {
                    background: 'linear-gradient(90deg, #F3AA45 0%, #ED2628 100%)',
                    boxShadow: '0 4px 15px rgba(237, 38, 40, 0.4)'
                  }
                }}
              >
                Book Your Journey Now
              </Button>
            </Box>
          </Container>
        </Box>

        {/* Our Clients Section */}
        <Box sx={{ py: 8, bgcolor: '#f9f9f9' }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography variant="h4" component="h2" sx={{ 
                fontWeight: 800, 
                color: '#333',
                mb: 3,
                fontSize: { xs: '1.75rem', md: '2.125rem' },
                lineHeight: 1.2
              }}>
                Trusted by 1500+ popular companies
              </Typography>
              <Typography variant="subtitle1" sx={{ 
                color: '#666', 
                maxWidth: '800px', 
                mx: 'auto', 
                fontSize: '1.1rem',
                lineHeight: 1.6
              }}>
                Every ENTREX ride comes with thoughtful in-car provisions to ensure your comfort, safety, and satisfaction.
              </Typography>
            </Box>

            <Box sx={{ 
              width: '100%',
              maxWidth: '1200px',
              mx: 'auto',
              overflow: 'hidden',
              '&:hover img': {
                filter: 'grayscale(0%)',
                opacity: 1
              }
            }}>
              <div style={{ position: 'relative', width: '100%', height: '100px' }}>
                <Image 
                  src="/Logos.png" 
                  alt="Our Valued Clients"
                  fill
                  style={{
                    objectFit: 'contain',
                    filter: 'grayscale(100%)',
                    opacity: 0.7,
                    transition: 'all 0.5s ease',
                    marginBottom: '40px'
                  }}
                />
              </div>
              <Box sx={{ 
                width: '100%',
                overflow: 'hidden',
                margin: '40px 0',
                '& img': {
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'cover'
                }
              }}>
                <Image 
                  src="/Group 1171276250.png" 
                  alt="Trusted Partners"
                  width={1200}
                  height={400}
                  style={{
                    width: '100%',
                    height: 'auto'
                  }}
                />
              </Box>
            </Box>
          </Container>
        </Box>

        <Box sx={{ py: 10, bgcolor: '#f9f9f9' }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography variant="h3" component="h2" sx={{ 
                fontWeight: 800, 
                color: '#333',
                mb: 2,
                fontSize: { xs: '2rem', md: '2.75rem' },
                lineHeight: 1.2
              }}>
                Frequently Asked Questions (FAQs)
              </Typography>
              <Typography variant="subtitle1" sx={{ 
                color: '#666', 
                maxWidth: '800px', 
                mx: 'auto', 
                fontSize: '1.1rem',
                lineHeight: 1.6
              }}>
                Got questions? We&apos;ve got answers! Find solutions to common queries about our services, processes, and technology.
              </Typography>
            </Box>

            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 4,
              maxWidth: '1200px',
              mx: 'auto'
            }}>
              {/* Left Column */}
              <Box>
                {[
                  {
                    question: 'What is Webflow and why is it the best website builder?',
                    answer: 'Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere.'
                  },
                  {
                    question: 'What is your favorite template from BRIX Templates?',
                    answer: ''
                  },
                  {
                    question: 'How do you clone a template from the Showcase?',
                    answer: ''
                  },
                  {
                    question: 'Why is BRIX Templates the best Webflow agency?',
                    answer: ''
                  },
                  {
                    question: 'When was Webflow officially launched?',
                    answer: ''
                  },
                  {
                    question: 'How do you integrate Jetboost with Webflow?',
                    answer: ''
                  }
                ].map((faq, index) => (
                  <FAQItem key={`left-${index}`} faq={faq} />
                ))}
              </Box>

              {/* Right Column */}
              <Box>
                {[
                  {
                    question: 'What is your favorite template from BRIX Templates?',
                    answer: ''
                  },
                  {
                    question: 'How do you clone a template from the Showcase?',
                    answer: ''
                  },
                  {
                    question: 'What is Webflow and why is it the best website builder?',
                    answer: 'Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere.'
                  },
                  {
                    question: 'Why is BRIX Templates the best Webflow agency?',
                    answer: ''
                  },
                  {
                    question: 'When was Webflow officially launched?',
                    answer: ''
                  },
                  {
                    question: 'How do you integrate Jetboost with Webflow?',
                    answer: ''
                  }
                ].map((faq, index) => (
                  <FAQItem key={`right-${index}`} faq={faq} />
                ))}
              </Box>
            </Box>
          </Container>
        </Box>

        

        {/* Blog Section */}
        <Box sx={{ py: 10, bgcolor: '#fff' }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography variant="h3" component="h2" sx={{ 
                fontWeight: 800, 
                color: '#333',
                mb: 2,
                fontSize: { xs: '2rem', md: '2.75rem' },
                lineHeight: 1.2
              }}>
                News & Updates
              </Typography>
              <Typography variant="subtitle1" sx={{ 
                color: '#666', 
                maxWidth: '800px', 
                mx: 'auto', 
                fontSize: '1.1rem',
                lineHeight: 1.6
              }}>
                Stay updated with our latest articles and industry insights
              </Typography>
            </Box>

            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 4,
              mt: 4
            }}>
              {/* Blog Card 1 */}
              <Box sx={{ 
                bgcolor: 'white',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                }
              }}>
                <Box sx={{ width: '100%', height: '200px', position: 'relative', overflow: 'hidden' }}>
                  <Image 
                    src="/Mask group.png" 
                    alt="Surviving through tough times as a first time SaaS"
                    fill
                    style={{ 
                      objectFit: 'cover'
                    }}
                  />
                </Box>
                <Box sx={{ p: 4 }}>
                  <Typography variant="h6" component="h3" sx={{ 
                    fontWeight: 700, 
                    mb: 1.5,
                    color: '#333',
                    minHeight: '60px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    Surviving through tough times as a first time SaaS…
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: '#666',
                    mb: 2,
                    minHeight: '60px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    Self-service data analytics software that lets you create visually appealing data visualizations and insightful dashboards in minutes.
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Typography variant="caption" sx={{ 
                      color: '#00A699',
                      fontWeight: 600,
                      mr: 2
                    }}>
                      Business
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#999' }}>
                      Oct 3  ·  7 min read
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Blog Card 2 */}
              <Box sx={{ 
                bgcolor: 'white',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                }
              }}>
                <Box sx={{ width: '100%', height: '200px', position: 'relative', overflow: 'hidden' }}>
                  <Image 
                    src="/Image.png" 
                    alt="SaaS customer development and no-code prototypes"
                    fill
                    style={{
                      objectFit: 'cover'
                    }}
                  />
                </Box>
                <Box sx={{ p: 4 }}>
                  <Typography variant="h6" component="h3" sx={{ 
                    fontWeight: 700, 
                    mb: 1.5,
                    color: '#333',
                    minHeight: '60px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    SaaS customer development and no-code prototypes
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: '#666',
                    mb: 2,
                    minHeight: '60px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    Self-service data analytics software that lets you create visually appealing data visualizations and insightful dashboards in minutes.
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Typography variant="caption" sx={{ 
                      color: '#00A699',
                      fontWeight: 600,
                      mr: 2
                    }}>
                      Marketing
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#999' }}>
                      Oct 3  ·  7 min read
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Blog Card 3 */}
              <Box sx={{ 
                bgcolor: 'white',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                }
              }}>
                <Box sx={{ width: '100%', height: '200px', position: 'relative', overflow: 'hidden' }}>
                  <Image 
                    src="/Mask group (1).png" 
                    alt="Highnote Emerges from Stealth with $54 Million in funding"
                    fill
                    style={{
                      objectFit: 'cover'
                    }}
                  />
                </Box>
                <Box sx={{ p: 4 }}>
                  <Typography variant="h6" component="h3" sx={{ 
                    fontWeight: 700, 
                    mb: 1.5,
                    color: '#333',
                    minHeight: '60px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    Highnote Emerges from Stealth with $54 Million in…
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: '#666',
                    mb: 2,
                    minHeight: '60px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    Self-service data analytics software that lets you create visually appealing data visualizations and insightful dashboards in minutes.
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Typography variant="caption" sx={{ 
                      color: '#00A699',
                      fontWeight: 600,
                      mr: 2
                    }}>
                      Analytics
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#999' }}>
                      Oct 3  ·  7 min read
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Contact Form Section */}
        <Box sx={{ py: 10, bgcolor: '#f9f9f9' }}>
          <Container maxWidth="lg">
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 6,
              alignItems: 'center'
            }}>
              {/* Left Side - Contact Info */}
              <Box>
                <Typography variant="h3" sx={{ 
                  fontWeight: 800, 
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  lineHeight: 1.2,
                  mb: 4
                }}>
                  Let&apos;s Talk
                </Typography>
                
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ mb: 4 }}>
                    <Typography sx={{ color: '#000000', mb: 2, fontWeight: 700, fontSize: '1.5rem' }}>Email</Typography>
                    <Typography sx={{ fontSize: '1.3rem', mb: 4, color: '#000000' }}>bookings@entrex.in</Typography>
                    <Typography sx={{ color: '#000000', mb: 3, fontWeight: 700, fontSize: '1.5rem' }}>Socials</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Typography component="a" href="#" sx={{ 
                        color: '#000000', 
                        '&:hover': { color: '#00A699' },
                        display: 'block',
                        textDecoration: 'none',
                        fontSize: '1.25rem',
                        mb: 1.5,
                        fontWeight: 500
                      }}>
                        Instagram
                      </Typography>
                      <Typography component="a" href="#" sx={{ 
                        color: '#000000', 
                        '&:hover': { color: '#00A699' },
                        display: 'block',
                        textDecoration: 'none',
                        fontSize: '1.25rem',
                        mb: 1.5,
                        fontWeight: 500
                      }}>
                        Twitter
                      </Typography>
                      <Typography component="a" href="#" sx={{ 
                        color: '#000000', 
                        '&:hover': { color: '#00A699' },
                        display: 'block',
                        textDecoration: 'none',
                        fontSize: '1.25rem',
                        mb: 1.5,
                        fontWeight: 500
                      }}>
                        Facebook
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Right Side - Contact Form */}
              <Box sx={{ width: '100%' }}>
                <form>
                  {/* Name Field */}
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      label="Name"
                      variant="outlined"
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          '& fieldset': {
                            borderColor: '#E0E0E0',
                          },
                          '&:hover fieldset': {
                            borderColor: '#B0B0B0',
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Email Field */}
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      variant="outlined"
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          '& fieldset': {
                            borderColor: '#E0E0E0',
                          },
                          '&:hover fieldset': {
                            borderColor: '#B0B0B0',
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Service Interested In */}
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      select
                      fullWidth
                      label="What service are you interested in"
                      variant="outlined"
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          '& fieldset': {
                            borderColor: '#E0E0E0',
                          },
                          '&:hover fieldset': {
                            borderColor: '#B0B0B0',
                          },
                        },
                      }}
                    >
                      <MenuItem value="">Select a service</MenuItem>
                      <MenuItem value="service1">Service 1</MenuItem>
                      <MenuItem value="service2">Service 2</MenuItem>
                      <MenuItem value="service3">Service 3</MenuItem>
                    </TextField>
                  </Box>

                  {/* Project Type */}
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      select
                      fullWidth
                      label="Select project type"
                      variant="outlined"
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          '& fieldset': {
                            borderColor: '#E0E0E0',
                          },
                          '&:hover fieldset': {
                            borderColor: '#B0B0B0',
                          },
                        },
                      }}
                    >
                      <MenuItem value="">Select project type</MenuItem>
                      <MenuItem value="type1">Type 1</MenuItem>
                      <MenuItem value="type2">Type 2</MenuItem>
                    </TextField>
                  </Box>

                  {/* Project Budget */}
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      select
                      fullWidth
                      label="Budget"
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          '& fieldset': {
                            borderColor: '#E0E0E0',
                          },
                          '&:hover fieldset': {
                            borderColor: '#B0B0B0',
                          },
                        },
                      }}
                    >
                      <MenuItem value="">Select budget range</MenuItem>
                      <MenuItem value="under-5k">Under $5,000</MenuItem>
                      <MenuItem value="5k-10k">$5,000 - $10,000</MenuItem>
                      <MenuItem value="10k-25k">$10,000 - $25,000</MenuItem>
                      <MenuItem value="25k-50k">$25,000 - $50,000</MenuItem>
                      <MenuItem value="50k-plus">$50,000+</MenuItem>
                    </TextField>
                  </Box>

                  {/* Message */}
                  <Box sx={{ mb: 4 }}>
                    <TextField
                      fullWidth
                      label="Message"
                      variant="outlined"
                      multiline
                      rows={4}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          '& fieldset': {
                            borderColor: '#E0E0E0',
                          },
                          '&:hover fieldset': {
                            borderColor: '#B0B0B0',
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{
                      py: 1.5,
                      borderRadius: '12px',
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontWeight: 600,
                      backgroundColor: '#000000',
                      '&:hover': {
                        opacity: 0.9,
                        backgroundColor: '#333333',
                      }
                    }}
                  >
                    Submit
                  </Button>
                </form>
              </Box>
            </Box>
          </Container>
        </Box>
        
        {/* Footer */}
        <Box component="footer" sx={{ bgcolor: 'white', borderTop: '1px solid #EBEBEB', py: 6, mt: 'auto' }}>
          <Container maxWidth="lg">
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
              gap: 4,
              mb: 6
            }}>
              <Box>
              <Box 
                component="img"
                src="/Background (3) 1.png"
                alt="ENTREX Logo"
                sx={{ 
                  height: 40,
                  width: 'auto',
                  mb: 2,
                  objectFit: 'contain'
                }}
              />
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                Seamless, Safe, and Smart Commute Solutions for Your Workforce
              </Typography>
            </Box>
            
            {[
              {
                title: 'Company',
                links: ['About Us', 'Careers', 'Press', 'Blog']
              },
              {
                title: 'Support',
                links: ['Help Center', 'Safety Information', 'Cancellation Options', 'Report Issue']
              },
              {
                title: 'Legal',
                links: ['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Accessibility']
              }
            ].map((column, colIndex) => (
              <Box key={colIndex}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                  {column.title}
                </Typography>
                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Box 
                        component="a" 
                        href="#" 
                        sx={{
                          color: 'text.secondary',
                          textDecoration: 'none',
                          display: 'block',
                          py: 1,
                          '&:hover': {
                            color: 'primary.main'
                          }
                        }}
                      >
                        {link}
                      </Box>
                    </li>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
          
          <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 4, mt: 4 }}>
            <Typography variant="body2" color="text.secondary" align="center">
              © {new Date().getFullYear()} ENTREX. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
    </ThemeProvider>
  );
}

export default Home;
