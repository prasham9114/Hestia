import { Link } from 'react-router-dom';
import '../compStyles/Footer.css'
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Hestia Cafe</h3>
          <p className='footer-text'>Your cozy corner in the heart of the city.</p>
          <p className='footer-text'>123 Home Street, Hearth</p>
          <p className='footer-text'>Phone: +91 9876543210</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Opening Hours</h3>
          <p className='footer-text'>Monday - Friday: 7am - 8pm</p>
          <p className='footer-text'>Saturday: 8am - 9pm</p>
          <p className='footer-text'>Sunday: 8am - 6pm</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Hestia Cafe. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;