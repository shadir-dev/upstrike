import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./nav.css";

import logo from "../../assets/image.png"; // <-- confirm the path

const Footer = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost/cliantelle_projects/backend/home.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          company: email,
          rating,
          text: review,
          image: name.charAt(0).toUpperCase() + email.charAt(0).toUpperCase(),
        }),
      });
      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setTimeout(() => {
          setRating(0);
          setReview("");
          setName("");
          setEmail("");
          setSubmitted(false);
        }, 3000);
      } else {
        alert(data.message || "Failed to submit review");
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="footer">
      {/* Top Wave */}
      <div className="footer-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="wave-path"
          ></path>
        </svg>
      </div>

      <div className="footer-content-grid">
        {/* Company Info */}
        <div className="footer-section compact"><h3 className="footer-logo">
  
          <a href="/home" className="logo">
            <img src={logo} alt="Logo" />
          </a>
  
</h3>

          <p className="footer-description">
            Transforming businesses through innovative solutions and exceptional service.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Facebook" className="social-link"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Twitter" className="social-link"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="Instagram" className="social-link"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="LinkedIn" className="social-link"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section compact">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/clientelle">Clientele</Link></li>
            <li><Link to="/contacts">Contact</Link></li>
          </ul>
        </div>


        {/* Compact Rating Form */}
        <div className="footer-section compact">
          <h4 className="footer-heading">Rate Us</h4>
          {submitted ? (
            <div className="thank-you-message">
              <div className="success-icon">✓</div>
              <p>Thank you for your feedback!</p>
            </div>
          ) : (
            <form className="review-form" onSubmit={handleSubmit}>
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`star-btn ${rating >= star ? "active" : ""} ${hoverRating >= star ? "hover" : ""}`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >★</button>
                ))}
              </div>
              <textarea
                placeholder="Your experience..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows="2"
                className="review-textarea"
              />
              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="review-input" />
              
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Upstrike. All rights reserved.</p>
        <div className="footer-bottom-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
