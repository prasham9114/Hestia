import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Home.css';

const Home = () => {
  const [specials, setSpecials] = useState([]);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpecials = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://127.0.0.1:8000/hestia/beverages/info/');
        
        setSpecials(response.data.slice(0, 3));
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch specials. Please try again later.');
        setLoading(false);
      }
    };

    const fetchFeaturedItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://127.0.0.1:8000/hestia/snacks/info/');
        
        setFeaturedItems(response.data.slice(0, 3));
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch featured items. Please try again later.');
        setLoading(false);
      }
    };

    fetchSpecials();
    fetchFeaturedItems();
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to Hestia</h1>
        <h2>The Homely and Hearthly Cafe</h2>
        <p>Experience the warmth of home in every sip and bite</p>
      </section>
      
      <section className="about-snippet">
        <h2>Our Hearth, Your Home</h2>
        <p>Named after the Greek goddess of the hearth, Hestia Cafe brings you the comfort of home with the flavor of expert baristas and chefs.</p>
      </section>

      <section className="specials">
        <h2>Today's Heartwarming Specials</h2>
        {loading ? (
          <p>Loading our special offerings...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="specials-grid">
            {specials.length > 0 ? specials.map((special) => (
              <div key={special.id} className="special-card">
                <img src={`http://127.0.0.1:8000/${special.image}`} alt={special.name || 'Unnamed Item'} />
                <h3>{special.name || 'Unnamed Item'}</h3>
                <p>{special.description || 'No description available.'}</p>
              </div>
            )) : (
              <p>No specials available at the moment.</p>
            )}
          </div>
        )}
      </section>

      <section className="specials">
      
        {loading ? (
          <p>Loading featured items...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="specials-grid">
            {featuredItems.length > 0 ? featuredItems.map((item) => (
              <div key={item.id} className="special-card">
                <img src={`http://127.0.0.1:8000/${item.image}`} alt={item.name || 'Unnamed Item'} />
                <h3>{item.name || 'Unnamed Item'}</h3>
                <p>{item.description || 'No description available.'}</p>
              </div>
            )) : (
              <p>No featured items available at the moment.</p>
            )}
          </div>
        )}
      </section>

      <section className="atmosphere">
        <h2>A Place to Gather</h2>
        <p>Just as Hestia welcomed all to the hearth, we invite you to make our cafe your second home. Whether you're here to work, meet friends, or simply enjoy a moment of peace, you'll find a warm welcome at Hestia.</p>
      </section>
    </div>
  );
};

export default Home;
