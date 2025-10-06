import React, { useState, useEffect } from "react";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState(null);

  // Predefined service categories
  const serviceOptions = [
    "Branding",
    "Printing",
    " Design",
  ];

  const fetchServices = async () => {
    try {
      const res = await fetch("https://upstrive.xo.je/backend/services.php");
      const data = await res.json();
      setServices(data);
    } catch (err) {
      setMessage({ type: "error", text: "⚠️ Failed to fetch services." });
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("image", image);

    try {
      const res = await fetch("https://upstrive.xo.je/backend/services.php", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: "✅ Service uploaded successfully!" });
        setTitle("");
        setDesc("");
        setImage(null);
        fetchServices();
      } else {
        setMessage({ type: "error", text: data.message || "⚠️ Failed to upload service." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "❌ Server error while uploading." });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      const res = await fetch("https://upstrive.xo.je/backend/services.php", {
        method: "DELETE",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `id=${id}`, // ✅ send id in form format
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: "🗑️ Service deleted successfully!" });
        fetchServices();
      } else {
        setMessage({ type: "error", text: data.message || "⚠️ Failed to delete service." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "❌ Server error while deleting." });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Services</h2>

      {/* ✅ Feedback messages */}
      {message && (
        <div
          style={{
            marginBottom: "15px",
            padding: "12px",
            borderRadius: "6px",
            fontWeight: "bold",
            background: message.type === "success" ? "#d4edda" : "#f8d7da",
            color: message.type === "success" ? "#155724" : "#721c24",
            border: message.type === "success" ? "1px solid #c3e6cb" : "1px solid #f5c6cb",
          }}
        >
          {message.text}
        </div>
      )}

      {/* Upload form */}
      <form onSubmit={handleUpload} style={{ marginBottom: "20px" }}>
        <select
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: "8px", marginBottom: "10px", display: "block" }}
        >
          <option value="">-- Select a Service --</option>
          {serviceOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Service Description"
          required
          style={{ display: "block", marginBottom: "10px", width: "100%", height: "80px" }}
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
          style={{ display: "block", marginBottom: "10px" }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Upload Service
        </button>
      </form>

      {/* Existing services list */}
      <div>
        <h3>Existing Services</h3>
        {services.length === 0 ? (
          <p>No services available.</p>
        ) : (
          services.map((s) => (
            <div
              key={s.id}
              style={{
                marginBottom: "15px",
                borderBottom: "1px solid #ddd",
                paddingBottom: "10px",
              }}
            >
              <img
                src={`https://upstrive.xo.jes/backend/${s.image}`}
                alt={s.title}
                width="120"
                style={{ borderRadius: "5px" }}
              />
              <h4>{s.title}</h4>
              <p>{s.description}</p>
              <button
                onClick={() => handleDelete(s.id)}
                style={{
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
          ))
        )}
      </div>
    </div>
  );
};

export default AdminServices;
