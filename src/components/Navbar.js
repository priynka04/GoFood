import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../components/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

// Responsive Navbar with hamburger menu using simple React state
export default function Navbar() {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const isLoggedIn = localStorage.getItem("authToken");
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setMenuOpen(false);
    navigate("/login");
  };

  // Close menu on navigation
  const handleNav = () => setMenuOpen(false);

  return (
    <nav className="gh-navbar">
      <div className="gh-navbar-container">
        {/* Brand/Logo always left */}
        <Link className="gh-navbar-brand" to="/" onClick={handleNav}>
          GoFood
        </Link>

        {/* Hamburger icon for mobile */}
        <button
          className={`gh-navbar-toggle${menuOpen ? ' open' : ''}`}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="gh-navbar-toggle-bar"></span>
          <span className="gh-navbar-toggle-bar"></span>
          <span className="gh-navbar-toggle-bar"></span>
        </button>

        {/* Nav links: collapse into menu on small screens */}
        <div className={`gh-navbar-menu${menuOpen ? ' open' : ''}`}>
          <Link className="gh-nav-link" to="/" onClick={handleNav}>Home</Link>

          {!isLoggedIn ? (
            <>
              <Link className="gh-nav-link" to="/login" onClick={handleNav}>Login</Link>
              <Link className="gh-nav-link" to="/createuser" onClick={handleNav}>SignUp</Link>
            </>
          ) : (
            <>
              <Link className="gh-nav-link" to="/myorders" onClick={handleNav}>My Orders</Link>
              <Link className="gh-cart-link" to="/cart" aria-label="Cart" onClick={handleNav}>
                <FaShoppingCart size={22} />
                {cartItems.length > 0 && (
                  <span className="gh-cart-badge">{cartItems.length}</span>
                )}
              </Link>
              <button className="gh-logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}