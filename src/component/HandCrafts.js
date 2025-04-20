import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCart } from '../component/CartContext'; // Import CartContext hook

export default function HandCrafts() {
  const { addToCart } = useCart(); // Access addToCart from CartContext

  return (
    <>
      {/* Top image */}
      <img
        src="/images/HandCrafts2.jpg"
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
        {itemData.map((item, index) => (
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
                src={`${item.img}?w=248&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </ImageListItem>

            {/* Description */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Typography variant="body1"><strong>Food Name:</strong> {item.title}</Typography>
              <Typography variant="body1"><strong>Category:</strong> Hand Crafts</Typography>
              <Typography variant="body1"><strong>Price:</strong> $10.99</Typography>
              <Typography variant="body1"><strong>Stock:</strong> Available</Typography>
              
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
                    // Pass only the name and price to the cart
                    addToCart({ name: item.title, price: 10.99 });

                    // Show alert message
                    alert(`${item.title} has been added to the cart!`);
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

const itemData = [
  {
    img: '/images/Pottery1.jpg',
    title: 'Pottery',
    author: '@bkristastucchio',
  },
  {
    img: '/images/spoon2.jpg',
    title: 'Spoons',
    author: '@rollelflex_graphy726',
  },
  {
    img: '/images/hat3.jpeg',
    title: 'Crochet Hat',
    author: '@helloimnik',
  },
  {
    img: '/images/scarf1.jpeg',
    title: 'Crochet Scarf',
    author: '@nolanissac',
  },
  {
    img: '/images/candles1.webp',
    title: 'Brownies',
    author: '@hjrc33',
  },
  {
    img: '/images/soap4.jpg',
    title: 'Soap',
    author: '@arwinneil',
  },
  {
    img: '/images/bag1.jpg',
    title: 'Leather Bag',
    author: '@tjdragotta',
  },
  {
    img: '/images/rugs1.jpg',
    title: 'handwoven rugs',
    author: '@katie_wasserman',
  },
];

