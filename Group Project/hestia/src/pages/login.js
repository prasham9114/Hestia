import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie'; 
import '../styles/login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();
  
  useEffect(() => {
    
    const user = Cookies.get('user');
    if (user) {
      setIsLoggedIn(true);
    }
    
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login/', { username, password });
      console.log(response.data);
      
      Cookies.set('user', JSON.stringify(response.data), { expires: 1 }); 
      Cookies.set('username', response.data.username, { expires: 7, path: '/' });
      setIsLoggedIn(true); 
      alert('Login successfull')
      navigate('/'); 
      setTimeout(() => {
        window.location.reload();  
      }, 200);
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    
    Cookies.remove('user');
    Cookies.remove('username');
    setIsLoggedIn(false); 
    navigate('/login'); 
  };

  return (
      <div className='login-page'>
      <div className="login-hero">
        <h1>Login</h1>
        <p>Welcome back!</p>
      </div>
    <div className="form-container">
      {!isLoggedIn ? (
        <>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
            <p>
              Not already registered? <Link to="/register">Register here</Link>
            </p>
          </form>
        </>
      ) : (
        <>
          <h2>Welcome, {Cookies.get('username')}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
        </div>
  );
};

export default Login;
