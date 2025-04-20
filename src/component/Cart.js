import React from 'react';
import { useCart } from '../component/CartContext'; // Import the Cart context
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart(); // Access global cart state and functions
  const navigate = useNavigate(); // Initialize useNavigate for routing

  // Calculate the total cost of items in the cart
  const getTotalCost = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        gap: 3,
        maxWidth: '100%',
        margin: '0 auto',
        backgroundImage: `url('/images/c3.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          width: '90%',
          maxWidth: '900px',
          padding: 4,
          borderRadius: '15px',
          backgroundColor: 'rgba(206, 205, 205, 0.7)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* Cart Headline */}
        <Typography variant="h3" sx={{ textAlign: 'center', marginBottom: '20px', color: 'Black' }}>
          Your Cart
        </Typography>

        {/* Cart Table */}
        <TableContainer component={Paper} sx={{ opacity: 0.9 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Item Name</strong></TableCell>
                <TableCell align="right"><strong>Price ($)</strong></TableCell>
                <TableCell align="right"><strong>Quantity</strong></TableCell>
                <TableCell align="right"><strong>Total ($)</strong></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="right">{item.price}</TableCell>
                  <TableCell align="right">
                    <TextField
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.name, Math.max(1, Number(e.target.value)))
                      }
                      InputProps={{ inputProps: { min: 1 } }}
                    />
                  </TableCell>
                  <TableCell align="right">{item.price * item.quantity}</TableCell>
                  <TableCell align="right">
                    <Button variant="outlined" color="error" onClick={() => removeFromCart(item.name)}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Total Cost and Checkout Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: '10px',
          }}
        >
          <Typography variant="h5" sx={{ color: 'Black' }}>
            Total Cost: ${getTotalCost().toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'maroon',
              color: 'white',
              '&:hover': {
                backgroundColor: '#800000',
              },
            }}
            onClick={() =>
              navigate('/Order', {
                state: { cartItems, totalPrice: getTotalCost() },
              })
            } // Pass cart data and total price to Order page
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
