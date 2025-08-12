import React from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Alert, 
  InputAdornment,
  CircularProgress
} from '@mui/material';
import useBookingForm from '../hooks/useBookingForm';

const initialFormState = {
  fullName: '',
  phoneNumber: '',
  email: '',
  date: '',
  time: '12:00',
  adults: 1,
  children: 0,
  message: ''
};

const BookingForm = ({ onSuccess }) => {
  const {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    handleChange,
    handleSubmit,
    resetForm
  } = useBookingForm(initialFormState, onSuccess);

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Status Message */}
      {submitStatus.message && (
        <Alert 
          severity={submitStatus.success ? 'success' : 'error'}
          sx={{ mb: 2 }}
        >
          {submitStatus.message}
        </Alert>
      )}

      {/* Name and Phone Row */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        {/* Full Name */}
        <Box sx={{ flex: 1 }}>
          <TextField
            fullWidth
            name="fullName"
            label="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            error={!!errors.fullName}
            helperText={errors.fullName}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
              },
            }}
          />
        </Box>

        {/* Phone Number */}
        <Box sx={{ flex: 1 }}>
          <TextField
            fullWidth
            name="phoneNumber"
            label="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
              },
            }}
          />
        </Box>
      </Box>

      {/* Email */}
      <Box>
        <TextField
          fullWidth
          name="email"
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
            },
          }}
        />
      </Box>

      {/* Date and Time */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <TextField
            fullWidth
            name="date"
            label="Select Date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            error={!!errors.date}
            helperText={errors.date}
            required
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
              },
            }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <TextField
            fullWidth
            name="time"
            label="Select Time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            error={!!errors.time}
            helperText={errors.time}
            required
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
              },
            }}
          />
        </Box>
      </Box>

      {/* Passengers */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <TextField
            fullWidth
            name="adults"
            label="Adults"
            type="number"
            value={formData.adults}
            onChange={handleChange}
            error={!!errors.adults}
            helperText={errors.adults}
            required
            inputProps={{ min: 1, max: 20 }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
              },
            }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <TextField
            fullWidth
            name="children"
            label="Children"
            type="number"
            value={formData.children}
            onChange={handleChange}
            error={!!errors.children}
            helperText={errors.children}
            inputProps={{ min: 0 }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
              },
            }}
          />
        </Box>
      </Box>

      {/* Message */}
      <Box>
        <TextField
          fullWidth
          name="message"
          label="Message"
          multiline
          rows={3}
          value={formData.message}
          onChange={handleChange}
          error={!!errors.message}
          helperText={errors.message}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
            },
          }}
        />
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button
          type="button"
          variant="outlined"
          size="large"
          fullWidth
          onClick={resetForm}
          disabled={isSubmitting}
          sx={{
            py: 1.5,
            borderRadius: '12px',
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            borderColor: '#000000',
            color: '#000000',
            '&:hover': {
              borderColor: '#000000',
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          Reset
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={isSubmitting}
          sx={{
            py: 1.5,
            borderRadius: '12px',
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            background: 'linear-gradient(90deg, #F3AA45 0%, #ED2628 100%)',
            '&:hover': {
              opacity: 0.9,
            },
            '&.Mui-disabled': {
              background: '#e0e0e0',
            },
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Let's book now"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default BookingForm;
