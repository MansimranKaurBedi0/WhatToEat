import "./App.css";

import { useContext, useState, useRef } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Carousel from "./components/Carousel";
import StoryFlow from "./components/StoryFlow";
import AiSuggestion from "./pages/AiSuggestion";

import { AuthContext } from "./context/AuthContext";
import styles from "./pages/Auth.module.css";

function App() {
  const { isLogin, logout } = useContext(AuthContext);
  const [isLoginView, setIsLoginView] = useState(true);
  const [view, setView] = useState("dashboard");
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
    <div style={{ backgroundColor: "#060907", minHeight: "100vh", color: "#fff" }}>
      {/* Top Header Navigation */}
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 40px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        background: "rgba(12, 19, 15, 0.65)",
        backdropFilter: "blur(10px)",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        <div 
          style={{ fontWeight: "800", fontSize: "1.5rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
          onClick={() => setView("dashboard")}
        >
          WhatToEat 🍽️
        </div>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          {view === "profile" ? (
            <button 
              onClick={() => setView("dashboard")}
              style={{
                background: "transparent",
                color: "#10b981",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "0.9rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
            >
              Dashboard
            </button>
          ) : (
            <button 
              onClick={() => setView("profile")}
              style={{
                background: "transparent",
                color: "#10b981",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "0.9rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
            >
              Edit Profile
            </button>
          )}
          <button 
            onClick={logout}
            style={{
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              color: "#fff",
              border: "none",
              padding: "8px 16px",
              borderRadius: "8px",
              fontSize: "0.9rem",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(16, 185, 129, 0.2)"
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main>
        {view === "profile" ? (
          <Profile onBack={() => setView("dashboard")} />
        ) : view === "ai-suggestion" ? (
          <AiSuggestion onBack={() => setView("dashboard")} />
        ) : (
          <div>
            <Carousel />
            <StoryFlow />
            
            {/* AI Suggestion CTA Banner */}
            <div className="ai-suggestion-banner-container">
              <div className="ai-suggestion-banner-left">
                <h3>Not able to think what to eat?</h3>
                <p>Get personalized AI suggestions based on your previous meals and health metrics.</p>
              </div>
              <div className="ai-suggestion-banner-right">
                <button onClick={() => setView("ai-suggestion")} className="ai-suggestion-banner-btn">
                  Get AI Suggestion ✨
                </button>
              </div>
            </div>

            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <h1 style={{ fontSize: "3rem", marginBottom: "16px", fontWeight: "800", background: "linear-gradient(135deg, #ffffff 60%, #10b981 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Welcome To WhatToEat 🚀
              </h1>
              <p style={{ color: "#a0b299", marginBottom: "10px", fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto" }}>
                Discover and track healthy food choices with AI.
              </p>
            </div>

            <style>{`
              .ai-suggestion-banner-container {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: rgba(12, 19, 15, 0.45);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.05);
                border-radius: 20px;
                padding: 40px 60px;
                margin: 60px 8% 20px 8%;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
                position: relative;
                overflow: hidden;
                z-index: 5;
              }
              .ai-suggestion-banner-left {
                max-width: 65%;
              }
              .ai-suggestion-banner-left h3 {
                font-family: 'Fraunces', serif;
                font-size: 1.8rem;
                font-weight: 700;
                color: #ffffff;
                margin-bottom: 8px;
              }
              .ai-suggestion-banner-left p {
                font-family: 'Plus Jakarta Sans', sans-serif;
                font-size: 0.95rem;
                color: #a0b299;
                line-height: 1.5;
              }
              .ai-suggestion-banner-btn {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                border: none;
                color: #ffffff;
                font-family: 'Plus Jakarta Sans', sans-serif;
                font-size: 0.95rem;
                font-weight: 700;
                padding: 14px 28px;
                border-radius: 10px;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(16, 185, 129, 0.25);
                transition: all 0.3s ease;
                white-space: nowrap;
              }
              .ai-suggestion-banner-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(16, 185, 129, 0.35);
              }
              @media (max-width: 768px) {
                .ai-suggestion-banner-container {
                  flex-direction: column;
                  text-align: center;
                  gap: 20px;
                  padding: 30px;
                  margin: 40px 4% 10px 4%;
                }
                .ai-suggestion-banner-left {
                  max-width: 100%;
                }
                .ai-suggestion-banner-left h3 {
                  font-size: 1.5rem;
                }
              }
            `}</style>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
