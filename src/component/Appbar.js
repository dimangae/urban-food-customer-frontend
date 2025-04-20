import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import LoginIcon from '@mui/icons-material/Login';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { Link } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Appbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const searchHandler = (event) => {
    console.log(`Search for: ${event.target.value}`); // Add search handling logic here
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#FF6F61', width: "100%" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link to="/fruits" style={{ textDecoration: 'none', color: 'inherit' }}>Fruits</Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link to="/vegetable" style={{ textDecoration: 'none', color: 'inherit' }}>Vegetables</Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link to="/dairyproduct" style={{ textDecoration: 'none', color: 'inherit' }}>Dairy Products</Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link to="/bakedgoods" style={{ textDecoration: 'none', color: 'inherit' }}>Baked Goods</Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link to="/handcrafts" style={{ textDecoration: 'none', color: 'inherit' }}>Hand Crafts</Link>
            </MenuItem>
          </Menu>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Urban Food
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={searchHandler} // Attach handler to capture search input
            />
          </Search>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <Link to="/cart" style={{ color: 'inherit' }} aria-label="cart">
              <ShoppingCartCheckoutIcon sx={{ mr: 2 }} />
            </Link>
            <LoginIcon sx={{ mr: 2 }} aria-label="login" />
            <Link to="/rating" style={{ color: 'inherit' }} aria-label="rating">
              <RateReviewIcon />
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

