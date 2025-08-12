import { API_BASE_URL } from '../config';

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.message || 'Something went wrong');
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
};

// Submit a new booking
export const submitBooking = async (bookingData) => {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  });
  return handleResponse(response);
};

// Get all bookings
export const getBookings = async () => {
  const response = await fetch(`${API_BASE_URL}/bookings`);
  return handleResponse(response);
};
