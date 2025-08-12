import { useState } from 'react';
import { submitBooking } from '../services/api';

export const useBookingForm = (initialState, onSubmitSuccess) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: null,
    message: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Required fields validation
    const requiredFields = ['fullName', 'phoneNumber', 'email', 'date', 'time', 'adults'];
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
        isValid = false;
      }
    });

    // Email format validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Phone number validation (basic)
    if (formData.phoneNumber && !/^[0-9\-\+\s()]*$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
      isValid = false;
    }

    // Date validation (not in the past)
    if (formData.date) {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = 'Date cannot be in the past';
        isValid = false;
      }
    }

    // Number of adults validation
    if (formData.adults && (isNaN(formData.adults) || formData.adults < 1 || formData.adults > 20)) {
      newErrors.adults = 'Number of adults must be between 1 and 20';
      isValid = false;
    }

    // Number of children validation
    if (formData.children && (isNaN(formData.children) || formData.children < 0)) {
      newErrors.children = 'Number of children cannot be negative';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ success: null, message: '' });

    try {
      // Format data for API
      const bookingData = {
        ...formData,
        adults: parseInt(formData.adults),
        children: parseInt(formData.children) || 0,
        date: new Date(formData.date).toISOString()
      };

      const response = await submitBooking(bookingData);
      
      setSubmitStatus({
        success: true,
        message: 'Booking submitted successfully!'
      });
      
      // Reset form on successful submission
      setFormData(initialState);
      
      // Call the success callback if provided
      if (onSubmitSuccess) {
        onSubmitSuccess(response.data);
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      
      // Handle validation errors from the server
      if (error.status === 400 && error.data?.errors) {
        const serverErrors = {};
        error.data.errors.forEach(err => {
          serverErrors[err.param] = err.msg;
        });
        setErrors(serverErrors);
      }
      
      setSubmitStatus({
        success: false,
        message: error.message || 'Failed to submit booking. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
    setSubmitStatus({ success: null, message: '' });
  };

  return {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    handleChange,
    handleSubmit,
    resetForm,
    setFormData
  };
};

export default useBookingForm;
