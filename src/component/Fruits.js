import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCart } from '../component/CartContext'; // Import the CartContext hook
import axios from 'axios';

export default function Fruits() {
  const { addToCart } = useCart(); // Access addToCart from CartContext
  const [itemData, setItemData] = React.useState([]);
  const [filteredFruits, setFilteredFruits] = React.useState([]);

React.useEffect(() => {
  fetch('http://localhost:8080/api/products')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    })
    .then(data => {
      console.log(data)
      setItemData(data);
      const fruits = data.filter(item => item.category === 'Fruits');
      setFilteredFruits(fruits);
    })
    .catch(error => {
      console.error('Error fetching fruits:', error);
    });
  }, []);


  return (
    <>
      {/* Top image */}
      <img
        src="/images/fruit4.jpg"
        alt="Top Banner"
        style={{ width: '100%', height: '500px', objectFit: 'cover' }}
      />

      {/* Image list with descriptions */}
      <ImageList
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)', // 3 items per row
          gap: '20px', // spacing between items
          width: '95%',
          margin: '50px auto',
        }}
      >
        {filteredFruits.map((item) => (
          <Box
            key={item.img}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '20px',
              border: '1px solid lightgray',
              padding: '10px',
              borderRadius: '10px',
            }}
          >
            {/* Image */}
            <ImageListItem sx={{ width: '250px', height: '250px' }}>
              <img
                src={`${item.imageUrl}?w=248&fit=crop&auto=format`}
                alt={item.name}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </ImageListItem>

            {/* Description */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Typography variant="body1"><strong>Food Name:</strong> {item.name}</Typography>
              <Typography variant="body1"><strong>Category:</strong> {item.category}</Typography>
              <Typography variant="body1"><strong>Price:</strong> {item.price}</Typography>
              <Typography variant="body1"><strong>Stock:</strong> {item.stockQuantity > 0 ? 'Available' : 'Unavailable'}</Typography>
              
              {/* Add to Cart Button */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '10px',
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    width: '150px',
                    color: 'white',
                    backgroundColor: 'gray',
                  }}
                  onClick={() => {
                    // Pass only name and price to the cart
                    addToCart({ name: item.name, price: item.price });

                    // Show alert message
                    alert(`${item.name} has been added to the cart!`);
                  
                  }}
                >
                  Add Cart
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </ImageList>
    </>
  );
}

// const filteredFruits = [
//   {
//     img: '/images/Strabery2.jpg',
//     title: 'Strawberry',
//     author: '@bkristastucchio',
//   },
//   {
//     img: '/images/Apple1.webp',
//     title: 'Apple',
//     author: '@rollelflex_graphy726',
//   },
//   {
//     img: '/images/Banana1.jpeg',
//     title: 'Banana',
//     author: '@helloimnik',
//   },
//   {
//     img: '/images/Pineapple1.jpg',
//     title: 'Pineapple',
//     author: '@nolanissac',
//   },
//   {
//     img: '/images/Graps2.jpeg',
//     title: 'Grapes',
//     author: '@hjrc33',
//   },
//   {
//     img: '/images/watermelon1.jpg',
//     title: 'Watermelon',
//     author: '@arwinneil',
//   },
//   {
//     img: '/images/manago1.jpg',
//     title: 'Mango',
//     author: '@tjdragotta',
//   },
//   {
//     img: '/images/Orange1.png',
//     title: 'Orange',
//     author: '@katie_wasserman',
//   },
// ];
