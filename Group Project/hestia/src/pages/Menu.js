import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart } from 'lucide-react';
import Cookies from 'js-cookie';
import '../styles/Menu.css';

const MenuItem = ({ item, onAddToCart, onOpenModal }) => {
  const [quantity, setQuantity] = useState(1);
  const imageURL = `http://127.0.0.1:8000/${item.image}`;
  
  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  return (
    <div className="menu-item" aria-label={`${item.name} - ₹${Number(item.price).toFixed(2)}`}>
      <img src={imageURL} alt={item.name} />
      <h3>{item.name}</h3>
      <div className="price-quantity">
        <p>₹{Number(item.price).toFixed(2)}</p>
        <div className="quantity-controls">
          <button 
            className="quantity-btn" 
            onClick={() => handleQuantityChange(-1)} 
            disabled={quantity <= 1}
          >
            -
          </button>
          <span>{quantity}&nbsp;&nbsp;&nbsp;</span>
          <button className="quantity-btn" onClick={() => handleQuantityChange(1)}>+</button>
        </div>
      </div>
      <button 
        onClick={() => onAddToCart({ ...item, quantity })} 
        className="add-to-cart-btn"
      >
        <ShoppingCart size={13} /> Add to Cart
      </button>
      <button onClick={() => onOpenModal(item)} className="explore-btn">Explore</button>
    </div>
  );
};

const MenuSection = ({ title, items, onAddToCart, onOpenModal }) => (
  <section className="menu-section">
    <h2>{title}</h2>
    <div className="menu-grid">
      {items.map((item) => (
        <MenuItem key={item.id} item={item} onAddToCart={onAddToCart} onOpenModal={onOpenModal} />
      ))}
    </div>
  </section>
);

const MenuPage = () => {
  const [menuData, setMenuData] = useState({
    hotBeverages: [],
    coldBeverages: [],
    snacks: []
  });
  const [filteredItems, setFilteredItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalItem, setModalItem] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/hestia/beverages/info/');
        const beverages = response.data;

        const hotBeverages = beverages.filter(b => b.beverage_type === 'hot');
        const coldBeverages = beverages.filter(b => b.beverage_type === 'cold');

        const snacksResponse = await axios.get('http://127.0.0.1:8000/hestia/snacks/info/');
        const snacks = snacksResponse.data;

        setMenuData({ hotBeverages, coldBeverages, snacks });
      } catch (error) {
        console.error('Error fetching menu data:', error);
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    const user = Cookies.get('username');
    setCurrentUser(user);

    const storedCart = localStorage.getItem(`cart_${user}`);
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }

    fetchMenuData();
  }, []);

  // Effect to handle search queries
  useEffect(() => {
    const allItems = [
      ...menuData.hotBeverages,
      ...menuData.coldBeverages,
      ...menuData.snacks,
    ];

    if (searchQuery) {
      const regex = new RegExp(`\\b${searchQuery}\\b`, 'i'); 
      const filtered = allItems.filter(item =>
        regex.test(item.name) || regex.test(item.description) // Include description in search
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
    }
  }, [searchQuery, menuData]);

  const addToCart = (item) => {
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
    let updatedCart;

    if (existingItemIndex > -1) {
      updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += item.quantity;
    } else {
      updatedCart = [...cart, item];
    }

    setCart(updatedCart);
    localStorage.setItem(`cart_${currentUser}`, JSON.stringify(updatedCart));
    alert(`${item.name} added to cart!`);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleOpenModal = (item) => {
    setModalItem(item); 
  };

  const handleCloseModal = () => {
    setModalItem(null); 
  };

  return (
    <div className="menu-page">
      <div className="menu-hero">
        <h1>Our Menu</h1>
        <p>Discover our delicious selection of beverages and snacks</p>
      </div>

      <input 
        type="text" 
        value={searchQuery} 
        onChange={handleSearchChange} 
        placeholder="Search for items..." 
        className="search-bar" 
      />

      {/* Show loading indicator while fetching data */}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : filteredItems.length > 0 ? (
        <MenuSection title="Filtered Items" items={filteredItems} onAddToCart={addToCart} onOpenModal={handleOpenModal} />
      ) : (
        <>
          <MenuSection title="Hot Beverages" items={menuData.hotBeverages} onAddToCart={addToCart} onOpenModal={handleOpenModal} />
          <MenuSection title="Cold Beverages" items={menuData.coldBeverages} onAddToCart={addToCart} onOpenModal={handleOpenModal} />
          <MenuSection title="Snacks" items={menuData.snacks} onAddToCart={addToCart} onOpenModal={handleOpenModal} />
        </>
      )}

      {modalItem && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>&times;</span>
            <img src={`http://127.0.0.1:8000/${modalItem.image}`} alt={modalItem.name} />
            <h2>{modalItem.name}</h2>
            <p>{modalItem.description}</p>
            <p>Price: ₹{Number(modalItem.price).toFixed(2)}</p>
            <button onClick={() => addToCart({ ...modalItem, quantity: 1 })} className="add-to-cart-btn">Add to Cart</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
