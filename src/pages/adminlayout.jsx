import React, { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import "./admin.css";

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    // Clear token/session later when backend is ready
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${isSidebarOpen ? "" : "sidebar-collapsed"}`}>
        <div className="sidebar-header">
          <h2 className="logo">Upstrike Admin</h2>
          <p className="logo-subtitle">Content Management System</p>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link 
                to="/admin/dashboard" 
                className={isActive("/admin/dashboard") ? "active" : ""}
              >
                <span className="nav-icon">📊</span>
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/home" 
                className={isActive("/admin/home") ? "active" : ""}
              >
                <span className="nav-icon">🏠</span>
                Manage Messages
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/about" 
                className={isActive("/admin/about") ? "active" : ""}
              >
                <span className="nav-icon">ℹ️</span>
                Manage About
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/services" 
                className={isActive("/admin/services") ? "active" : ""}
              >
                <span className="nav-icon">🎨</span>
                Manage Services
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/gallery" 
                className={isActive("/admin/gallery") ? "active" : ""}
              >
                <span className="nav-icon">🖼️</span>
                Manage Gallery
              </Link>
            </li>
           
            
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <span className="nav-icon">🚪</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;