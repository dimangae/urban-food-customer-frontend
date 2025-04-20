import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

export default function RatingPage() {
  const [value, setValue] = React.useState(3.5); // Allow user to select rating
  const [hover, setHover] = React.useState(-1); // Handle hover

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        padding: 4,
        maxWidth: '100%',
        margin: '0 auto',
      }}
    >
      {/* Left-side Image */}
      <img
        src="/images/urbanfood1.png"
        alt="Rating Page"
        style={{
          width: '50%',
          height: '100vh',
          objectFit: 'cover',
          borderRadius: '10px',
        }}
      />

      {/* Right-side Rating and Feedback Form */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
          gap: 3,
          width: '50%',
          border: '1px solid lightgray',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Headline */}
        <Typography
          variant="h4"
          sx={{ textAlign: 'center', marginBottom: '20px' }}
        >
          Rate Your Experience
        </Typography>

        {/* Rating Component */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Rating
            name="text-feedback"
            value={value}
            precision={0.5}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
          <Typography>{labels[hover !== -1 ? hover : value]}</Typography>
        </Box>

        {/* Feedback Textarea */}
        <TextField
          id="feedback-text"
          label="Write your feedback"
          multiline
          rows={4}
          placeholder="Your feedback helps us improve!"
          fullWidth
        />

        {/* Submit Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'maroon',
            color: 'white',
            '&:hover': {
              backgroundColor: '#800000',
            },
          }}
        >
          Submit Feedback
        </Button>
      </Box>
    </Box>
  );
}


