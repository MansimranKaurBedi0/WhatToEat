import { useState, useEffect } from "react";
import API from "../api/api";

function AiSuggestion({ onBack }) {
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loadStatus, setLoadStatus] = useState("Initializing secure AI model...");

  const fetchSuggestions = async () => {
    setLoading(true);
    setError("");
    try {
      // Simulate status message changes during loading for premium feel
      const statusTimers = [
        setTimeout(() => setLoadStatus("Retrieving user body metrics..."), 300),
        setTimeout(() => setLoadStatus("Analyzing historical logged meals..."), 600),
        setTimeout(() => setLoadStatus("Checking allergen and diet preferences..."), 900),
        setTimeout(() => setLoadStatus("Formulating optimal macro balances..."), 1200),
      ];

      const res = await API.get("/meals/random");
      
      statusTimers.forEach(clearTimeout);
      setSuggestions(res.data.meals);
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.message || "Failed to load meal suggestions"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const hasNoHistory = error.includes("No food history") || error.includes("Track food first");

  return (
    <div className="ai-suggestion-page-container">
      {/* Background Ambient Glows */}
      <div className="ambient-glow glow-left" />
      <div className="ambient-glow glow-right" />

      {/* HEADER SECTION */}
      <header className="page-header-row">
        <button onClick={onBack} className="back-dash-btn">
          <span>←</span> Back to Dashboard
        </button>
      </header>

      {/* MAIN SCREEN STATES */}
      <main className="ai-suggestion-content">
        {loading ? (
          <div className="ai-loader-container">
            <div className="scanning-radar">
              <div className="radar-line" />
              <span className="radar-icon">🤖</span>
            </div>
            <h4>Consulting WhatToEat AI</h4>
            <p className="loading-status-text">{loadStatus}</p>
            <div className="loading-pulse-dots">
              <span className="dot dot-1" />
              <span className="dot dot-2" />
              <span className="dot dot-3" />
            </div>
          </div>
        ) : error ? (
          <div className="ai-error-container">
            {hasNoHistory ? (
              <div className="empty-history-wrapper">
                <span className="empty-icon">🍽️</span>
                <h3>Need Food Logs First!</h3>
                <p>
                  To suggest personalized meals, the AI needs to check your recent eating habits. Log some foods on the dashboard first!
                </p>
                <div className="error-actions">
                  <button onClick={onBack} className="cta-error-btn">
                    Go to Dashboard
                  </button>
                </div>
              </div>
            ) : (
              <div className="general-error-wrapper">
                <span className="empty-icon">⚠️</span>
                <h3>Failed to Get AI Suggestions</h3>
                <p>{error}</p>
                <div className="error-actions">
                  <button onClick={fetchSuggestions} className="cta-error-btn">
                    Try Again
                  </button>
                  <button onClick={onBack} className="cta-error-btn btn-secondary">
                    Back to Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="ai-suggestions-display animate-fade-in">
            <div className="display-header">
              <span className="display-badge">Tailored For You</span>
              <h2>Your Recommended Menu</h2>
              <p>Based on your health metrics, profile goals, and recent logged history.</p>
            </div>

            {/* Grid of 4 Cards */}
            <div className="menu-grid">
              {/* Breakfast */}
              <div className="menu-card card-breakfast">
                <div className="menu-card-header">
                  <span className="menu-emoji">🍳</span>
                  <span className="menu-label">Breakfast Choice</span>
                </div>
                <h4 className="menu-name">{suggestions.breakfast}</h4>
                <p className="menu-card-description">
                  Rich in clean micronutrients to jumpstart your daily energy indexes.
                </p>
              </div>

              {/* Lunch */}
              <div className="menu-card card-lunch">
                <div className="menu-card-header">
                  <span className="menu-emoji">🥗</span>
                  <span className="menu-label">Optimal Lunch</span>
                </div>
                <h4 className="menu-name">{suggestions.lunch}</h4>
                <p className="menu-card-description">
                  Balanced macros designed to prevent mid-day fatigue and blood sugar spikes.
                </p>
              </div>

              {/* Dinner */}
              <div className="menu-card card-dinner">
                <div className="menu-card-header">
                  <span className="menu-emoji">🍲</span>
                  <span className="menu-label">Balanced Dinner</span>
                </div>
                <h4 className="menu-name">{suggestions.dinner}</h4>
                <p className="menu-card-description">
                  Easy to digest, nutrient-dense proteins to support cellular sleep recovery.
                </p>
              </div>

              {/* Healthy Snack */}
              <div className="menu-card card-snack">
                <div className="menu-card-header">
                  <span className="menu-emoji">🍎</span>
                  <span className="menu-label">Healthy Snack</span>
                </div>
                <h4 className="menu-name">{suggestions.snack}</h4>
                <p className="menu-card-description">
                  Satiating fiber offsets to sustain hunger indexes between your core meals.
                </p>
              </div>
            </div>

            {/* AI Coach Insights block */}
            <div className="ai-coach-bubble-section">
              <div className="coach-avatar">🤖</div>
              <div className="coach-content">
                <h5>Nutritional Coach Reasoning</h5>
                <blockquote className="coach-quote">
                  “{suggestions.reason}”
                </blockquote>
              </div>
            </div>
          </div>
        )}
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        .ai-suggestion-page-container {
          background-color: #060907;
          min-height: calc(100vh - 80px);
          width: 100%;
          position: relative;
          overflow: hidden;
          padding: 40px 8%;
          color: #ffffff;
        }

        .ambient-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(140px);
          z-index: 0;
          opacity: 0.18;
        }
        .glow-left {
          top: 10%;
          left: -150px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 75%);
        }
        .glow-right {
          bottom: 10%;
          right: -150px;
          background: radial-gradient(circle, rgba(52, 211, 153, 0.18) 0%, transparent 75%);
        }

        .page-header-row {
          position: relative;
          z-index: 10;
          margin-bottom: 40px;
        }

        .back-dash-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #a0b299;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          padding: 10px 20px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .back-dash-btn:hover {
          border-color: rgba(16, 185, 129, 0.4);
          color: #10b981;
          transform: translateX(-4px);
        }

        .ai-suggestion-content {
          position: relative;
          z-index: 10;
          max-width: 1000px;
          margin: 0 auto;
        }

        /* LOADING RADAR SCREEN */
        .ai-loader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          text-align: center;
        }

        .scanning-radar {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.03);
          border: 2px solid rgba(16, 185, 129, 0.15);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          box-shadow: 0 0 20px rgba(16,185,129,0.1);
        }

        @keyframes rotateRadar {
          to { transform: rotate(360deg); }
        }

        .radar-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          border: 2px solid transparent;
          border-top-color: #10b981;
          animation: rotateRadar 1.5s linear infinite;
        }

        .radar-icon {
          font-size: 2.2rem;
        }

        .ai-loader-container h4 {
          font-family: 'Fraunces', serif;
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .loading-status-text {
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #a0b299;
          font-size: 0.95rem;
          min-height: 24px;
          margin-bottom: 20px;
        }

        .loading-pulse-dots {
          display: flex;
          gap: 6px;
        }

        @keyframes dotPulse {
          0%, 100% { transform: scale(0.6); opacity: 0.4; }
          50% { transform: scale(1.2); opacity: 1; }
        }

        .loading-pulse-dots .dot {
          width: 8px;
          height: 8px;
          background-color: #10b981;
          border-radius: 50%;
          display: inline-block;
          animation: dotPulse 1.2s infinite ease-in-out;
        }

        .dot-1 { animation-delay: 0s; }
        .dot-2 { animation-delay: 0.2s; }
        .dot-3 { animation-delay: 0.4s; }

        /* ERROR CONTAINER */
        .ai-error-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 400px;
          text-align: center;
        }

        .empty-history-wrapper, .general-error-wrapper {
          background: rgba(12, 19, 15, 0.65);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          padding: 40px 30px;
          max-width: 500px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
        }

        .empty-icon {
          font-size: 3.5rem;
          display: block;
          margin-bottom: 18px;
        }

        .ai-error-container h3 {
          font-family: 'Fraunces', serif;
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .ai-error-container p {
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #a0b299;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 30px;
        }

        .cta-error-btn {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border: none;
          color: white;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(16,185,129,0.25);
          transition: all 0.3s ease;
        }

        .cta-error-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16,185,129,0.35);
        }

        .btn-secondary {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.15);
          margin-left: 10px;
          box-shadow: none;
        }
        .btn-secondary:hover {
          background: rgba(255,255,255,0.03);
          border-color: rgba(255,255,255,0.3);
        }

        /* RECOMMENDATIONS SCREEN */
        .ai-suggestions-display {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .display-header {
          text-align: center;
        }

        .display-badge {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          color: #34d399;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 6px 14px;
          border-radius: 99px;
          display: inline-block;
          margin-bottom: 14px;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .display-header h2 {
          font-family: 'Fraunces', serif;
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 12px;
          background: linear-gradient(135deg, #ffffff 40%, #10b981 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }

        .display-header p {
          color: #a0b299;
          font-size: 1.1rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .menu-card {
          background: rgba(12, 19, 15, 0.55);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 26px 30px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }

        .menu-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(to bottom, #10b981, #34d399);
          border-radius: 20px 0 0 20px;
        }

        .menu-card:hover {
          transform: translateY(-4px);
          border-color: rgba(16, 185, 129, 0.3);
          box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 0 20px rgba(16,185,129,0.12), inset 0 1px 0 rgba(255,255,255,0.05);
        }

        .menu-card-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }

        .menu-emoji {
          font-size: 1.8rem;
        }

        .menu-label {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          color: #a0b299;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .menu-name {
          font-family: 'Fraunces', serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 12px;
          line-height: 1.4;
        }

        .menu-card-description {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.88rem;
          color: #a0b299;
          line-height: 1.5;
        }

        /* AI COACH REASON BLOCK */
        .ai-coach-bubble-section {
          background: rgba(16, 185, 129, 0.03);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 20px;
          padding: 28px;
          display: flex;
          gap: 20px;
          align-items: flex-start;
          box-shadow: 0 8px 30px rgba(0,0,0,0.3);
        }

        .coach-avatar {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(16,185,129,0.2);
        }

        .coach-content {
          flex: 1;
        }

        .coach-content h5 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          color: #34d399;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
        }

        .coach-quote {
          font-family: 'Fraunces', serif;
          font-size: 1.15rem;
          font-style: italic;
          color: #ffffff;
          line-height: 1.6;
          margin: 0;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        /* RESPONSIVE LAYOUT */
        @media (max-width: 768px) {
          .ai-suggestion-page-container {
            padding: 30px 4%;
          }

          .menu-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .display-header h2 {
            font-size: 2.2rem;
          }

          .ai-coach-bubble-section {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 14px;
          }
        }
      `}</style>
    </div>
  );
}

export default AiSuggestion;
