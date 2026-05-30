import "./App.css";

import { useContext, useState, useRef } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { AuthContext } from "./context/AuthContext";
import styles from "./pages/Auth.module.css";

function App() {
  const { isLogin, logout } = useContext(AuthContext);
  const [isLoginView, setIsLoginView] = useState(true);
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  // Mouse Move tracking for Spotlight gradient & 3D tilt
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty("--mouse-x", `${x}px`);
    containerRef.current.style.setProperty("--mouse-y", `${y}px`);

    const card = cardRef.current;
    if (card) {
      const cardRect = card.getBoundingClientRect();
      const cardX = cardRect.left + cardRect.width / 2;
      const cardY = cardRect.top + cardRect.height / 2;
      
      // Calculate tilt angles based on cursor offset from card center (max tilt 10 degrees)
      const angleX = (e.clientY - cardY) / (cardRect.height / 2) * -10;
      const angleY = (e.clientX - cardX) / (cardRect.width / 2) * 10;
      
      card.style.setProperty("--tilt-x", `${angleX}deg`);
      card.style.setProperty("--tilt-y", `${angleY}deg`);

      // Light shine overlay position relative to the card
      const shineX = e.clientX - cardRect.left;
      const shineY = e.clientY - cardRect.top;
      card.style.setProperty("--shine-x", `${shineX}px`);
      card.style.setProperty("--shine-y", `${shineY}px`);
      card.style.setProperty("--shine-opacity", "1");
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
      card.style.setProperty("--shine-opacity", "0");
    }
  };

  // Touch Move tracking for mobile Spotlight gradient & Shine
  const handleTouchStart = (e) => {
    if (!containerRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    containerRef.current.style.setProperty("--mouse-x", `${x}px`);
    containerRef.current.style.setProperty("--mouse-y", `${y}px`);

    const card = cardRef.current;
    if (card && e.touches[0]) {
      const cardRect = card.getBoundingClientRect();
      const shineX = e.touches[0].clientX - cardRect.left;
      const shineY = e.touches[0].clientY - cardRect.top;
      card.style.setProperty("--shine-x", `${shineX}px`);
      card.style.setProperty("--shine-y", `${shineY}px`);
      card.style.setProperty("--shine-opacity", "0.5");
    }
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    containerRef.current.style.setProperty("--mouse-x", `${x}px`);
    containerRef.current.style.setProperty("--mouse-y", `${y}px`);

    const card = cardRef.current;
    if (card && e.touches[0]) {
      const cardRect = card.getBoundingClientRect();
      const shineX = e.touches[0].clientX - cardRect.left;
      const shineY = e.touches[0].clientY - cardRect.top;
      card.style.setProperty("--shine-x", `${shineX}px`);
      card.style.setProperty("--shine-y", `${shineY}px`);
    }
  };

  const handleTouchEnd = () => {
    const card = cardRef.current;
    if (card) {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
      card.style.setProperty("--shine-opacity", "0");
    }
  };

  // if user NOT logged in
  if (!isLogin) {
    return (
      <div 
        className={styles['auth-page-container']} 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Underlay revealed by spotlight */}
        <div className={styles['auth-bg-image']} />

        {/* Floating background SVGs */}
        <div className={`${styles['floating-icon']} ${styles['float-1']}`} style={{ top: "12%", left: "10%", width: "42px", height: "42px" }}>
          {/* Leaf */}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.58 1 9.2a7 7 0 0 1-9 8.8z"/>
            <path d="M19 2L9.8 11.2"/>
          </svg>
        </div>
        <div className={`${styles['floating-icon']} ${styles['float-2']}`} style={{ top: "18%", right: "12%", width: "48px", height: "48px" }}>
          {/* Sparkle */}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" />
          </svg>
        </div>
        <div className={`${styles['floating-icon']} ${styles['float-3']}`} style={{ bottom: "15%", left: "12%", width: "52px", height: "52px" }}>
          {/* Heart */}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>
        <div className={`${styles['floating-icon']} ${styles['float-4']}`} style={{ bottom: "10%", right: "10%", width: "38px", height: "38px" }}>
          {/* Apple / Fruit */}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 22c-3.5 0-7-2-7-5.5C5 12 8 8 12 8s7 4 7 8.5c0 3.5-3.5 5.5-7 5.5z"/>
            <path d="M12 8c0-2-1.5-4-3-4"/>
            <path d="M12 5c1-1.5 2.5-2 4-2"/>
          </svg>
        </div>

        <div className={styles['auth-wrapper']}>
          <div className={styles['auth-brand']}>
            <h1>WhatToEat 🍽️</h1>
            <p>Smart AI-Based Health Food Recommendation</p>
          </div>

          <div className={styles['auth-card']} ref={cardRef}>
            {/* Sliding Toggle Pill */}
            <div className={styles['auth-toggle-pill']}>
              <button
                className={`${styles['auth-toggle-btn']} ${isLoginView ? styles.active : ""}`}
                onClick={() => setIsLoginView(true)}
              >
                Login
              </button>
              <button
                className={`${styles['auth-toggle-btn']} ${!isLoginView ? styles.active : ""}`}
                onClick={() => setIsLoginView(false)}
              >
                Sign Up
              </button>
              <div 
                className={styles['auth-toggle-slider']}
                style={{ transform: isLoginView ? "translateX(0)" : "translateX(100%)" }}
              />
            </div>

            {/* Sliding Form Track */}
            <div className={`${styles['auth-slider-track']} ${!isLoginView ? styles['slide-to-signup'] : ""}`}>
              <div className={styles['auth-slide']}>
                <Login toggleView={() => setIsLoginView(false)} />
              </div>
              <div className={styles['auth-slide']}>
                <Signup toggleView={() => setIsLoginView(true)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // if user logged in
  return (
    <div style={{ padding: "40px", textAlign: "center", backgroundColor: "#060907", minHeight: "100vh", color: "#fff" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>Welcome To WhatToEat 🚀</h1>
      <p style={{ color: "#a0b299", marginBottom: "20px" }}>Discover and track healthy food choices with AI.</p>
      <button 
        onClick={logout}
        style={{
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          color: "#fff",
          border: "none",
          padding: "12px 24px",
          borderRadius: "8px",
          fontSize: "1rem",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(16, 185, 129, 0.2)"
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default App;
