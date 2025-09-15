import React, { useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import AOS from "aos";
import "aos/dist/aos.css";
import "./about.css";
import coreImg from "./core.png";
import servicesImg from "./services.png";

const About = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [profile, setProfile] = useState(null);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    fetch("http://localhost/cliantelle_projects/backend/about.php")
      .then((res) => res.json())
      .then((data) => {
        setTeamMembers(data.team || []);
        setProfile(data.profile || null);
      })
      .catch((err) => console.error("Error fetching about data:", err));
  }, []);

  const downloadProfile = () => {
    if (profile?.file_url) {
      window.open(profile.file_url, "_blank");
    } else {
      alert("Company profile not available.");
    }
  };

  // Convert PDF pages to images
  useEffect(() => {
    const loadPdf = async () => {
      if (!profile?.file_url) return;
      try {
        const pdf = await window.pdfjsLib.getDocument(profile.file_url).promise;
        const imgs = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const vp = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = vp.width;
          canvas.height = vp.height;
          await page.render({ canvasContext: ctx, viewport: vp }).promise;
          imgs.push(canvas.toDataURL(""));
        }
        setPages(imgs);
      } catch (err) {
        console.error("Error rendering PDF:", err);
      }
    };
    loadPdf();
  }, [profile]);

  return (
    <div className="about-page">
      {/* HERO */}
      <section className="about-hero">
        <div className="hero-content" data-aos="fade-down">
          <h1>About Upstrive</h1>
          <p>Transforming visions into exceptional digital experiences </p>
        </div>
      </section>

      {/* MISSION / VISION / VALUES / SERVICES */}
      <section className="mission-vision">
        <div className="mv-grid">
          <div className="mv-card card-flow" data-aos="fade-up">
            <div className="card-icon">🎯</div>
            <h3>Our Mission</h3>
            <div className="divider"></div>
            <p>
              To provide exceptional branding, printing, and design solutions that
              inspire creativity, enhance visibility, and add value to our clients'
              personal and business needs.
            </p>
          </div>

          <div className="mv-card card-flow" data-aos="fade-up">
            <div className="card-icon">👁️</div>
            <h3>Our Vision</h3>
            <div className="divider"></div>
            <p>
              To become a leading one-stop branding and printing partner recognized
              for creativity, quality, and customer satisfaction.
            </p>
          </div>

          <div className="mv-card split card-flow" data-aos="fade-right">
            <div className="image-container">
              <img src={coreImg} alt="Core Values" />
            </div>
            <div className="text">
              <div className="card-icon">💎</div>
              <h3>Core Values</h3>
              <div className="divider"></div>
              <ul>
                <li>Creativity – Unique solutions that stand out.</li>
                <li>Quality – High standards in printing & design.</li>
                <li>Customer-Centricity – Your goals come first.</li>
                <li>Innovation – Embracing modern technologies.</li>
                <li>Reliability – On time, every time.</li>
              </ul>
            </div>
          </div>

          <div className="mv-card split reverse card-flow" data-aos="fade-left">
            <div className="text">
              <div className="card-icon">🚀</div>
              <h3>Our Services</h3>
              <div className="divider"></div>
              <ul>
                <li>Printing – Digital, large-format, banners, books, cards.</li>
                <li>Branding – Shirts, hoodies, mugs, corporate gifts.</li>
                <li>Design – Logos, custom graphics, artwork.</li>
                <li>Lamination – UV, Matt, Glossy, Frost, 3D Lamination.</li>
              </ul>
            </div>
            <div className="image-container">
              <img src={servicesImg} alt="Services" />
            </div>
          </div>
        </div>
      </section>

      {/* COMPANY PROFILE */}
      <section className="company-profile">
        <div className="profile-content">
          <div className="profile-info" data-aos="zoom-in">
            <h2>Company Profile</h2>
            <p>View our comprehensive company profile or download it below.</p>
            <button className="btn-primary" onClick={downloadProfile}>
              Download Company Profile (PDF)
            </button>
          </div>

          <div className="profile-preview" data-aos="fade-up">
            {pages.length > 0 ? (
              <HTMLFlipBook
                width={400}
                height={565}
                showCover
                flippingTime={800}
                className="company-profile-flipbook"
              >
                {pages.map((img, idx) => (
                  <div key={idx} className="page">
                    <img src={img} alt={`page-${idx + 1}`} />
                  </div>
                ))}
              </HTMLFlipBook>
            ) : (
              <div className="profile-placeholder">
                <p>Loading company profile…</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;