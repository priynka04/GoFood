import React, { useState, useContext } from "react";
import { CartContext } from "../components/CartContext";
import { useToast } from "../components/ToastContext";

export default function Card({ foodItem }) {
  const { name, img, options } = foodItem;
  const priceOptions = options && options.length > 0 ? options[0] : {};

  // Default selected size is the first key of priceOptions
  const [selectedSize, setSelectedSize] = useState(
    Object.keys(priceOptions)[0] || ""
  );
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useContext(CartContext);
  const { showToast } = useToast(); // <-- Move useToast to top level

  // Calculate final price safely
  const finalPrice =
    quantity * (parseInt(priceOptions[selectedSize]) || 0);

  const handleAddToCart = () => {
    if (!selectedSize) {
      showToast("Please select a size"); // Use toast for errors too!
      return;
    }

    // Prepare cart item object
    const itemToAdd = {
      id: foodItem._id || foodItem.id || name, // unique identifier
      name,
      img,
      size: selectedSize,
      price: parseInt(priceOptions[selectedSize]) || 0,
      quantity,
    };

    addToCart(itemToAdd);
    showToast(`${quantity} x ${name} (${selectedSize}) added to cart.`);
  };

  return (
    <div className="gh-card">
      <img
        src={img}
        alt={name}
        className="gh-card-img"
      />
      <div className="gh-card-body">
        <h5 className="gh-card-title">{name}</h5>
        <div className="gh-card-controls">
          <select
            className="gh-card-quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <select
            className="gh-card-size"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            {Object.entries(priceOptions).map(([size, price]) => (
              <option key={size} value={size}>
                {size} - ₹{price}
              </option>
            ))}
          </select>
        </div>
        <div className="gh-card-price">
          ₹ {finalPrice}
        </div>
        <button
          className="gh-btn-primary"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}