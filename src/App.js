import './App.css';
import Home from './screens/Home'; 
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Navbar from './components/Navbar';
import MyOrders from './screens/MyOrders';
import Cart from './screens/Cart';
import { CartProvider } from './components/CartContext';
import { ToastProvider } from './components/ToastContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <CartProvider>
      <ToastProvider>
        <Router>
          <Navbar />
          <div>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/createuser" element={<SignUp />} />
              <Route exact path="/cart" element={<Cart />} />
              <Route exact path="/myorders" element={<MyOrders />} />
            </Routes>
          </div>
        </Router>
      </ToastProvider>
    </CartProvider>
  );
}

export default App;