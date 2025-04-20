import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useLocation } from 'react-router-dom'; // Import useLocation to access passed state

export default function PaymentPage() {
  const location = useLocation(); // Access passed state
  const { cartItems, totalPrice } = location.state || { cartItems: [], totalPrice: 0 }; // Extract passed state data

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height
        backgroundImage: `url('/images/pay3.jpg')`, // Set background image
        backgroundSize: 'cover', // Ensure the image covers the entire container
        backgroundPosition: 'center', // Center the image
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Transparent Content Box */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          padding: 4,
          width: '50%',
          borderRadius: '10px',
          backgroundColor: 'rgba(217, 217, 217, 0.8)', // Semi-transparent white background
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
          overflowY: 'auto', // In case of long forms, adds scrolling
        }}
      >
        {/* Headline */}
        <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '10px' }}>
          Payment Details
        </Typography>

        {/* Order Summary */}
        <Box sx={{ width: '100%', textAlign: 'center', marginBottom: '10px' }}>
          <Typography variant="h6">Order Summary</Typography>
          {cartItems.map((item, index) => (
            <Typography key={index} variant="body1">
              <strong>{item.name}</strong> - {item.quantity} x ${item.price} = ${item.price * item.quantity}
            </Typography>
          ))}
          <Typography variant="body1" sx={{ fontWeight: 'bold', marginTop: '10px' }}>
            Total Price: ${totalPrice.toFixed(2)}
          </Typography>
        </Box>

        <Divider sx={{ width: '100%', marginBottom: '10px' }} />

        {/* Confirm Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'maroon',
            color: 'white',
            '&:hover': {
              backgroundColor: '#800000',
            },
            marginTop: '10px',
          }}
          fullWidth
        >
          Confirm Payment
        </Button>
      </Box>
    </Box>
  );
}

