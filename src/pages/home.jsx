import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import heroBg from "../assets/bg.png"; // ✅ correct import

const Home = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetch("http://localhost/cliantelle_projects/backend/home.php")
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(data.testimonials || []);
        setStats(data.stats || []);
      })
      .catch((err) => console.error("Error fetching home data:", err));
  }, []);

  const nextTestimonial = () =>
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);

  const prevTestimonial = () =>
    setActiveTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(nextTestimonial, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials]);

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "star filled" : "star"}>
        {i < rating ? "★" : "☆"}
      </span>
    ));

  return (
    <div className="home">
      {/* -------------------- HERO -------------------- */}
   <section
  className="hero"
  style={{
    backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.6)), url(${heroBg})`,
  }}
>
  <div className="hero-overlay">
    <h1 className="hero-title animate-slide">Transforming Ideas into Masterpieces</h1>
    <p className="hero-desc animate-fade">
      We craft solutions that elevate your business through creativity,
      technology, and strategy.
    </p>

    <div className="cta-buttons animate-buttons">
      <a
        href="https://wa.me/254743187210"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary"
      >
        Get Started
      </a>
      <Link to="/about" className="btn btn-outline">
        Learn More
      </Link>
    </div>
  </div>
</section>

{/* -------------------- TESTIMONIALS -------------------- */}
<section className="testimonials-section">
  <div className="section-header">
    <h2 className="animate-slide">What Our Clients Say</h2>
    <p className="animate-fade">
      Hear from businesses that trusted us to deliver results
    </p>
  </div>

  {testimonials.length > 0 && (
    <div className="testimonials-container">
      <div className="testimonial-card">
        <div className="testimonial-content">
          <div className="rating">
            {renderStars(testimonials[activeTestimonial].rating)}
          </div>
          <p className="testimonial-text">
            "{testimonials[activeTestimonial].text}"
          </p>
          <div className="testimonial-author">
            {testimonials[activeTestimonial].image && (
              <img
                src={testimonials[activeTestimonial].image}
                alt={testimonials[activeTestimonial].name}
                className="author-image"
              />
            )}
            <div className="author-details">
              <h4>{testimonials[activeTestimonial].name}</h4>
              <p>{testimonials[activeTestimonial].company}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="testimonial-controls">
        <button onClick={prevTestimonial} className="control-btn">
          ‹
        </button>
        <div className="testimonial-dots">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${idx === activeTestimonial ? "active" : ""}`}
              onClick={() => setActiveTestimonial(idx)}
            />
          ))}
        </div>
        <button onClick={nextTestimonial} className="control-btn">
          ›
        </button>
      </div>
    </div>
  )}
</section>

      {/* -------------------- STATS -------------------- */}
      <section className="stats-section">
        <div className="container stats-grid">
          {stats.map((item, i) => (
            <div className="stat-card" key={i}>
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
