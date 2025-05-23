import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCart } from '../component/CartContext'; // Import CartContext hook

export default function Vegetable() {
  const { addToCart } = useCart(); // Access addToCart from CartContext
  const [itemData, setItemData] = React.useState([]);
  const [filteredVegetables, setFilteredVegetables] = React.useState([]);


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
        const vegetables = data.filter(item => item.category === 'Vegetables');
        setFilteredVegetables(vegetables);
      })
      .catch(error => {
        console.error('Error fetching Vegetables:', error);
      });
    }, []);


  return (
    <>
      {/* Top image */}
      <img
        src="/images/vegi6.jpg"
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
        {filteredVegetables.map((item, index) => (
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
                    // Pass only vegetable name and price to the cart
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

// const itemData = [
//   {
//     img: '/images/carrot1.png',
//     title: 'Carrots',
//     author: '@bkristastucchio',
//   },
//   {
//     img: '/images/tomato2.jpg',
//     title: 'Tomatos',
//     author: '@rollelflex_graphy726',
//   },
//   {
//     img: '/images/pumpkin2.webp',
//     title: 'Pumpkin',
//     author: '@helloimnik',
//   },
//   {
//     img: '/images/beetrut1.jpeg',
//     title: 'Beetroot',
//     author: '@nolanissac',
//   },
//   {
//     img: '/images/cucumber1.jpg',
//     title: 'Cucumber',
//     author: '@hjrc33',
//   },
//   {
//     img: '/images/potato3.webp',
//     title: 'Potatos',
//     author: '@arwinneil',
//   },
//   {
//     img: '/images/eggplant1.jpg',
//     title: 'Brinjal',
//     author: '@tjdragotta',
//   },
//   {
//     img: '/images/Cabbage1.webp',
//     title: 'Cabbage',
//     author: '@katie_wasserman',
//   },
// ];

