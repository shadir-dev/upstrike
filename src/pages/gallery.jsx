import React, { useState, useEffect } from "react";
import "./gallery.css"
const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // New state for fullscreen modal
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
      <section className="gallery-hero">
        <div className="container">
          <h1>Our Creative Portfolio</h1>
          <p>Explore our diverse range of branding and design projects</p>
        </div>
      </section>

      <section className="gallery-content">
        <div className="container">
          <div className="gallery-header">
            <h2>Featured Work</h2>
            <p>Browse through our collection of branding, logos, flyers, and posters</p>
          </div>

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

          {loading ? (
            <p>Loading gallery...</p>
          ) : (
            <div className="gallery-grid">
              {filteredItems.map((item) => (
                <div key={item.id} className="gallery-item">
                  <div className="item-image">
                    <img
                      src={item.file_url}
                      alt={item.title}
                      style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                    />
                    <div className="item-overlay">
                      <button
                        className="view-btn"
                        onClick={() => setFullscreenItem(item)}
                      >
                        View Project
                      </button>
                    </div>
                  </div>
                  <div className="item-info">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <span className="item-category">{item.category}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== Fullscreen Modal ===== */}
      {fullscreenItem && (
        <div className="fullscreen-overlay" onClick={() => setFullscreenItem(null)}>
          <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setFullscreenItem(null)}>✖</button>
            <img
              src={fullscreenItem.file_url}
              alt={fullscreenItem.title}
              className="fullscreen-image"
            />
            <h3>{fullscreenItem.title}</h3>
            <p>{fullscreenItem.description}</p>
          </div>
        </div>
      )}

      <section className="gallery-cta">
        <div className="container">
          <h2>Ready to Create Something Amazing?</h2>
          <p>Let's discuss your branding and design needs</p>
      <button><a
  href="https://wa.me/254743187210"
  target="_blank"
  rel="noopener noreferrer"
  class="btn"
>
  Start a Project
</a></button>

        </div>
      </section>

      {/* ===== Modal Styles ===== */}
      <style jsx>{`
        .fullscreen-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .fullscreen-content {
          position: relative;
          text-align: center;
          max-width: 90%;
          max-height: 90%;
          color: #fff;
        }

        .fullscreen-image {
          max-width: 100%;
          max-height: 80vh;
          margin-bottom: 15px;
          border-radius: 10px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.5);
        }

        .close-btn {
          position: absolute;
          top: -10px;
          right: -10px;
          background: #ff4757;
          color: #fff;
          border: none;
          font-size: 18px;
          padding: 8px 12px;
          border-radius: 50%;
          cursor: pointer;
        }

        .close-btn:hover {
          background: #e84118;
        }
      `}</style>
    </div>
  );
};

export default Gallery;
