import React, { useState } from 'react';

const QuantitySetter = () => {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    }
  };

  return (
    <div>
      <button onClick={decrementQuantity}>-</button>
      <input 
        type="number" 
        min="1" 
        value={quantity} 
        onChange={handleInputChange} 
      />
      <button onClick={incrementQuantity}>+</button>
    </div>
  );
};

export default QuantitySetter;
