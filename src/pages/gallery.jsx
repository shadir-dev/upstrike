import React, { useState, useEffect } from "react";
import "./gallery.css";

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fullscreenItem, setFullscreenItem] = useState(null);

  // Fetch data from backend
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch("http://localhost/cliantelle_projects/backend/gallery.php");
        const data = await res.json();

        if (data.success) {
          setGalleryItems(data.gallery);
        }
      } catch (error) {
        console.error("Failed to load gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const categories = [
    { id: "all", name: "All Work" },
  ];

  const filteredItems =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div className="gallery-page">
      {/* Hero Section */}
      <section className="gallery-hero">
        <div className="container">
          <h1 className="hero-title">Our Gallery</h1>
          <p className="hero-subtitle">Explore our diverse range of branding and design projects</p>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="gallery-content">
        <div className="container">
          <div className="gallery-header">
            <h2>Featured Projects</h2>
            <p>Browse through our collection of creative work and design solutions</p>
          </div>

          {/* Category Filters */}
          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`filter-btn ${activeCategory === category.id ? "active" : ""}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading gallery...</p>
            </div>
          ) : (
            <div className="gallery-grid">
              {filteredItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="gallery-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="card-image">
                    <img
                      src={item.file_url}
                      alt={item.title}
                      loading="lazy"
                    />
                    <div className="card-overlay">
                      <div className="overlay-content">
                        <button
                          className="view-btn"
                          onClick={() => setFullscreenItem(item)}
                        >
                          <span>👁️</span> Quick View
                        </button>
                        <button className="expand-btn" onClick={() => setFullscreenItem(item)}>
                          ⤢
                        </button>
                      </div>
                    </div>
                    <div className="category-badge">{item.category}</div>
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-description">{item.description}</p>
                    <div className="card-footer">
                      <span className="item-category">{item.category}</span>
                      <span className="view-indicator">Click to view</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredItems.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📷</div>
              <h3>No projects found</h3>
              <p>No projects available in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Fullscreen Modal */}
      {fullscreenItem && (
        <div className="fullscreen-overlay" onClick={() => setFullscreenItem(null)}>
          <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setFullscreenItem(null)}>
              ✕
            </button>
            <div className="modal-image-container">
              <img
                src={fullscreenItem.file_url}
                alt={fullscreenItem.title}
                className="fullscreen-image"
              />
            </div>
            <div className="modal-info">
              <h3>{fullscreenItem.title}</h3>
              <p>{fullscreenItem.description}</p>
              <span className="modal-category">{fullscreenItem.category}</span>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="gallery-cta">
        <div className="container">
          <h2>Ready to Create Something Amazing?</h2>
          <p>Let's discuss your branding and design needs</p>
          <a
            href="https://wa.me/254743187210"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
          >
            <span> Start a Project</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Gallery;