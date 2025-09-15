import React, { useState, useEffect, useRef } from "react";
import "./header.css";
import logo from "../../assets/image.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
    if (window.innerWidth <= 968) {
      document.body.style.overflow = isMenuOpen ? "auto" : "hidden";
    }
  };

  const toggleServices = () => {
    if (window.innerWidth <= 968) setIsServicesOpen(prev => !prev);
  };

  // close dropdown on outside click
  useEffect(() => {
    const handler = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // close menu when link clicked
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
    document.body.style.overflow = "auto";
  };

  // reset on resize
  useEffect(() => {
    const resizeHandler = () => {
      if (window.innerWidth > 968) {
        setIsMenuOpen(false);
        setIsServicesOpen(false);
        document.body.style.overflow = "auto";
      }
    };
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return (
    <header className="header">
      <div className="header-inner">
        {/* Logo */}
        <a href="/home" className="logo">
          <img src={logo} alt="Upstrike Logo" className="logo-img" />
        </a>

        {/* Hamburger (mobile) */}
        <button
          className={`menu-toggle ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>

        {/* Navigation */}
        <nav className={`nav ${isMenuOpen ? "show" : ""}`}>
          <a href="/home" onClick={closeMenu}>Home</a>
          <a href="/about" onClick={closeMenu}>About</a>

          <div className={`dropdown ${isServicesOpen ? "open" : ""}`} ref={dropdownRef}>
            <button
              className="dropdown-trigger"
              onClick={toggleServices}
              onMouseEnter={() => window.innerWidth > 968 && setIsServicesOpen(true)}
            >
              Services <span className="arrow">▾</span>
            </button>
            <div
              className="dropdown-menu"
              onMouseLeave={() => window.innerWidth > 968 && setIsServicesOpen(false)}
            >
              {["Branding", "Printing", "Design"].map(item => (
                <a key={item} href={`/services#${item.toLowerCase()}`} onClick={closeMenu}>
                  {item}
                </a>
              ))}
            </div>
          </div>

          <a href="/gallery" onClick={closeMenu}>Gallery</a>
          <a href="/clientelle" onClick={closeMenu}>Clientelle</a>
          <a href="/contacts" onClick={closeMenu}>Contacts</a>
          <a
            href="https://wa.me/254743187210"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-link"
            onClick={closeMenu}
          >
            +254743187210
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
