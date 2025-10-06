import React, { useState } from "react";
import "./login.css"; // custom css

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    if (logo) {
      formData.append("logo", logo);
    }

    try {
      const response = await fetch("https://upstrive.xo.je/backend/login.php", {
        method: "POST",
        body: formData,
         credentials: "include",
      });

      const result = await response.json();

      if (result.success) {
        alert("✅ Login successful!");
        window.location.href = "/admin/dashboard"; // redirect after login
      } else {
        alert("❌ " + result.message);
      }
    } catch (err) {
      alert("⚠️ Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form
        onSubmit={handleSubmit}
        className="login-form"
        encType="multipart/form-data"
      >
        <h2>Admin Login</h2>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="toggle-eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "👁️" : "🙈"}
          </span>
        </div>


        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "login"}
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
