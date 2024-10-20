import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/register.css';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/api/register/', { username, email, password,first_name,last_name});
      console.log(response.data);
      alert('Registration successfull')
      navigate('/login')
    } catch (error) {
      setError('Registration failed');
    }
  };

  return (
    <div className='signup-page'>
      <div className="signup-hero">
        <h1>Register</h1>
        <p>Join our cafe !</p>
      </div>
    <div className="signup-form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label>Firstname:</label>
          <input
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Lastname:</label>
          <input
            type="text"
            value={last_name}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </div>

        
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
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className='submit'>
        <button type="submit" style={{backgroundColor:'#8B4513'}}>Register</button>
        {error && <p>{error}</p>}
        <br></br>
        <p>
          Already registered? <Link to="/login">Login here</Link>
        </p>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Register;