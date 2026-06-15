import { useState, useEffect } from "react";
import API from "../api/api";

function AiSuggestion({ onBack }) {
  const [activeTab, setActiveTab] = useState("menu"); // "menu" or "chef"

  // Tab 1: Daily Menu Suggestions States
  const [suggestions, setSuggestions] = useState(null);
  const [menuLoading, setMenuLoading] = useState(true);
  const [menuError, setMenuError] = useState("");
  const [menuLoadStatus, setMenuLoadStatus] = useState("Initializing secure AI model...");

  // Tab 2: Fridge AI Chef States
  const [ingredientsInput, setIngredientsInput] = useState("");
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const [chefLoading, setChefLoading] = useState(false);
  const [chefError, setChefError] = useState("");
  const [chefLoadStatus, setChefLoadStatus] = useState("Preparing kitchen space...");

  // Fetch menu suggestions on mount
  const fetchMenuSuggestions = async () => {
    setMenuLoading(true);
    setMenuError("");
    try {
      const statusTimers = [
        setTimeout(() => setMenuLoadStatus("Retrieving user body metrics..."), 300),
        setTimeout(() => setMenuLoadStatus("Analyzing historical logged meals..."), 600),
        setTimeout(() => setMenuLoadStatus("Checking allergen and diet preferences..."), 900),
        setTimeout(() => setMenuLoadStatus("Formulating optimal macro balances..."), 1200),
      ];

      const res = await API.get("/meals/random");
      statusTimers.forEach(clearTimeout);
      setSuggestions(res.data.meals);
    } catch (err) {
      console.log(err);
      setMenuError(
        err.response?.data?.message || "Failed to load meal suggestions"
      );
    } finally {
      setMenuLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuSuggestions();
  }, []);

  // Handle Fridge AI Chef submission
  const handleGenerateRecipe = async (e) => {
    e.preventDefault();
    if (!ingredientsInput.trim()) {
      setChefError("Please enter at least one ingredient!");
      return;
    }

    setChefLoading(true);
    setChefError("");
    setGeneratedRecipe(null);
    setChefLoadStatus("Washing and prep work...");

    try {
      const statusTimers = [
        setTimeout(() => setChefLoadStatus("Analyzing ingredient properties..."), 400),
        setTimeout(() => setChefLoadStatus("Consulting nutrition macro indices..."), 800),
        setTimeout(() => setChefLoadStatus("Formulating recipe steps..."), 1200),
        setTimeout(() => setChefLoadStatus("AI Chef is plating the meal..."), 1600),
      ];

      const ingredientArray = ingredientsInput
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

      const res = await API.post("/meals/recipe", {
        ingredients: ingredientArray,
      });

      statusTimers.forEach(clearTimeout);
      setGeneratedRecipe(res.data.recipe);
    } catch (err) {
      console.log(err);
      setChefError(
        err.response?.data?.message || "Failed to generate recipe. Please try again."
      );
    } finally {
      setChefLoading(false);
    }
  };

  const hasNoHistory = menuError.includes("No food history") || menuError.includes("Track food first");

  return (
    <div className="ai-suggestion-page-container">
      {/* Background Ambient Glows */}
      <div className="ambient-glow glow-left" />
      <div className="ambient-glow glow-right" />

      {/* HEADER ROW */}
      <header className="page-header-row">
        <button onClick={onBack} className="back-dash-btn">
          <span>←</span> Back to Dashboard
        </button>

        {/* Tab switcher navigation */}
        <div className="page-tabs-container">
          <button 
            onClick={() => setActiveTab("menu")} 
            className={`page-tab-btn ${activeTab === "menu" ? "active" : ""}`}
          >
            📋 Daily Menu Suggestions
          </button>
          <button 
            onClick={() => setActiveTab("chef")} 
            className={`page-tab-btn ${activeTab === "chef" ? "active" : ""}`}
          >
            🍳 Fridge AI Chef
          </button>
        </div>
      </header>

      {/* MAIN SCREEN CONTENT */}
      <main className="ai-suggestion-content">
        
        {/* TAB 1: MENU SUGGESTIONS */}
        {activeTab === "menu" && (
          <div className="tab-view-container">
            {menuLoading ? (
              <div className="ai-loader-container">
                <div className="scanning-radar">
                  <div className="radar-line" />
                  <span className="radar-icon">🤖</span>
                </div>
                <h4>Consulting WhatToEat AI</h4>
                <p className="loading-status-text">{menuLoadStatus}</p>
                <div className="loading-pulse-dots">
                  <span className="dot dot-1" />
                  <span className="dot dot-2" />
                  <span className="dot dot-3" />
                </div>
              </div>
            ) : menuError ? (
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
                    <p>{menuError}</p>
                    <div className="error-actions">
                      <button onClick={fetchMenuSuggestions} className="cta-error-btn">
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
          </div>
        )}

        {/* TAB 2: FRIDGE AI CHEF */}
        {activeTab === "chef" && (
          <div className="tab-view-container animate-fade-in">
            <div className="display-header">
              <span className="display-badge">Fridge Chef</span>
              <h2>What's in your Fridge?</h2>
              <p>Type in your available ingredients, and our AI Chef will design a healthy recipe matching your profile goals.</p>
            </div>

            {/* Input Form Card */}
            <div className="chef-input-card">
              <form onSubmit={handleGenerateRecipe} className="chef-form">
                <div className="textarea-wrapper">
                  <textarea
                    placeholder="Enter ingredients (e.g. eggs, spinach, tomatoes, paneer, garlic)"
                    value={ingredientsInput}
                    onChange={(e) => setIngredientsInput(e.target.value)}
                    className="ingredients-textarea"
                    disabled={chefLoading}
                  />
                  <span className="textarea-hint">Separate ingredients with commas</span>
                </div>
                {chefError && <p className="chef-validation-error">{chefError}</p>}
                <button type="submit" className="chef-submit-btn" disabled={chefLoading}>
                  {chefLoading ? "Analyzing Ingredients..." : "Create AI Recipe ✨"}
                </button>
              </form>
            </div>

            {/* Fridge Chef Load State */}
            {chefLoading && (
              <div className="ai-loader-container">
                <div className="cooking-pot-animation">
                  <span className="pot-steam">💨</span>
                  <span className="pot-emoji">🍲</span>
                </div>
                <h4>AI Chef is Cooking</h4>
                <p className="loading-status-text">{chefLoadStatus}</p>
                <div className="loading-pulse-dots">
                  <span className="dot dot-1" />
                  <span className="dot dot-2" />
                  <span className="dot dot-3" />
                </div>
              </div>
            )}

            {/* Display Generated Recipe */}
            {generatedRecipe && !chefLoading && (
              <div className="recipe-cookbook-sheet animate-fade-in">
                <div className="cookbook-header">
                  <span className="cookbook-badge">Custom Recipe</span>
                  <h3 className="recipe-dish-title">{generatedRecipe.dishName}</h3>
                </div>

                <div className="cookbook-body">
                  {/* Left Column: Health Benefit */}
                  <div className="cookbook-benefit-section">
                    <h5>✨ Health Analysis</h5>
                    <p>{generatedRecipe.benefit}</p>
                  </div>

                  {/* Right Column: Steps */}
                  <div className="cookbook-steps-section">
                    <h5>🍳 Preparation Steps</h5>
                    <ol className="cookbook-steps-list">
                      {generatedRecipe.recipe.map((step, index) => (
                        <li key={index} className="cookbook-step-item">
                          <span className="step-number-bullet">{index + 1}</span>
                          <span className="step-text">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            )}
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
          margin-bottom: 50px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
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

        /* Tabs Styling */
        .page-tabs-container {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 4px;
          display: flex;
          gap: 4px;
        }

        .page-tab-btn {
          background: transparent;
          border: none;
          color: #a0b299;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .page-tab-btn.active {
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.08);
        }

        .ai-suggestion-content {
          position: relative;
          z-index: 10;
          max-width: 1000px;
          margin: 0 auto;
        }

        .tab-view-container {
          width: 100%;
        }

        /* LOADING RADAR SCREEN */
        .ai-loader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 380px;
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

        /* COOKING POT ANIMATION */
        .cooking-pot-animation {
          font-size: 3.5rem;
          position: relative;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }

        @keyframes steamFloat {
          0% { transform: translateY(0) scale(0.8); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-25px) scale(1.1); opacity: 0; }
        }

        .pot-steam {
          position: absolute;
          top: -10px;
          font-size: 1.5rem;
          animation: steamFloat 1.2s infinite ease-in-out;
        }

        .pot-emoji {
          display: inline-block;
        }

        /* ERROR CONTAINER */
        .ai-error-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 380px;
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
          margin-bottom: 40px;
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
          background: rgba(12, 19, 15, 0.45);
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
          margin-top: 20px;
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

        /* FRIDGE AI CHEF PANEL STYLE */
        .chef-input-card {
          background: rgba(12, 19, 15, 0.5);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 36px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05);
          max-width: 650px;
          margin: 0 auto 40px auto;
          position: relative;
        }

        .chef-input-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(to bottom, #10b981, #34d399);
          border-radius: 20px 0 0 20px;
        }

        .chef-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .textarea-wrapper {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .ingredients-textarea {
          background: rgba(6, 9, 7, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 16px;
          color: #ffffff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.95rem;
          min-height: 120px;
          resize: vertical;
          outline: none;
          transition: border-color 0.3s ease;
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.5);
        }

        .ingredients-textarea:focus {
          border-color: #10b981;
        }

        .textarea-hint {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.72rem;
          color: #a0b299;
          margin-left: 4px;
        }

        .chef-validation-error {
          color: #ef4444;
          font-size: 0.85rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 600;
        }

        .chef-submit-btn {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border: none;
          color: white;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          padding: 14px;
          border-radius: 10px;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(16,185,129,0.25);
          transition: all 0.3s ease;
        }

        .chef-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16,185,129,0.35);
        }

        .chef-submit-btn:disabled {
          background: #27372d;
          color: #556c5e;
          cursor: not-allowed;
          box-shadow: none;
        }

        /* COOKBOOK RECIPE DISPLAY SHEET */
        .recipe-cookbook-sheet {
          background: rgba(12, 19, 15, 0.45);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05);
          margin-top: 20px;
          position: relative;
        }

        .recipe-cookbook-sheet::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(to bottom, #10b981, #34d399);
          border-radius: 20px 0 0 20px;
        }

        .cookbook-header {
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding-bottom: 24px;
          margin-bottom: 30px;
        }

        .cookbook-badge {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          color: #34d399;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          background: rgba(16, 185, 129, 0.1);
          padding: 4px 10px;
          border-radius: 99px;
          display: inline-block;
          margin-bottom: 12px;
        }

        .recipe-dish-title {
          font-family: 'Fraunces', serif;
          font-size: 2.2rem;
          font-weight: 800;
          color: #ffffff;
        }

        .cookbook-body {
          display: flex;
          gap: 40px;
        }

        .cookbook-benefit-section {
          width: 35%;
          background: rgba(16, 185, 129, 0.03);
          border: 1px solid rgba(16, 185, 129, 0.15);
          border-radius: 14px;
          padding: 20px 24px;
          align-self: flex-start;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .cookbook-benefit-section h5, .cookbook-steps-section h5 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          color: #34d399;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 12px;
          border-bottom: 1px solid rgba(16,185,129,0.1);
          padding-bottom: 6px;
        }

        .cookbook-benefit-section p {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.9rem;
          color: #a0b299;
          line-height: 1.6;
        }

        .cookbook-steps-section {
          width: 65%;
        }

        .cookbook-steps-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cookbook-step-item {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .step-number-bullet {
          background: rgba(16, 185, 129, 0.1);
          border: 1.5px solid rgba(16, 185, 129, 0.35);
          color: #34d399;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          flex-shrink: 0;
          box-shadow: 0 2px 6px rgba(16,185,129,0.1);
        }

        .step-text {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.95rem;
          color: #ffffff;
          line-height: 1.55;
          padding-top: 2px;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        /* RESPONSIVE LAYOUT */
        @media (max-width: 900px) {
          .cookbook-body {
            flex-direction: column;
            gap: 24px;
          }

          .cookbook-benefit-section, .cookbook-steps-section {
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .ai-suggestion-page-container {
            padding: 30px 4%;
          }

          .page-header-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .page-tabs-container {
            width: 100%;
          }

          .page-tab-btn {
            flex: 1;
            font-size: 0.78rem;
            padding: 10px 12px;
          }

          .menu-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .display-header h2 {
            font-size: 2.2rem;
          }

          .recipe-dish-title {
            font-size: 1.8rem;
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
