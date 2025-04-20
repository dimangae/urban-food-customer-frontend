import './App.css';
import Appbar from "./component/Appbar";
import CartPage from './component/Cart';
import Payment from './component/Payment';
import Order from "./component/Order";
import Rating from './component/Rating';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import Fruits from './component/Fruits';
import Vegetable from './component/Vegetable';
import DairyProduct from './component/DairyProduct';
import BakedGoods from './component/BakedGoods';
import HandCrafts from './component/HandCrafts';
import { CartProvider } from './component/CartContext'; // Import CartProvider for global state

function App() {
  return (
    <CartProvider> {/* Wrap application with CartProvider */}
      <Router>
        <div className="App">
          <Appbar /> {/* Persistent Appbar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fruits" element={<Fruits />} />
            <Route path="/vegetable" element={<Vegetable />} />
            <Route path="/dairyproduct" element={<DairyProduct />} />
            <Route path="/bakedgoods" element={<BakedGoods />} />
            <Route path="/handcrafts" element={<HandCrafts />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/rating" element={<Rating />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/order" element={<Order />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;

