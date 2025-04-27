import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

export default function CustomerRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
    nic: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const params = new URLSearchParams({
            name: formData.name,
            address: formData.address, 
            email: formData.email,
            contact: formData.contact,
            nic: formData.nic,
      }).toString();
      console.log(params);

      const response = await fetch('http://localhost:8080/api/customers?' + params, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        alert('Customer registered successfully!');
        setFormData({ name: '', email: '', contact: '', address: '', nic: '' }); // Reset form
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.error || 'Unknown error occurred';
        
        alert('Error registering customer: ' + errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '100%',
        margin: '0 auto',
        height: '100vh',
      }}
    >
      {/* Left Side - Registration Form */}
      <Box
        sx={{
          marginRight:"30px",
          marginLeft:"30px",
          width: '50%',
          padding: 4,
          borderRadius: '15px',
          backgroundColor: 'white',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px', color: '#333', fontWeight: 'bold' }}>
          Customer Registration
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: '80%' }}>
          {['name', 'email', 'contact', 'address', 'nic'].map((field) => (
            <TextField
              key={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              type={field === 'email' ? 'email' : 'text'}
              value={formData[field]}
              onChange={handleChange}
              fullWidth
              required={field !== 'address'} // Address is optional
              margin="normal"
              InputProps={{ style: { color: '#333' } }} // Darker input text
              InputLabelProps={{ style: { color: '#555' } }} // Darker label text
              sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
            />
          ))}

          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#800000',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#600000',
                },
                width: '200px',
              }}
            >
              Register
            </Button>
          </Box>

          <Typography sx={{ textAlign: 'center', marginTop: '15px', color: '#555' }}>
            Already have an account? <a href="/login" style={{ color: '#800000', textDecoration: 'none' }}>Login here</a>
          </Typography>
        </form>
      </Box>

      {/* Right Side - Welcome Message */}
      <Box
        sx={{
          marginRight:"30px",
          marginLeft:"30px",
          width: '50%',
          height: '700px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          //background: 'linear-gradient(135deg, #6A0DAD, #520D74)',
          background: 'linear-gradient(135deg, #800000, #600000)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Welcome To</Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: 1 }}>Urban Food</Typography>
          <Typography sx={{ marginTop: 2 }}>Join us today and explore the finest products at unbeatable prices.</Typography>
        </Box>
      </Box>
    </Box>
  );
}
