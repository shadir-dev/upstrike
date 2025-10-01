import React, { useState, useEffect, useRef } from "react";
import "./header.css";
import logo from "../../assets/image.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const servicesDropdownRef = useRef(null);
  const contactsDropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
    if (window.innerWidth <= 968) {
      document.body.style.overflow = isMenuOpen ? "auto" : "hidden";
    }
  };

  const toggleServices = () => {
    if (window.innerWidth <= 968) setIsServicesOpen(prev => !prev);
  };

  const toggleContacts = () => {
    if (window.innerWidth <= 968) setIsContactsOpen(prev => !prev);
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(e.target)) {
        setIsServicesOpen(false);
      }
      if (contactsDropdownRef.current && !contactsDropdownRef.current.contains(e.target)) {
        setIsContactsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close menu when link clicked
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
    setIsContactsOpen(false);
    document.body.style.overflow = "auto";
  };

  // Handle contacts click - navigate to contacts page and close dropdown
  const handleContactsClick = (e) => {
    e.preventDefault();
    closeMenu();
    window.location.href = "/contacts";
  };

  // Reset on resize
  useEffect(() => {
    const resizeHandler = () => {
      if (window.innerWidth > 968) {
        setIsMenuOpen(false);
        setIsServicesOpen(false);
        setIsContactsOpen(false);
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
          aria-expanded={isMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Navigation */}
        <nav className={`nav ${isMenuOpen ? "show" : ""}`} aria-hidden={!isMenuOpen}>
          <a href="/home" onClick={closeMenu}>Home</a>
          <a href="/about" onClick={closeMenu}>About</a>

          {/* Services Dropdown */}
          <div className={`dropdown ${isServicesOpen ? "open" : ""}`} ref={servicesDropdownRef}>
            <button
              className="dropdown-trigger"
              onClick={toggleServices}
              onMouseEnter={() => window.innerWidth > 968 && setIsServicesOpen(true)}
              aria-expanded={isServicesOpen}
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

          {/* Contacts Dropdown */}
          <div className={`dropdown ${isContactsOpen ? "open" : ""}`} ref={contactsDropdownRef}>
            <div className="contacts-trigger-container">
              <a 
                href="/contacts" 
                className="contacts-link"
                onClick={handleContactsClick}
              >
                Contacts
              </a>
              <button
                className="dropdown-arrow-btn"
                onClick={toggleContacts}
                onMouseEnter={() => window.innerWidth > 968 && setIsContactsOpen(true)}
                aria-expanded={isContactsOpen}
                aria-label="Toggle contacts dropdown"
              >
                <span className="arrow">▾</span>
              </button>
            </div>
            <div
              className="dropdown-menu contacts-dropdown"
              onMouseLeave={() => window.innerWidth > 968 && setIsContactsOpen(false)}
            >
              <a
                href="mailto:info@yourcompany.com"
                className="dropdown-item"
                onClick={closeMenu}
              >
                <span className="dropdown-icon">✉️</span>
                Email Us
              </a>
              <a
                href="https://wa.me/254743187210"
                target="_blank"
                rel="noopener noreferrer"
                className="dropdown-item"
                onClick={closeMenu}
              >
                <span className="dropdown-icon">💬</span>
                WhatsApp
              </a>
              <a
                href="/contacts"
                className="dropdown-item all-contacts"
                onClick={closeMenu}
              >
                <span className="dropdown-icon">📞</span>
                All Contacts
              </a>
            </div>
          </div>

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