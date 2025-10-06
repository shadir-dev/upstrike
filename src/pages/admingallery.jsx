import React, { useState, useEffect } from "react";
import "./admin.css";

const AdminGallery = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
  });
  const [gallery, setGallery] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // Fetch gallery items
  const fetchGallery = async () => {
    try {
      const res = await fetch("https://upstrive.xo.je/backend/gallery.php");
      const result = await res.json();
      if (result.success) {
        setGallery(result.gallery);
      } else {
        setMessage({ type: "error", text: "⚠️ Failed to load gallery" });
      }
    } catch {
      setMessage({ type: "error", text: "❌ Server error fetching gallery" });
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // Handle upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("file", formData.file);

    try {
      const res = await fetch("https://upstrive.xo.je/backend/gallery.php", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        setMessage({ type: "success", text: result.message });
        setFormData({ title: "",  description: "", file: null });
        fetchGallery();
      } else {
        setMessage({ type: "error", text: result.message });
      }
    } catch {
      setMessage({ type: "error", text: "❌ Upload failed" });
    }
    setLoading(false);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const res = await fetch(`https://upstrive.xo.je/backend/gallery.php?id=${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.success) {
        setMessage({ type: "success", text: "🗑️ Item deleted successfully" });
        fetchGallery();
      } else {
        setMessage({ type: "error", text: "⚠️ Failed to delete item" });
      }
    } catch {
      setMessage({ type: "error", text: "❌ Server error while deleting" });
    }
  };

  return (
    <div className="admin-gallery">
      <h2>Upload New Gallery Item</h2>

      {/* ✅ Feedback */}
      {message && (
        <div
          style={{
            marginBottom: "15px",
            padding: "10px",
            borderRadius: "6px",
            background: message.type === "success" ? "#d4edda" : "#f8d7da",
            color: message.type === "success" ? "#155724" : "#721c24",
            border: message.type === "success" ? "1px solid #c3e6cb" : "1px solid #f5c6cb",
          }}
        >
          {message.text}
        </div>
      )}

      {/* Upload form */}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
        <input type="file" name="file" accept="image/*" onChange={handleChange} required />
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {/* Gallery list */}
      <h3>Gallery Items</h3>
      {gallery.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <div className="gallery-list">
          {gallery.map((item) => (
            <div key={item.id} className="gallery-item">
              <img src={item.file_url} alt={item.title} width="150" />
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <br />
              <button
                onClick={() => handleDelete(item.id)}
                style={{
                  marginTop: "8px",
                  background: "red",
                  color: "white",
                  padding: "6px 12px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
