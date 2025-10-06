import React, { useEffect, useState } from "react";
import "./services.css";

const Services = () => {
  const [services, setServices] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [fullscreenImage, setFullscreenImage] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      const res = await fetch("https://upstrive.xo.je/backend/services.php");
      const data = await res.json();
      setServices(data);
    };
    fetchServices();
  }, []);

  // Extract unique categories from services
  const categories = ["All", ...new Set(services.map(service => service.category))];

  // Filter services based on active category
  const filteredServices = activeCategory === "All" 
    ? services 
    : services.filter(service => service.category === activeCategory);

  // Open fullscreen image
  const openFullscreen = (imageUrl, title) => {
    setFullscreenImage({ imageUrl, title });
    document.body.style.overflow = 'hidden'; // Prevent scrolling when fullscreen is open
  };

  // Close fullscreen image
  const closeFullscreen = () => {
    setFullscreenImage(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  // Close fullscreen when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="services-page">
      {/* Fullscreen Image Overlay */}
      {fullscreenImage && (
        <div className="fullscreen-overlay" onClick={closeFullscreen}>
          <div className="fullscreen-content">
            <button className="close-btn" onClick={closeFullscreen}>×</button>
            <img 
              src={fullscreenImage.imageUrl} 
              alt={fullscreenImage.title} 
              className="fullscreen-img"
            />
            <p className="fullscreen-caption">{fullscreenImage.title}</p>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="services-hero">
        <div className="hero-content">
          <h1 className="services-title">Our Services</h1>
          <p className="services-subtitle">Comprehensive solutions for all your branding and printing needs</p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="services-overview">
        <div className="container">
          <h2>What We Offer</h2>
          <div className="services-highlights">
            <div className="highlight-item">
              <div className="highlight-icon">🖨️</div>
              <h3>Printing</h3>
              <p>Digital, large-format, banners, books, cards</p>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon">🎨</div>
              <h3>Branding</h3>
              <p>Shirts, hoodies, mugs, corporate gifts</p>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon">✏️</div>
              <h3>Design</h3>
              <p>Logos, custom graphics, artwork</p>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon">🔲</div>
              <h3>Lamination</h3>
              <p>UV, Matt, Glossy, Frost, 3D Lamination</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid with Filter */}
      <section className="services-display">
        <div className="container">
          <h2>Our Service Portfolio</h2>
          <p className="section-description">Explore our comprehensive range of services tailored to meet your needs</p>
          
          {/* Category Filters */}
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Services Grid */}
          <div className="services-grid">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => {
                const imageUrl = `https://upstrive.xo.je/backend/${service.image}`;
                return (
                  <div key={service.id} className="service-card">
                    <div 
                      className="service-img-container"
                      onClick={() => openFullscreen(imageUrl, service.title)}
                    >
                      <img 
                        src={imageUrl} 
                        alt={service.title} 
                        className="service-img" 
                      />
                      <div className="service-overlay">
                        <span className="service-category">{service.category}</span>
                        <div className="expand-icon">🔍</div>
                      </div>
                    </div>
                    <div className="service-content">
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                      <button className="service-btn">Learn More</button>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="no-services">No services found in this category.</p>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="services-cta">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Contact us today to discuss your project requirements</p>
          <button className="cta-btn">Get a Quote</button>
        </div>
      </section>
    </div>
  );
};

export default Services;
