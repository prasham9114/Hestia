import React from 'react';
import { FaMedal, FaStar, FaCoffee } from 'react-icons/fa';
import '../styles/About.css'
const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>About Hestia Cafe</h1>
        <p>Where every cup tells a story</p>
      </section>

      <section className="journey">
        <h2>Our Journey</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-content">
              <h3>2015</h3>
              <p>Hestia Cafe opens its doors, bringing the warmth of home to our community.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-content">
              <h3>2018</h3>
              <p>Expansion of our menu to include artisanal pastries and gourmet sandwiches.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-content">
              <h3>2020</h3>
              <p>Launch of our community outreach program, "Hestia Hearts".</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-content">
              <h3>2023</h3>
              <p>Celebration of serving our 1 millionth cup of coffee!</p>
            </div>
          </div>
        </div>
      </section>

      <section className="location">
        <h2>Our Location</h2>
        <div className="location-content">
          <div className="address">
            <h3>Visit Us</h3>
            <p>123 Home Street</p>
            <p>Hearth</p>
            <p>Phone: +91 9876543210</p>
            <p>Email: hello@hestiacafe.com</p>
          </div>
        </div>
      </section>

      <section className="awards">
        <h2>Awards & Recognition</h2>
        <div className="awards-grid">
          <div className="award-item">
            <FaMedal className="award-icon" />
            <h3>Best Cafe 2023</h3>
            <p>Hearth Food & Drink Awards</p>
          </div>
          <div className="award-item">
            <FaStar className="award-icon" />
            <h3>4.8 Star Rating</h3>
            <p>Based on 1000+ reviews</p>
          </div>
          <div className="award-item">
            <FaCoffee className="award-icon" />
            <h3>Top 10 Coffee Shops</h3>
            <p>Hearth Weekly Magazine</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;