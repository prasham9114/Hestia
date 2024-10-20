// import React, { useState, useEffect } from 'react';
// import Cookies from 'js-cookie';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'; // Import axios for making API calls
// import '../styles/Cart.css'; // Your custom styles

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const navigate = useNavigate();

//   // Fetch cart items from localStorage and calculate total price
//   useEffect(() => {
//     const loggedInUser = Cookies.get('username');
//     if (loggedInUser) {
//       const userCartKey = `cart_${loggedInUser}`;
//       const items = JSON.parse(localStorage.getItem(userCartKey)) || [];
//       setCartItems(items);
//       setTotalPrice(calculateTotalPrice(items));
//     }
//   }, []);

//   // Calculate total price for items in the cart
//   const calculateTotalPrice = (items) => {
//     return items.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   // Handle placing an order and sending cart data to Django
//   const handleOrderNow = async () => {
//     const loggedInUser = Cookies.get("username");

//     if (!loggedInUser) {
//         alert('Please log in to place an order.');
//         return;
//     }

//     try {
//         const orderData = {
//             username: loggedInUser,
//             cartItems: cartItems.map(item => ({
//                 product_name: item.name,  // Ensure this matches the expected key in Django
//                 price: item.price,
//                 quantity: item.quantity,
//                 image: item.image, // Optional, if you want to include the image as well
//             })),
//             totalPrice: totalPrice
//         };

//         const response = await axios.post('http://localhost:8000/hestia/history/create_order/', orderData);

//         if (response.status === 201) {
//             alert('Order placed successfully!');
//             const userCartKey = `cart_${loggedInUser}`;
//             setCartItems([]);
//             setTotalPrice(0);
//             localStorage.removeItem(userCartKey);
//             navigate('/');
//         }
//     } catch (error) {
//         console.error('Error placing order:', error.response.data || error.message);
//         alert('Error placing order: ' + (error.response.data.error || 'Please check the console for more details.'));
//     }
// };

//   return (
//     <div className='cart-page'>
//        <div className="cart-hero">
//         <h1>Cart</h1>
//         <p>Check out your cart!</p>
//        </div>
//     <div className="cart-container">
//       <h2>Your Cart</h2>
//       <div className="cart-items">
//         {cartItems.map((item, index) => (
//           <div key={index} className="cart-item">
//             <img src={`http://127.0.0.1:8000/${item.image}`} alt={item.name} className="cart-item-image" />
//             <div className="cart-item-details">
//               <h4>{item.name}</h4>
//               <p style={{ color: '#8B4513' }}>₹{item.price}</p>
//               <div className="quantity-controls">
//                 <button className="button" style={{ backgroundColor: '#8B4513' }}>-</button>
//                 <span>{item.quantity}</span>
//                 <button className="button" style={{ backgroundColor: '#8B4513' }}>+</button>
//                 <button className="button-remove" style={{ backgroundColor: '#8B4513' }}>Remove</button>
                
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="cart-total">
//         <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3>
//       </div>
//       <button className="order-button" onClick={handleOrderNow}>
//         Order Now
//       </button>
//     </div>
//     </div>
//   );
// };

// export default CartPage;
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API calls
import '../styles/Cart.css'; // Your custom styles

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  // Fetch cart items from localStorage and calculate total price
  useEffect(() => {
    const loggedInUser = Cookies.get('username');
    if (loggedInUser) {
      const userCartKey = `cart_${loggedInUser}`;
      const items = JSON.parse(localStorage.getItem(userCartKey)) || [];
      setCartItems(items);
      setTotalPrice(calculateTotalPrice(items));
    }
  }, []);

  // Calculate total price for items in the cart
  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Handle placing an order and sending cart data to Django
  const handleOrderNow = async () => {
    const loggedInUser = Cookies.get("username");

    if (!loggedInUser) {
        alert('Please log in to place an order.');
        return;
    }

    try {
        const orderData = {
            username: loggedInUser,
            cartItems: cartItems.map(item => ({
                product_name: item.name,  // Ensure this matches the expected key in Django
                price: item.price,
                quantity: item.quantity,
                image: item.image, // Optional, if you want to include the image as well
            })),
            totalPrice: totalPrice
        };

        const response = await axios.post('http://localhost:8000/hestia/history/create_order/', orderData);

        if (response.status === 201) {
            alert('Order placed successfully!');
            const userCartKey = `cart_${loggedInUser}`;
            setCartItems([]);
            setTotalPrice(0);
            localStorage.removeItem(userCartKey);
            navigate('/');
        }
    } catch (error) {
        console.error('Error placing order:', error.response.data || error.message);
        alert('Error placing order: ' + (error.response.data.error || 'Please check the console for more details.'));
    }
  };

  // Handle incrementing the quantity of an item
  const handleIncrement = (index) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity += 1;
    setCartItems(updatedItems);
    setTotalPrice(calculateTotalPrice(updatedItems));
  };

  // Handle decrementing the quantity of an item
  const handleDecrement = (index) => {
    const updatedItems = [...cartItems];
    if (updatedItems[index].quantity > 1) {
      updatedItems[index].quantity -= 1;
      setCartItems(updatedItems);
      setTotalPrice(calculateTotalPrice(updatedItems));
    }
  };

  // Handle removing an item from the cart
  const handleRemove = (index) => {
    const updatedItems = [...cartItems];
    updatedItems.splice(index, 1);
    setCartItems(updatedItems);
    setTotalPrice(calculateTotalPrice(updatedItems));
  };

  return (
    <div className='cart-page'>
       <div className="cart-hero">
        <h1>Cart</h1>
        <p>Check out your cart!</p>
       </div>
    <div className="cart-container">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={`http://127.0.0.1:8000/${item.image}`} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h4>{item.name}</h4>
              <p style={{ color: '#8B4513' }}>₹{item.price}</p>
              <div className="quantity-controls">
                <button 
                  className="button" 
                  style={{ backgroundColor: '#8B4513' }} 
                  onClick={() => handleDecrement(index)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button 
                  className="button" 
                  style={{ backgroundColor: '#8B4513' }} 
                  onClick={() => handleIncrement(index)}
                >
                  +
                </button>
                <button 
                  className="button-remove" 
                  style={{ backgroundColor: '#8B4513' }} 
                  onClick={() => handleRemove(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3>
      </div>
      <button className="order-button" onClick={handleOrderNow}>
        Order Now
      </button>
    </div>
    </div>
  );
};

export default CartPage;
