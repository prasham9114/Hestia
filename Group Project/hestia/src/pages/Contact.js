import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/Contact.css'
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault(); // Prevents page refresh on form submit
    alert("Message sent");
    navigate('..'); // You can define a proper route if needed
  }

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you!</p>
      </section>

      <div className="contact-content">
        <section className="contact-info">
          <h2>Get in Touch</h2>
          <div className="info-item">
            <FaPhone className="icon" />
            <p>+91 9876543210</p>
          </div>
          <div className="info-item">
            <FaEnvelope className="icon" />
            <p>hello@hestiacafe.com</p>
          </div>
          <div className="info-item">
            <FaMapMarkerAlt className="icon" />
            <p>123 Home Street, Hearth</p>
          </div>
        </section>

        <section className="contact-form">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Contact;
