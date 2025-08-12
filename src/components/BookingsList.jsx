import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Chip,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  IconButton
} from '@mui/material';
import { getBookings } from '../services/api';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

const statusColors = {
  pending: 'default',
  confirmed: 'success',
  cancelled: 'error'
};

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await getBookings();
        setBookings(response.data || []);
        setError('');
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to load bookings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setIsViewDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsViewDialogOpen(false);
    setSelectedBooking(null);
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'PPp');
    } catch (error) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Booking Submissions
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => router.push('/')}
          sx={{ textTransform: 'none' }}
        >
          Back to Booking Form
        </Button>
      </Box>

      {bookings.length === 0 ? (
        <Alert severity="info">No bookings found. Submit a new booking to see it here.</Alert>
      ) : (
        <TableContainer component={Paper} elevation={2}>
          <Table sx={{ minWidth: 650 }} aria-label="bookings table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Date & Time</TableCell>
                <TableCell>Passengers</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking._id} hover>
                  <TableCell>{booking.fullName}</TableCell>
                  <TableCell>{booking.email}</TableCell>
                  <TableCell>
                    {formatDate(booking.date)}<br />
                    <small>{booking.time}</small>
                  </TableCell>
                  <TableCell>
                    {booking.adults} Adult{booking.adults !== 1 ? 's' : ''}
                    {booking.children > 0 && `, ${booking.children} Child${booking.children !== 1 ? 'ren' : ''}`}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      color={statusColors[booking.status] || 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="small" 
                      onClick={() => handleViewBooking(booking)}
                      sx={{ textTransform: 'none' }}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Booking Details Dialog */}
      <Dialog 
        open={isViewDialogOpen} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        {selectedBooking && (
          <>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogContent dividers>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">Full Name</Typography>
                  <Typography>{selectedBooking.fullName}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">Email</Typography>
                  <Typography>{selectedBooking.email}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">Phone</Typography>
                  <Typography>{selectedBooking.phoneNumber}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">Date</Typography>
                  <Typography>{formatDate(selectedBooking.date)}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">Time</Typography>
                  <Typography>{selectedBooking.time}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">Passengers</Typography>
                  <Typography>
                    {selectedBooking.adults} Adult{selectedBooking.adults !== 1 ? 's' : ''}
                    {selectedBooking.children > 0 && `, ${selectedBooking.children} Child${selectedBooking.children !== 1 ? 'ren' : ''}`}
                  </Typography>
                </Box>
                <Box gridColumn="1 / -1">
                  <Typography variant="subtitle2" color="textSecondary">Message</Typography>
                  <Typography>{selectedBooking.message || 'No message provided'}</Typography>
                </Box>
                <Box gridColumn="1 / -1">
                  <Typography variant="subtitle2" color="textSecondary">Status</Typography>
                  <Chip 
                    label={selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                    color={statusColors[selectedBooking.status] || 'default'}
                    size="small"
                  />
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default BookingsList;
