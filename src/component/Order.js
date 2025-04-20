import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation
import { useState } from 'react'; // Import useState for validation

export default function Order() {
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Access passed data from CartPage
  const { cartItems, totalPrice } = location.state || { cartItems: [], totalPrice: 0 }; // Retrieve state

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    no: '',
    city: '',
    street: '',
  }); // Store form values

  const [errors, setErrors] = useState({}); // Store validation errors

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Validate fields
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits';
    if (!formData.no) newErrors.no = 'House/Apartment No is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.street) newErrors.street = 'Street is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validate()) {
      // Navigate to Payment page if validation passes
      navigate('/Payment', {
        state: { cartItems, totalPrice },
      });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        padding: 2,
      }}
    >
      {/* Left-side image */}
      <img
        src="/images/order1.jpg"
        alt="Order Placeholder"
        style={{
          width: '40%',
          height: '90vh',
          objectFit: 'cover',
          borderRadius: '10px',
        }}
      />

      {/* Right-side form */}
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)', // Two columns for text fields
          gap: 2,
          alignItems: 'center',
          marginLeft: '50px',
        }}
        noValidate
        autoComplete="off"
      >
        {/* Headline */}
        <Typography
          variant="h4"
          sx={{
            gridColumn: 'span 2',
            textAlign: 'center',
            marginBottom: '20px',
          }}
        >
          Delivery Details
        </Typography>

        {/* Delivery Details Section */}
        <TextField
          id="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          id="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          id="phone"
          label="Phone No"
          value={formData.phone}
          onChange={handleChange}
          error={!!errors.phone}
          helperText={errors.phone}
        />
        <TextField
          id="no"
          label="No"
          value={formData.no}
          onChange={handleChange}
          error={!!errors.no}
          helperText={errors.no}
        />
        <TextField
          id="city"
          label="City"
          value={formData.city}
          onChange={handleChange}
          error={!!errors.city}
          helperText={errors.city}
        />
        <TextField
          id="street"
          label="Street"
          value={formData.street}
          onChange={handleChange}
          error={!!errors.street}
          helperText={errors.street}
        />

        {/* Button */}
        <Button
          variant="contained"
          onClick={handleSubmit} // Call handleSubmit on button click
          sx={{
            gridColumn: 'span 2',
            marginTop: '20px',
            backgroundColor: 'maroon',
            color: 'white',
            '&:hover': {
              backgroundColor: '#800000',
            },
          }}
        >
          Add Order
        </Button>
      </Box>
    </Box>
  );
}
