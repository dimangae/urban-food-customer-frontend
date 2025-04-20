import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Button from '@mui/material/Button';

export default function Home() {
  const navigate = useNavigate(); // Initialize navigation function

  return (
    <>
      {/* Top image */}
      <img
        src="/images/logo1.jpg"
        alt="Top Banner"
        style={{ width: '100%', height: '500px', objectFit: 'cover' }}
      />
      
      <ImageList sx={{ width: "95%", height: 500, margin: "50px", marginRight: "0px", marginLeft: "70px" }}>
        {itemData.map((item) => (
          <ImageListItem key={item.img} sx={{ width: "500px", height: 500, margin: "50px", marginRight: "20px" }}>
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              position="below"
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '10px',
              }}
            >
              <Button
                variant="contained"
                sx={{
                  width: "250px",
                  color: "white",
                  backgroundColor: "gray",
                }}
                onClick={() => {
                  if (item.title === 'Fruits') {
                    navigate('/fruits'); // Navigate to Fruits page
                  } else if (item.title === 'Vegetables') {
                    navigate('/vegetable'); // Navigate to Vegetable page
                  } else if (item.title === 'Dairy Product') {
                    navigate('/dairyProduct'); // Navigate to DairyProduct page
                  } else if (item.title === 'Baked Goods') {
                    navigate('/bakedGoods'); // Navigate to BakedGoods page
                  } else if (item.title === 'Hand Crafts') {
                    navigate('/handCrafts'); // Navigate to BakedGoods page
                  } else {
                    alert(`You clicked on ${item.title}`);
                  }
                }}
              >
                View More
              </Button>
            </div>
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}

const itemData = [
  {
    img: '/images/fruits.jpg',
    title: 'Fruits',
    author: '@bkristastucchio',
  },
  {
    img: '/images/vegi.jpg',
    title: 'Vegetables',
    author: '@rollelflex_graphy726',
  },
  {
    img: '/images/Dairy1.jpg',
    title: 'Dairy Product',
    author: '@helloimnik',
  },
  {
    img: '/images/bread.jpg',
    title: 'Baked Goods',
    author: '@nolanissac',
  },
  {
    img: '/images/hand.webp',
    title: 'Hand Crafts',
    author: '@hjrc33',
  },
];

