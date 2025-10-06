import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  const handleNavClick = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" }); // 🔥 scrolls to top
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://upstrive.xo.je/backend/home.php", {
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
        <div className="footer-section compact">
          <h3 className="footer-logo">
            <Link to="/home" onClick={() => handleNavClick("/home")} className="logo">
              <img src={logo} alt="Logo" />
            </Link>
          </h3>

          <p className="footer-description">
            Transforming businesses through innovative solutions and exceptional service.
          </p>
          <div className="social-links">
  <a
    href="https://facebook.com/yourpage"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
    className="social-link"
  >
    <i className="fab fa-facebook-f"></i>
  </a>
  <a
    href="https://twitter.com/yourprofile"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Twitter"
    className="social-link"
  >
    <i className="fab fa-twitter"></i>
  </a>
  <a
    href="https://instagram.com/yourprofile"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
    className="social-link"
  >
    <i className="fab fa-instagram"></i>
  </a>
  <a
    href="https://linkedin.com/in/yourprofile"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
    className="social-link"
  >
    <i className="fab fa-linkedin-in"></i>
  </a>

          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section compact">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><button onClick={() => handleNavClick("/home")} className="footer-btn">Home</button></li>
            <li><button onClick={() => handleNavClick("/about")} className="footer-btn">About Us</button></li>
            <li><button onClick={() => handleNavClick("/services")} className="footer-btn">Services</button></li>
            <li><button onClick={() => handleNavClick("/gallery")} className="footer-btn">Gallery</button></li>
            <li><button onClick={() => handleNavClick("/clientelle")} className="footer-btn">Clientele</button></li>
            <li><button onClick={() => handleNavClick("/contacts")} className="footer-btn">Contact</button></li>
          </ul>
        </div>

        {/* Rating Form */}
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
        
        </div>
      </div>
    </footer>
  );
};

export default Footer;
