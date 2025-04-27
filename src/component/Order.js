import React, { useState } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Order() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, totalPrice } = location.state || { cartItems: [], totalPrice: 0 };

  const [nicNumber, setNicNumber] = useState('');
  const [customerId, setCustomerId] = useState(''); // New state for Customer ID
  const [shippingAddress, setShippingAddress] = useState('');
  const [nicError, setNicError] = useState('');
  const [error, setError] = useState('');
  const [userExists, setUserExists] = useState(true);

  // Handle NIC number changes
  const handleNicChange = (e) => {
    setNicNumber(e.target.value);
    setNicError('');
    setCustomerId(''); // Clear Customer ID when NIC changes
    setShippingAddress(''); // Clear Address when NIC changes
  };

  // Handle Address input changes
  const handleAddressChange = (e) => {
    setShippingAddress(e.target.value);
  };

  // Check NIC number in the database and fetch Customer ID and Address
  const checkNIC = async () => {
    if (!nicNumber.trim()) {
      setNicError('NIC number is required');
      return;
    }

    if (!/^[0-9]{9}[Vv]?$/.test(nicNumber) && !/^[0-9]{12}$/.test(nicNumber)) {
      setNicError('Invalid NIC format');
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/customers/findByNic?nic=" + nicNumber);
      if (response.ok) {
        const data = await response.json();
        setCustomerId(data.id); // Set Customer ID from the response
        setShippingAddress(data.address); // Set Address from the response
        setUserExists(true);
      } else {
        setUserExists(false); // NIC not found in the database
        setCustomerId(''); // Clear Customer ID
        setShippingAddress(''); // Clear Address
      }
    } catch (error) {
      console.error('Error fetching customer details:', error);
      setUserExists(false);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!userExists) {
      alert('NIC number not found. Please register before placing an order.');
      return;
    }

    if (!shippingAddress.trim()) {
      setError('Shipping address is required');
      return;
    }

    navigate('/Payment', {
      state: { cartItems, totalPrice, nicNumber, customerId, shippingAddress },
    });
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
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'center',
          marginLeft: '50px',
        }}
        noValidate
        autoComplete="off"
      >
        {/* Headline */}
        <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px', marginTop: '20px' }}>
          Order Details
        </Typography>

        {/* NIC Number Input */}
        <TextField
          id="nicNumber"
          label="NIC Number"
          value={nicNumber}
          onChange={handleNicChange}
          onBlur={checkNIC} // Call function when user enters NIC and moves out of input field
          error={!!nicError}
          helperText={nicError}
          sx={{ width: '500px', marginBottom: '20px' }}
        />

        {/* Customer ID Input */}
        <TextField
          id="customerId"
          label="Customer ID"
          value={customerId}
          InputProps={{ readOnly: true }} // Customer ID field is read-only
          sx={{ width: '500px', marginBottom: '20px' }}
        />

        {/* Shipping Address Input */}
        <TextField
          id="shippingAddress"
          label="Shipping Address"
          value={shippingAddress}
          onChange={handleAddressChange}
          error={!!error}
          helperText={error}
          disabled={!userExists} // Disable if user is not found in DB
          sx={{ width: '500px', marginBottom: '20px' }}
        />

        {/* Error message if NIC is not found */}
        {!userExists && (
          <Typography variant="body1" sx={{ textAlign: 'center', color: 'red', fontWeight: 'bold', marginBottom: '20px' }}>
            NIC not found. Please register before placing an order.<a href="/customer-register" style={{ color: 'blue', textDecoration: 'underline' }}> Register </a>
          </Typography>
        )}

        {/* Cash on Delivery Note */}
        <Typography variant="body1" sx={{ textAlign: 'center', color: 'red', fontWeight: 'bold', marginBottom: '20px' }}>
          Note: This shop only accepts cash on delivery.
        </Typography>

        {/* Submit Button */}
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!userExists} // Disable order if NIC is not found
          sx={{
            width: '300px',
            marginTop: '20px',
            marginBottom: '20px',
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