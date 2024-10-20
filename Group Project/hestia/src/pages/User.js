import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../styles/recent.css'; // Import your CSS
import { useNavigate } from 'react-router-dom';

const User = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [username,setUsername] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const loggedInUser = Cookies.get('username'); // Get the logged-in username from cookies
    const navigate = useNavigate()
    useEffect(() => {
        const userCookie = Cookies.get('user');
        const usernameCookie = Cookies.get('firstname');
        setIsLoggedIn(!!userCookie);
        setUsername(usernameCookie || '');

        const fetchRecentOrders = async () => {
            try {
                const response = await axios.get('http://localhost:8000/hestia/history/recent_orders/');
                const allOrders = response.data; // Set all orders
                // Filter orders to only include those matching the logged-in user
                const userOrders = allOrders.filter(order => order.user.username === loggedInUser);
                
                setOrders(userOrders); // Set the filtered orders

            } catch (err) {
                setError(err.response?.data?.error || 'Error fetching recent orders');
            } finally {
                setLoading(false);
            }
        };

        fetchRecentOrders();
    }, []);

    const handleLogout = () => {
        Cookies.remove('user');
        Cookies.remove('username');
        setIsLoggedIn(false);
        setUsername('');
        navigate('/login');
      };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className='user-page'>
            <div className="user-hero">
            <h1>User</h1>
            <p>See what you previously ordered.</p>
        </div>
        <div className="orders-container">
            {isLoggedIn ? (
                <div className='grid-container'>
                
                <div className='hello'>
                    <h1>Recent Orders:</h1>
                </div>

                <div className='logout'>
                    <button className='logout-button' onClick={handleLogout}>Logout</button>
                </div>
                </div>
            )
            :
            <p>no user found</p>
            }
          
            {orders.length === 0 ? (
                <p>No recent orders found.</p>
            ) : (
                orders.map((order) => (
                    <div key={order.id} className="order-card">
                        <h3>Order ID: {order.id}</h3>
                        <p>User: {order.user.username}</p>
                        <p>Total Price: ₹{order.total_price}</p>
                        <p>Date Ordered: {new Date(order.date_ordered).toLocaleString()}</p>
                        <h4>Items:</h4>
                        <ul>
                            {order.items.map((item, index) => (
                                <li key={index} className="item-card">
                                    <p>Product Name: {item.product_name}</p>
                                    <p>Price: ₹{item.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
            </div>
        </div>
    );
};

export default User;
