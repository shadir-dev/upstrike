import React, { useState } from "react";
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhone, FaPaperPlane } from "react-icons/fa";
import "./contacts.css";

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://upstrive.xo.je/backend/messages.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert("❌ Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      alert("⚠️ Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contacts-page">
      {/* Success Message */}
      {submitted && (
        <div className="success-message">
          <div className="success-content">
            <FaPaperPlane className="success-icon" />
            <p>✅ Thank you! Your message has been sent successfully.</p>
          </div>
        </div>
      )}

      {/* Header Section */}
      <section className="contact-header">
        <div className="header-content">
          <h1>Get In Touch</h1>
          <p>We'd love to hear from you. Reach out to us through any of the channels below.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="contact-main">
        <div className="contact-container">
          {/* Contact Information */}
          <div className="contact-info">
            <h2>Contact Information</h2>
            <p>Feel free to reach out to us through any of these channels:</p>
            
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">
                  <FaWhatsapp className="whatsapp-icon" />
                </div>
                <div className="contact-text">
                  <h4>WhatsApp</h4>
                  <p>+254 743 187 210</p>
                  <a 
                    href="https://wa.me/254743187210" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    Send Message
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <FaEnvelope className="email-icon" />
                </div>
                <div className="contact-text">
                  <h4>Email</h4>
                  <p>Upstrivesolutions@gmail.com</p>
                  <a 
                    href="mailto:Upstrivesolutions@gmail.com"
                    className="contact-link"
                  >
                    Send Email
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <FaMapMarkerAlt className="location-icon" />
                </div>
                <div className="contact-text">
                  <h4>Location</h4>
                  <p>Nairobi CBD, Kenya</p>
                </div>
              </div>
            </div>

            {/* Floating Contact Icons */}
            <div className="floating-contact-icons">
              <a
                href="https://wa.me/254743187210"
                target="_blank"
                rel="noopener noreferrer"
                className="floating-icon whatsapp-float"
                title="Chat on WhatsApp"
              >
                <FaWhatsapp />
              </a>
              <a
                href="mailto:Upstrivesolutions@gmail.com"
                className="floating-icon email-float"
                title="Send us an email"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-section">
            <div className="form-wrapper">
              <div className="form-header">
                <h2>Send Us a Message</h2>
                <p>Fill out the form below and we'll get back to you as soon as possible.</p>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What is this regarding?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className={`submit-btn ${loading ? 'loading' : ''}`} 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="spinner"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="btn-icon" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="map-container">
          <h2>Our Location</h2>
          <p>Find us at our Nairobi CBD office</p>
          <div className="map-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.858896!2d36.821946!3d-1.292066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1731c2c9f5b3%3A0x7b0e6cfbe!2sNairobi%20CBD!5e0!3m2!1sen!2ske!4v1630000000000!5m2!1sen!2ske"
              width="100%"
              height="400"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Live Location"
              style={{ border: 0, borderRadius: '10px' }}
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacts;
