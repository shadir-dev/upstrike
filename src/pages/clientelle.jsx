import React, { useState, useEffect } from "react";
import "./cliantelle.css";

const Clientelle = () => {
  const [clients, setClients] = useState([]);
  const [filter, setFilter] = useState("All");
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const industries = [
    "All",
  ];

  useEffect(() => {
    fetch("http://localhost/cliantelle_projects/backend/get_client.php?action=get")
      .then((r) => r.json())
      .then((data) =>
        setClients(
          data.map((c) => ({
            ...c,
            logo_url: c.logo
              ? `http://localhost/cliantelle_projects/backend/${c.logo}`
              : null,
          }))
        )
      )
      .catch((e) => console.error("Error fetching clients:", e));
  }, []);

  useEffect(() => {
    fetch("http://localhost/cliantelle_projects/backend/home.php")
      .then((r) => r.json())
      .then((d) => d.testimonials && setTestimonials(d.testimonials))
      .catch((e) => console.error("Error fetching testimonials:", e));
  }, []);

  useEffect(() => {
    if (!testimonials.length) return;
    const timer = setInterval(
      () => setTestimonialIndex((i) => (i + 1) % testimonials.length),
      5000
    );
    return () => clearInterval(timer);
  }, [testimonials]);

  const filtered =
    filter === "All" ? clients : clients.filter((c) => c.industry === filter);

  return (
    <div className="clientelle-page">
      <div className="overlay">
        <header className="hero">
          <h1>Our Valued Clients</h1>
          <div className="vertical-text-flow">
            <p>We serve:</p>
            <div className="client-types">
              <span>Small and medium businesses</span>
              <span>Corporates and institutions</span>
              <span>Schools, colleges, and universities</span>
              <span>NGOs and community organizations</span>
              <span>Events, exhibitions, and personal projects</span>
            </div>
          </div>
        </header>

        <section className="testimonials">
          <h2>Client Testimonials</h2>
          {testimonials.length > 0 ? (
            <div className="testimonial" key={testimonialIndex}>
              <p className="text">
                "{testimonials[testimonialIndex].text}"
              </p>
              <h4>{testimonials[testimonialIndex].name}</h4>
              <span>{testimonials[testimonialIndex].company}</span>
              <div className="rating">⭐ {testimonials[testimonialIndex].rating}</div>
            </div>
          ) : (
            <p>Loading testimonials…</p>
          )}
        </section>

        <section className="clients">
          <h2>Our Clients</h2>

          <div className="filters">
            {industries.map((ind) => (
              <button
                key={ind}
                className={filter === ind ? "active" : ""}
                onClick={() => setFilter(ind)}
              >
                {ind}
              </button>
            ))}
          </div>

          <div className="logo-grid">
            {filtered.length ? (
              filtered.map((c) => (
                <div key={c.id} className="logo-item">
                  {c.logo_url ? (
                    <img src={c.logo_url} alt={c.name} />
                  ) : (
                    <span>{c.name}</span>
                  )}
                </div>
              ))
            ) : (
              <p>No clients available.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Clientelle;