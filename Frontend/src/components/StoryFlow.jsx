import { useState, useEffect } from "react";

function StoryFlow() {
  // Step 1: Dilemma State
  const [dilemmaChoice, setDilemmaChoice] = useState("pizza"); // pizza, burger, salad

  // Step 2: Meal Logger State
  const [recentMeals, setRecentMeals] = useState([
    { id: 1, name: "Pizza Slice", health: "unhealthy" },
    { id: 2, name: "Double Cheeseburger", health: "unhealthy" },
    { id: 3, name: "French Fries", health: "unhealthy" },
  ]);
  const [healthScore, setHealthScore] = useState(32);

  const handleLogFood = (foodName, isHealthy) => {
    const newMeal = {
      id: Date.now(),
      name: foodName,
      health: isHealthy ? "healthy" : "unhealthy"
    };
    const updatedMeals = [newMeal, ...recentMeals.slice(0, 2)];
    setRecentMeals(updatedMeals);

    // Recalculate score based on current items
    const healthyCount = updatedMeals.filter(m => m.health === "healthy").length;
    const newScore = Math.round((healthyCount / updatedMeals.length) * 100);
    setHealthScore(newScore);
  };

  const resetLogger = () => {
    setRecentMeals([
      { id: 1, name: "Pizza Slice", health: "unhealthy" },
      { id: 2, name: "Double Cheeseburger", health: "unhealthy" },
      { id: 3, name: "French Fries", health: "unhealthy" },
    ]);
    setHealthScore(32);
  };

  // Step 3: AI Recommendation State
  const [aiLoading, setAiLoading] = useState(false);
  const [recommendation, setRecommendation] = useState("Greek Quinoa Bowl & Baked Tofu");
  const [pulseCount, setPulseCount] = useState(0);

  const recommendations = [
    "Greek Quinoa Bowl & Baked Tofu",
    "Avocado Toast with Poached Egg",
    "Grilled Paneer Salad with Mint Vinaigrette",
    "High-Protein Green Smoothie Bowl",
    "Steamed Sprouts & Oats Chilla",
    "Baked Salmon with Asparagus"
  ];

  const handleAiScan = () => {
    if (aiLoading) return;
    setAiLoading(true);
    let index = 0;
    const interval = setInterval(() => {
      setRecommendation(recommendations[index % recommendations.length]);
      index++;
    }, 120);

    setTimeout(() => {
      clearInterval(interval);
      const finalRec = recommendations[Math.floor(Math.random() * recommendations.length)];
      setRecommendation(finalRec);
      setAiLoading(false);
      setPulseCount(prev => prev + 1);
    }, 1200);
  };

  // Step 4: Smart Modes State
  const [activeModeTab, setActiveModeTab] = useState("mood"); // mood, weather, trending, recipe
  const [selectedMood, setSelectedMood] = useState("");
  const [recipeFlipped, setRecipeFlipped] = useState(false);

  // Step 5: Tracking Loop State
  const [daysClean, setDaysClean] = useState(4); // 1 to 7 days

  const getDilemmaCharacter = () => {
    if (dilemmaChoice === "pizza") {
      return { emoji: "😋", text: "Pizza looks delicious... but my fitness goals will suffer.", color: "#f59e0b" };
    } else if (dilemmaChoice === "burger") {
      return { emoji: "🤤", text: "Double cheese burger is tempting, but too much fat and sodium.", color: "#ef4444" };
    } else {
      return { emoji: "🤩", text: "Fresh avocado and greens! Nourishing, clean, and energizing.", color: "#10b981" };
    }
  };

  const getHealthScoreColor = (score) => {
    if (score < 40) return "#ef4444"; // red
    if (score < 70) return "#f59e0b"; // yellow
    return "#10b981"; // green
  };

  const getMoodRecommendation = (mood) => {
    switch (mood) {
      case "happy": return "Celebrate with a Fresh Berry & Kiwi Parfait! 🎉";
      case "lazy": return "Quick & Cozy: 15-Minute Dal & Brown Rice Bowl 🍲";
      case "craving": return "Craving satisfied: Air-fried Sweet Potato Wedges & Hummus 🍟";
      default: return "Select a mood to get instant tailored ideas.";
    }
  };

  return (
    <section className="story-flow-section" id="how-it-works">
      {/* SVG definitions for gradients & glows */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="trailGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <filter id="neonBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <div className="section-header">
        <span className="section-badge">Our Method</span>
        <h2>Your Food Journey</h2>
        <p>A beautifully continuous flow from daily hunger dilemmas to vibrant, healthy living.</p>
      </div>

      <div className="story-trail-container">
        {/* Ambient Glow Blobs for Background Depth */}
        <div className="trail-glow glow-1" />
        <div className="trail-glow glow-2" />
        <div className="trail-glow glow-3" />
        <div className="trail-glow glow-4" />

        {/* Winding Trail SVG for Desktop */}
        <svg className="desktop-trail-svg" viewBox="0 0 1000 2700" preserveAspectRatio="none">
          {/* Topographic organic background contours */}
          <path d="M 150,0 Q 80,450 180,900 T 50,1800 T 120,2700" fill="none" stroke="rgba(16, 185, 129, 0.025)" strokeWidth="1.5" />
          <path d="M 850,0 Q 920,450 820,900 T 950,1800 T 880,2700" fill="none" stroke="rgba(16, 185, 129, 0.025)" strokeWidth="1.5" />

          {/* Intricate horizontal linkage guides to connect cards & simulators */}
          <line x1="210" y1="225" x2="790" y2="225" stroke="rgba(16, 185, 129, 0.08)" strokeWidth="1.5" strokeDasharray="5 5" />
          <line x1="210" y1="675" x2="790" y2="675" stroke="rgba(16, 185, 129, 0.08)" strokeWidth="1.5" strokeDasharray="5 5" />
          <line x1="210" y1="1125" x2="790" y2="1125" stroke="rgba(16, 185, 129, 0.08)" strokeWidth="1.5" strokeDasharray="5 5" />
          <line x1="210" y1="1575" x2="790" y2="1575" stroke="rgba(16, 185, 129, 0.08)" strokeWidth="1.5" strokeDasharray="5 5" />
          <line x1="210" y1="2025" x2="790" y2="2025" stroke="rgba(16, 185, 129, 0.08)" strokeWidth="1.5" strokeDasharray="5 5" />
          <line x1="210" y1="2475" x2="790" y2="2475" stroke="rgba(16, 185, 129, 0.08)" strokeWidth="1.5" strokeDasharray="5 5" />

          {/* Active Winding Path: Double layered for glow aura */}
          <path
            d="M 500,0 C 500,75 210,112.5 210,225 C 210,400 790,500 790,675 C 790,850 210,950 210,1125 C 210,1300 790,1400 790,1575 C 790,1750 210,1850 210,2025 C 210,2200 790,2300 790,2475 C 790,2587.5 500,2625 500,2700"
            fill="none"
            stroke="rgba(16, 185, 129, 0.16)"
            strokeWidth="8"
            filter="url(#neonBlur)"
          />
          <path
            d="M 500,0 C 500,75 210,112.5 210,225 C 210,400 790,500 790,675 C 790,850 210,950 210,1125 C 210,1300 790,1400 790,1575 C 790,1750 210,1850 210,2025 C 210,2200 790,2300 790,2475 C 790,2587.5 500,2625 500,2700"
            fill="none"
            stroke="url(#trailGrad)"
            strokeWidth="3"
            strokeDasharray="12 8"
            className="flowing-trail-path"
          />

          {/* Pulsing Glass concentric nodes at card coordinates */}
          {/* Node 1 */}
          <circle cx="210" cy="225" r="14" fill="rgba(16,185,129,0.12)" className="pulse-ring-outer" />
          <circle cx="210" cy="225" r="8" fill="none" stroke="#34d399" strokeWidth="1.2" />
          <circle cx="210" cy="225" r="4" fill="#10b981" />

          {/* Node 2 */}
          <circle cx="790" cy="675" r="14" fill="rgba(52,211,153,0.12)" className="pulse-ring-outer" />
          <circle cx="790" cy="675" r="8" fill="none" stroke="#34d399" strokeWidth="1.2" />
          <circle cx="790" cy="675" r="4" fill="#34d399" />

          {/* Node 3 */}
          <circle cx="210" cy="1125" r="14" fill="rgba(16,185,129,0.12)" className="pulse-ring-outer" />
          <circle cx="210" cy="1125" r="8" fill="none" stroke="#34d399" strokeWidth="1.2" />
          <circle cx="210" cy="1125" r="4" fill="#10b981" />

          {/* Node 4 */}
          <circle cx="790" cy="1575" r="14" fill="rgba(52,211,153,0.12)" className="pulse-ring-outer" />
          <circle cx="790" cy="1575" r="8" fill="none" stroke="#34d399" strokeWidth="1.2" />
          <circle cx="790" cy="1575" r="4" fill="#34d399" />

          {/* Node 5 */}
          <circle cx="210" cy="2025" r="14" fill="rgba(16,185,129,0.12)" className="pulse-ring-outer" />
          <circle cx="210" cy="2025" r="8" fill="none" stroke="#34d399" strokeWidth="1.2" />
          <circle cx="210" cy="2025" r="4" fill="#10b981" />

          {/* Node 6 */}
          <circle cx="790" cy="2475" r="14" fill="rgba(5,150,105,0.12)" className="pulse-ring-outer" />
          <circle cx="790" cy="2475" r="8" fill="none" stroke="#059669" strokeWidth="1.2" />
          <circle cx="790" cy="2475" r="4" fill="#059669" />
        </svg>

        {/* Mobile vertical SVG line */}
        <svg className="mobile-trail-svg" viewBox="0 0 20 2700" preserveAspectRatio="none">
          <line x1="10" y1="0" x2="10" y2="2700" stroke="url(#trailGrad)" strokeWidth="3" strokeDasharray="8 6" className="flowing-trail-path" />
          <circle cx="10" cy="225" r="5" fill="#10b981" className="pulsing-node" />
          <circle cx="10" cy="675" r="5" fill="#34d399" className="pulsing-node" />
          <circle cx="10" cy="1125" r="5" fill="#10b981" className="pulsing-node" />
          <circle cx="10" cy="1575" r="5" fill="#34d399" className="pulsing-node" />
          <circle cx="10" cy="2025" r="5" fill="#10b981" className="pulsing-node" />
          <circle cx="10" cy="2475" r="5" fill="#059669" className="pulsing-node" />
        </svg>

        {/* Narrative Crossover Badges Centered on SVG Crossovers */}
        <div className="trail-badge badge-1">You check recent history ➔</div>
        <div className="trail-badge badge-2">AI triggers smart suggestions ➔</div>
        <div className="trail-badge badge-3">Tailor to your daily vibe ➔</div>
        <div className="trail-badge badge-4">Log clean food choices ➔</div>
        <div className="trail-badge badge-5">Watch your vitals rise! ➔</div>

        {/* Row 1: Dilemma (Card Left, Visual Right) */}
        <div className="trail-row">
          <div className="trail-watermark">Dilemma</div>
          <div className="trail-col-left">
            <div className="story-card">
              <div className="card-header">
                <span className="story-tag-indicator">Hungry?</span>
              </div>
              <h3 className="card-title">The Daily Struggle</h3>
              <p className="card-description">
                It starts with a question: "What should I eat today?" You feel torn between fast food cravings and your wellness goals.
              </p>
            </div>
          </div>
          <div className="trail-col-center" />
          <div className="trail-col-right">
            <div className="interactive-widget-container">
              <div className="dilemma-simulator">
                <div className="character-avatar" style={{ border: `2px solid ${getDilemmaCharacter().color}` }}>
                  <span className="character-emoji">{getDilemmaCharacter().emoji}</span>
                </div>
                <div className="thought-bubble" style={{ borderColor: getDilemmaCharacter().color }}>
                  <p>{getDilemmaCharacter().text}</p>
                </div>
                <div className="dilemma-options">
                  <button onClick={() => setDilemmaChoice("pizza")} className={`dilemma-btn ${dilemmaChoice === "pizza" ? "active pizza-btn" : ""}`}>🍕 Pizza</button>
                  <button onClick={() => setDilemmaChoice("burger")} className={`dilemma-btn ${dilemmaChoice === "burger" ? "active burger-btn" : ""}`}>🍔 Burger</button>
                  <button onClick={() => setDilemmaChoice("salad")} className={`dilemma-btn ${dilemmaChoice === "salad" ? "active salad-btn" : ""}`}>🥗 Salad</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Meal History (Visual Left, Card Right) */}
        <div className="trail-row">
          <div className="trail-watermark">History</div>
          <div className="trail-col-left">
            <div className="interactive-widget-container">
              <div className="logger-simulator">
                <div className="mock-phone-screen">
                  <div className="phone-header">Recent Food Log</div>
                  <div className="meal-list">
                    {recentMeals.map((meal) => (
                      <div key={meal.id} className="meal-item">
                        <span>{meal.name}</span>
                        <span className={`meal-tag ${meal.health}`}>{meal.health}</span>
                      </div>
                    ))}
                  </div>
                  <div className="health-score-container">
                    <div className="score-label-row">
                      <span>Health Score</span>
                      <span style={{ color: getHealthScoreColor(healthScore), fontWeight: "bold" }}>{healthScore}%</span>
                    </div>
                    <div className="score-bar-bg">
                      <div className="score-bar-fill" style={{ width: `${healthScore}%`, backgroundColor: getHealthScoreColor(healthScore) }} />
                    </div>
                    <p className="score-summary-text">
                      {healthScore < 40 ? "⚠️ Too much junk recently!" : healthScore < 70 ? "👍 Getting better, keep going!" : "🌟 Superb nutrition level!"}
                    </p>
                  </div>
                </div>
                <div className="logger-controls">
                  <button onClick={() => handleLogFood("Garden Green Salad 🥗", true)} className="log-action-btn log-healthy">+ Log Salad</button>
                  <button onClick={() => handleLogFood("French Fries 🍟", false)} className="log-action-btn log-unhealthy">+ Log Fries</button>
                  <button onClick={resetLogger} className="log-action-btn log-reset">Reset</button>
                </div>
              </div>
            </div>
          </div>
          <div className="trail-col-center" />
          <div className="trail-col-right">
            {/* Mobile subtitle for narrative sequence */}
            <div className="mobile-narrative-header">➔ You check recent history</div>
            <div className="story-card">
              <div className="card-header">
                <span className="story-tag-indicator">Facing Reality</span>
              </div>
              <h3 className="card-title">A Look in the Mirror</h3>
              <p className="card-description">
                Your food history speaks. You log recent meals and realize that too much junk food has dragged your health index down.
              </p>
            </div>
          </div>
        </div>

        {/* Row 3: AI Recommendation (Card Left, Visual Right) */}
        <div className="trail-row">
          <div className="trail-watermark">Intelligence</div>
          <div className="trail-col-left">
            {/* Mobile subtitle for narrative sequence */}
            <div className="mobile-narrative-header">➔ AI triggers smart suggestions</div>
            <div className="story-card">
              <div className="card-header">
                <span className="story-tag-indicator">Smart Pivot</span>
              </div>
              <h3 className="card-title">AI to the Rescue</h3>
              <p className="card-description">
                The intelligent recommender engine scans your habits and recommends a healthy meal option designed to balance your diet.
              </p>
            </div>
          </div>
          <div className="trail-col-center" />
          <div className="trail-col-right">
            <div className="interactive-widget-container">
              <div className="ai-simulator">
                <div className={`ai-recommend-card ${aiLoading ? "loading" : ""}`} key={pulseCount}>
                  {aiLoading && <div className="laser-scanner" />}
                  <span className="ai-stars">✨ AI Recommended</span>
                  <div className="recommend-title">{recommendation}</div>
                  <div className="recommend-stats">
                    <span>🟢 380 kcal</span>
                    <span>💪 24g Protein</span>
                  </div>
                  <div className="glow-effect" />
                </div>
                <button onClick={handleAiScan} className="ai-scan-btn" disabled={aiLoading}>
                  {aiLoading ? "Analyzing Vitals..." : "Generate AI Recommendation ✨"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Row 4: Fits Your Day (Visual Left, Card Right) */}
        <div className="trail-row">
          <div className="trail-watermark">Adaptive</div>
          <div className="trail-col-left">
            <div className="interactive-widget-container">
              <div className="modes-simulator">
                <div className="modes-tabs">
                  <button onClick={() => setActiveModeTab("mood")} className={`mode-tab-btn ${activeModeTab === "mood" ? "active" : ""}`}>Mood</button>
                  <button onClick={() => setActiveModeTab("weather")} className={`mode-tab-btn ${activeModeTab === "weather" ? "active" : ""}`}>Weather</button>
                  <button onClick={() => setActiveModeTab("trending")} className={`mode-tab-btn ${activeModeTab === "trending" ? "active" : ""}`}>Trending</button>
                  <button onClick={() => setActiveModeTab("recipe")} className={`mode-tab-btn ${activeModeTab === "recipe" ? "active" : ""}`}>Recipe</button>
                </div>

                <div className="mode-content-display">
                  {/* Mood Tab */}
                  {activeModeTab === "mood" && (
                    <div className="tab-pane mode-mood-pane">
                      <p className="tab-pane-title">Select your mood:</p>
                      <div className="mood-buttons">
                        <button onClick={() => setSelectedMood("happy")} className={`mood-select-btn ${selectedMood === "happy" ? "selected" : ""}`}>😊 Happy</button>
                        <button onClick={() => setSelectedMood("lazy")} className={`mood-select-btn ${selectedMood === "lazy" ? "selected" : ""}`}>🥱 Lazy</button>
                        <button onClick={() => setSelectedMood("craving")} className={`mood-select-btn ${selectedMood === "craving" ? "selected" : ""}`}>😋 Craving</button>
                      </div>
                      <div className="mood-result">
                        <p>{getMoodRecommendation(selectedMood)}</p>
                      </div>
                    </div>
                  )}

                  {/* Weather Tab */}
                  {activeModeTab === "weather" && (
                    <div className="tab-pane mode-weather-pane">
                      <div className="window-frame">
                        <div className="rain-container">
                          <div className="rain-drop drop-1" />
                          <div className="rain-drop drop-2" />
                          <div className="rain-drop drop-3" />
                          <div className="rain-drop drop-4" />
                        </div>
                        <span className="weather-sky">🌧️ Rainy Day</span>
                      </div>
                      <div className="weather-rec">
                        <strong>Cozy Suggestions:</strong>
                        <p>☕ Hot Masala Chai</p>
                        <p>🧅 Baked Pakoras</p>
                      </div>
                    </div>
                  )}

                  {/* Trending Tab */}
                  {activeModeTab === "trending" && (
                    <div className="tab-pane mode-trending-pane">
                      <p className="tab-pane-title">🔥 Trending in your area:</p>
                      <div className="trending-scroller">
                        <div className="trending-scroller-inner">
                          <div className="trending-item">1. Acai Bowls 🍓 (+180%)</div>
                          <div className="trending-item">2. Garlic Butter Paneer 🧄 (+140%)</div>
                          <div className="trending-item">3. Avocado Salad 🥑 (+115%)</div>
                          <div className="trending-item">1. Acai Bowls 🍓 (+180%)</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Recipe Tab */}
                  {activeModeTab === "recipe" && (
                    <div className="tab-pane mode-recipe-pane">
                      <div className={`recipe-card-flip-container ${recipeFlipped ? "flipped" : ""}`} onClick={() => setRecipeFlipped(!recipeFlipped)}>
                        <div className="recipe-card-inner">
                          <div className="recipe-card-front">
                            <div className="recipe-card-image">🥑</div>
                            <h5>Classic Guacamole Salad</h5>
                            <p className="recipe-meta">⏱️ 10 Mins | Easy</p>
                            <span className="recipe-flip-hint">Click card to cook</span>
                          </div>
                          <div className="recipe-card-back">
                            <h5>Directions</h5>
                            <ol className="recipe-steps">
                              <li>Mash avocado with lime juice.</li>
                              <li>Toss diced tomatoes & onions.</li>
                              <li>Season with salt & coriander.</li>
                            </ol>
                            <span className="recipe-flip-hint">Click to return</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="trail-col-center" />
          <div className="trail-col-right">
            {/* Mobile subtitle for narrative sequence */}
            <div className="mobile-narrative-header">➔ Tailor to your daily vibe</div>
            <div className="story-card">
              <div className="card-header">
                <span className="story-tag-indicator">Personalized Vibe</span>
              </div>
              <h3 className="card-title">Fits Your Day</h3>
              <p className="card-description">
                Your day changes, and the recommendations change too. Explore modes based on mood, weather shifts, real-time trends, or cook at home.
              </p>
            </div>
          </div>
        </div>

        {/* Row 5: The Feedback Loop (Card Left, Visual Right) */}
        <div className="trail-row">
          <div className="trail-watermark">Consistency</div>
          <div className="trail-col-left">
            {/* Mobile subtitle for narrative sequence */}
            <div className="mobile-narrative-header">➔ Log clean food choices</div>
            <div className="story-card">
              <div className="card-header">
                <span className="story-tag-indicator">Building the Streak</span>
              </div>
              <h3 className="card-title">The Feedback Loop</h3>
              <p className="card-description">
                Watch your health score climb as clean eating days stack up. Log progress, earn scores, and feel the energy boost.
              </p>
            </div>
          </div>
          <div className="trail-col-center" />
          <div className="trail-col-right">
            <div className="interactive-widget-container">
              <div className="loop-simulator">
                <div className="tracking-score-display">
                  <div className="display-num">{32 + daysClean * 8}%</div>
                  <div className="display-label">Weekly Health Index</div>
                </div>
                <div className="progress-graph-mini">
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                    const isActive = day <= daysClean;
                    const height = 30 + day * 9;
                    return (
                      <div key={day} className="graph-bar-wrapper">
                        <div className={`graph-bar ${isActive ? "active" : ""}`} style={{ height: `${height}%` }} />
                        <span className="graph-day-label">D{day}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="slider-control-container">
                  <label>Days clean: <strong>{daysClean} Days</strong></label>
                  <input type="range" min="1" max="7" value={daysClean} onChange={(e) => setDaysClean(Number(e.target.value))} className="health-range-slider" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 6: Brand Ending (Visual Left, Card Right) */}
        <div className="trail-row">
          <div className="trail-watermark">Habit</div>
          <div className="trail-col-left">
            <div className="interactive-widget-container">
              <div className="brand-simulator">
                <div className="brand-badge-container">
                  <div className="logo-glow" />
                  <div className="mock-logo">
                    <span className="logo-icon">🍽️</span>
                    <h4>WhatToEat</h4>
                    <p>Eat Smart. Based on You.</p>
                  </div>
                </div>
                <a href="#top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="cta-start-btn">Let's Get Started 🚀</a>
              </div>
            </div>
          </div>
          <div className="trail-col-center" />
          <div className="trail-col-right">
            {/* Mobile subtitle for narrative sequence */}
            <div className="mobile-narrative-header">➔ Welcome to a better you!</div>
            <div className="story-card">
              <div className="card-header">
                <span className="story-tag-indicator">Healthy Future</span>
              </div>
              <h3 className="card-title">Living the Habit</h3>
              <p className="card-description">
                WhatToEat transforms healthy choices into automatic, effortless daily habits. Take charge of your body's potential today!
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Great+Vibes&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        .story-flow-section {
          padding: 140px 8%;
          background: #060907;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          position: relative;
          z-index: 5;
          overflow: hidden;
        }

        .section-header {
          text-align: center;
          margin-bottom: 100px;
          position: relative;
          z-index: 10;
        }

        .section-badge {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          color: #34d399;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 6px 14px;
          border-radius: 99px;
          display: inline-block;
          margin-bottom: 20px;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .section-header h2 {
          font-family: 'Fraunces', serif;
          font-size: 3.4rem;
          font-weight: 800;
          margin-bottom: 18px;
          background: linear-gradient(135deg, #ffffff 40%, #10b981 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }

        .section-header p {
          color: #a0b299;
          font-size: 1.2rem;
          max-width: 620px;
          margin: 0 auto;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        /* Winding Trail Container */
        .story-trail-container {
          position: relative;
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
        }

        /* Ambient Glow Elements */
        .trail-glow {
          position: absolute;
          width: 450px;
          height: 450px;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(130px);
          z-index: 0;
          opacity: 0.25;
        }
        .glow-1 {
          top: 5%;
          left: -150px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, transparent 75%);
        }
        .glow-2 {
          top: 30%;
          right: -150px;
          background: radial-gradient(circle, rgba(52, 211, 153, 0.14) 0%, transparent 75%);
        }
        .glow-3 {
          top: 58%;
          left: -150px;
          background: radial-gradient(circle, rgba(5, 150, 105, 0.14) 0%, transparent 75%);
        }
        .glow-4 {
          top: 82%;
          right: -150px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, transparent 75%);
        }

        /* Trail Paths */
        .desktop-trail-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .mobile-trail-svg {
          display: none;
          position: absolute;
          top: 0;
          left: 15px;
          width: 20px;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        @keyframes strokeFlow {
          to {
            stroke-dashoffset: -40;
          }
        }

        .flowing-trail-path {
          animation: strokeFlow 2s linear infinite;
        }

        /* Pulsing nodes directly on the trail */
        @keyframes pulseNodeOuter {
          0% { r: 10px; opacity: 0.25; }
          50% { r: 20px; opacity: 0.75; }
          100% { r: 10px; opacity: 0.25; }
        }

        .pulse-ring-outer {
          animation: pulseNodeOuter 2.8s infinite ease-in-out;
        }

        /* Narrative Crossover Badges */
        .trail-badge {
          position: absolute;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 5;
          background: rgba(12, 19, 15, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1.5px solid rgba(16, 185, 129, 0.4);
          color: #ffffff;
          padding: 8px 20px;
          font-size: 0.72rem;
          font-weight: 700;
          border-radius: 99px;
          white-space: nowrap;
          box-shadow: 0 4px 20px rgba(0,0,0,0.6), 0 0 10px rgba(16, 185, 129, 0.15);
          pointer-events: none;
          font-family: 'Plus Jakarta Sans', sans-serif;
          letter-spacing: 0.03em;
        }

        .badge-1 { top: 16.66%; }
        .badge-2 { top: 33.33%; }
        .badge-3 { top: 50.0%; }
        .badge-4 { top: 66.66%; }
        .badge-5 { top: 83.33%; }

        /* Row structure */
        .trail-row {
          display: flex;
          height: 450px;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        /* Elegant gold-cursive background watermarks from reference layout style */
        .trail-watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Great Vibes', cursive;
          font-size: 8.5rem;
          font-weight: 400;
          color: rgba(245, 158, 11, 0.035); /* Soft, elegant transparent amber gold */
          user-select: none;
          pointer-events: none;
          z-index: 0;
          white-space: nowrap;
        }

        .trail-col-left {
          width: 42%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .trail-col-center {
          width: 16%;
        }

        .trail-col-right {
          width: 42%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        /* Elegant card styling with a left gradient border and editorial typography */
        .story-card {
          width: 100%;
          max-width: 420px;
          background: rgba(12, 19, 15, 0.45);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 18px;
          padding: 28px 32px;
          transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05);
          position: relative;
        }

        .story-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(to bottom, #10b981, #34d399);
          border-radius: 18px 0 0 18px;
        }

        .story-card:hover {
          transform: translateY(-4px) scale(1.02);
          border-color: rgba(16, 185, 129, 0.35);
          box-shadow: 0 16px 45px rgba(0, 0, 0, 0.55), 0 0 25px rgba(16, 185, 129, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .interactive-widget-container {
          width: 100%;
          max-width: 420px;
          background: rgba(12, 19, 15, 0.65);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 18px;
          padding: 24px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
          position: relative;
          z-index: 2;
          transition: border-color 0.3s ease;
        }

        .interactive-widget-container:hover {
          border-color: rgba(16, 185, 129, 0.2);
        }

        .card-header {
          display: flex;
          margin-bottom: 14px;
        }

        .story-tag-indicator {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          color: #34d399;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          background: rgba(16, 185, 129, 0.1);
          padding: 4px 12px;
          border-radius: 99px;
        }

        .card-title {
          font-family: 'Fraunces', serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 12px;
        }

        .card-description {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.92rem;
          color: #a0b299;
          line-height: 1.6;
        }

        .mobile-narrative-header {
          display: none;
        }

        /* WIDGET SIMULATORS */

        /* 1. Dilemma Simulator */
        .dilemma-simulator {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .character-avatar {
          width: 65px;
          height: 65px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }

        .character-emoji {
          font-size: 2.2rem;
        }

        .thought-bubble {
          background: rgba(6, 9, 7, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 12px 16px;
          text-align: center;
          min-height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          width: 100%;
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.5);
        }

        .thought-bubble p {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.82rem;
          color: #a0b299;
          margin: 0;
          line-height: 1.4;
        }

        .dilemma-options {
          display: flex;
          gap: 8px;
          width: 100%;
        }

        .dilemma-btn {
          flex: 1;
          padding: 10px 0;
          font-size: 0.8rem;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
          color: #fff;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 600;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .dilemma-btn:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .dilemma-btn.active.pizza-btn { background: rgba(245, 158, 11, 0.12); border-color: #f59e0b; color: #fbbf24; box-shadow: 0 0 10px rgba(245, 158, 11, 0.15); }
        .dilemma-btn.active.burger-btn { background: rgba(239, 68, 68, 0.12); border-color: #ef4444; color: #fca5a5; box-shadow: 0 0 10px rgba(239, 68, 68, 0.15); }
        .dilemma-btn.active.salad-btn { background: rgba(16, 185, 129, 0.12); border-color: #10b981; color: #34d399; box-shadow: 0 0 10px rgba(16, 185, 129, 0.15); }

        /* 2. Logger Simulator */
        .logger-simulator {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .mock-phone-screen {
          background: #020403;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 14px;
          font-family: monospace;
          font-size: 0.78rem;
          box-shadow: inset 0 2px 10px rgba(0,0,0,0.9);
        }

        .phone-header {
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 8px;
          margin-bottom: 10px;
          color: #10b981;
          text-align: center;
          font-weight: bold;
          letter-spacing: 0.05em;
        }

        .meal-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 14px;
          min-height: 70px;
        }

        .meal-item {
          display: flex;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.02);
          padding: 5px 10px;
          border-radius: 4px;
          border: 1px solid rgba(255,255,255,0.02);
        }

        .meal-tag {
          font-size: 0.65rem;
          padding: 1px 6px;
          border-radius: 3px;
          font-weight: bold;
        }

        .meal-tag.healthy { background: rgba(16, 185, 129, 0.15); color: #34d399; }
        .meal-tag.unhealthy { background: rgba(239, 68, 68, 0.15); color: #fca5a5; }

        .health-score-container {
          border-top: 1px dashed rgba(255, 255, 255, 0.08);
          padding-top: 10px;
        }

        .score-label-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        .score-bar-bg {
          height: 8px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .score-bar-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.5s ease;
        }

        .score-summary-text {
          font-size: 0.7rem;
          color: #a0b299;
          margin: 0;
          text-align: center;
        }

        .logger-controls {
          display: flex;
          gap: 8px;
        }

        .log-action-btn {
          flex: 1;
          padding: 10px 4px;
          font-size: 0.75rem;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-weight: 700;
          transition: all 0.2s ease;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .log-healthy { background: #10b981; color: white; box-shadow: 0 4px 12px rgba(16,185,129,0.2); }
        .log-healthy:hover { background: #059669; }

        .log-unhealthy {
          background: rgba(255, 255, 255, 0.06);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .log-unhealthy:hover { background: rgba(255, 255, 255, 0.12); }

        .log-reset {
          background: transparent;
          color: rgba(255, 255, 255, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .log-reset:hover { color: #ffffff; border-color: rgba(255, 255, 255, 0.2); }

        /* 3. AI Simulator */
        .ai-simulator {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .ai-recommend-card {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.04) 0%, rgba(5, 150, 105, 0.01) 100%);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }

        .ai-recommend-card.loading { border-color: rgba(16, 185, 129, 0.4); }

        .laser-scanner {
          position: absolute;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(to right, transparent, #34d399, transparent);
          box-shadow: 0 0 10px #10b981;
          animation: scan 1.2s ease-in-out infinite;
          z-index: 2;
        }

        .ai-stars {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.7rem;
          color: #34d399;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          display: block;
          margin-bottom: 10px;
        }

        .recommend-title {
          font-family: 'Fraunces', serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 10px;
          min-height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .recommend-stats {
          display: flex;
          justify-content: center;
          gap: 14px;
          font-size: 0.78rem;
          color: #a0b299;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .ai-scan-btn {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border: none;
          color: #fff;
          font-size: 0.82rem;
          padding: 12px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 700;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.25);
          transition: all 0.3s ease;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .ai-scan-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(16, 185, 129, 0.35);
        }

        .ai-scan-btn:disabled {
          background: #27372d;
          color: #556c5e;
          cursor: not-allowed;
          box-shadow: none;
        }

        /* 4. Smart Modes Simulator */
        .modes-simulator {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .modes-tabs {
          display: flex;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 4px;
        }

        .mode-tab-btn {
          flex: 1;
          background: transparent;
          border: none;
          color: #a0b299;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 8px 0;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .mode-tab-btn.active {
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.08);
        }

        .mode-content-display {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 10px;
          padding: 14px;
          min-height: 190px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .tab-pane {
          display: flex;
          flex-direction: column;
          gap: 10px;
          animation: fadeIn 0.35s ease-in-out;
        }

        .tab-pane-title {
          font-size: 0.8rem;
          color: #a0b299;
          margin-bottom: 6px;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        /* Mood Pane */
        .mood-buttons {
          display: flex;
          gap: 8px;
        }

        .mood-select-btn {
          flex: 1;
          padding: 8px 0;
          font-size: 0.78rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: #fff;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 600;
        }

        .mood-select-btn:hover { background: rgba(255, 255, 255, 0.06); }

        .mood-select-btn.selected {
          background: rgba(16, 185, 129, 0.15);
          border-color: #10b981;
          color: #34d399;
        }

        .mood-result {
          background: rgba(6, 9, 7, 0.3);
          border-radius: 6px;
          padding: 10px;
          min-height: 50px;
          font-size: 0.78rem;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #fff;
          border-left: 3px solid #10b981;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        /* Weather Pane */
        .mode-weather-pane {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 14px;
        }

        .window-frame {
          width: 85px;
          height: 105px;
          border: 3.5px solid #334155;
          border-radius: 8px;
          background: #0f172a;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 6px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.4);
        }

        .weather-sky {
          font-size: 0.58rem;
          color: #94a3b8;
          z-index: 2;
          background: rgba(15, 23, 42, 0.85);
          border-radius: 3px;
          padding: 2px;
          text-align: center;
          font-family: monospace;
          font-weight: bold;
        }

        .rain-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .rain-drop {
          position: absolute;
          width: 1px;
          height: 8px;
          background: rgba(156, 163, 175, 0.5);
          animation: rainfall 0.7s linear infinite;
        }

        .drop-1 { left: 20%; animation-delay: 0.1s; }
        .drop-2 { left: 45%; animation-delay: 0.3s; }
        .drop-3 { left: 70%; animation-delay: 0.2s; }
        .drop-4 { left: 85%; animation-delay: 0.5s; }

        .weather-rec {
          flex: 1;
          font-size: 0.78rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .weather-rec strong {
          color: #34d399;
          display: block;
          margin-bottom: 6px;
        }

        .weather-rec p { color: #fff; margin: 4px 0; }

        /* Trending Pane */
        .trending-scroller {
          background: #020403;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 6px;
          height: 84px;
          overflow: hidden;
          position: relative;
        }

        .trending-scroller-inner {
          display: flex;
          flex-direction: column;
          animation: marquee 8s linear infinite;
          padding: 6px;
        }

        .trending-item {
          padding: 6px 4px;
          font-size: 0.75rem;
          color: #34d399;
          border-bottom: 1px solid rgba(255, 255, 255, 0.02);
          font-family: monospace;
        }

        /* Recipe Pane (Cookbook flip card layout) */
        .recipe-card-flip-container {
          perspective: 1000px;
          height: 145px;
          cursor: pointer;
        }

        .recipe-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-style: preserve-3d;
        }

        .recipe-card-flip-container.flipped .recipe-card-inner {
          transform: rotateY(180deg);
        }

        .recipe-card-front, .recipe-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 12px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }

        .recipe-card-front {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.05) 100%);
          color: white;
        }

        .recipe-card-back {
          background: #059669;
          color: white;
          transform: rotateY(180deg);
        }

        .recipe-card-image { font-size: 1.8rem; margin-bottom: 4px; }
        
        .recipe-card-front h5, .recipe-card-back h5 {
          font-family: 'Fraunces', serif;
          font-size: 0.95rem;
          font-weight: 700;
          margin-bottom: 3px;
        }

        .recipe-meta {
          font-size: 0.72rem;
          color: #a0b299;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .recipe-flip-hint {
          font-size: 0.62rem;
          color: rgba(255, 255, 255, 0.4);
          margin-top: 8px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .recipe-steps {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.7rem;
          text-align: left;
          padding-left: 14px;
          margin-top: 6px;
          line-height: 1.35;
        }

        /* 5. Tracking Loop Simulator */
        .loop-simulator {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .tracking-score-display {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .display-num {
          font-family: 'Fraunces', serif;
          font-size: 2.4rem;
          font-weight: 800;
          color: #10b981;
          line-height: 1;
        }

        .display-label {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.72rem;
          color: #a0b299;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .progress-graph-mini {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          height: 60px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding-bottom: 4px;
        }

        .graph-bar-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 12%;
        }

        .graph-bar {
          width: 100%;
          background: rgba(255, 255, 255, 0.04);
          border-radius: 2px 2px 0 0;
          transition: height 0.3s ease, background 0.3s ease;
        }

        .graph-bar.active {
          background: linear-gradient(to top, #059669, #34d399);
          box-shadow: 0 0 8px rgba(16,185,129,0.3);
        }

        .graph-day-label {
          font-size: 0.55rem;
          color: rgba(255,255,255,0.3);
          margin-top: 4px;
          font-family: monospace;
        }

        .slider-control-container {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .slider-control-container label {
          font-size: 0.75rem;
          color: #a0b299;
          display: flex;
          justify-content: space-between;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .health-range-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 3px;
          outline: none;
        }

        .health-range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(16,185,129,0.4);
          transition: transform 0.1s ease;
        }

        .health-range-slider::-webkit-slider-thumb:hover { transform: scale(1.25); }

        /* 6. Brand Simulator */
        .brand-simulator {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-grow: 1;
          gap: 24px;
        }

        .brand-badge-container {
          position: relative;
          padding: 20px;
        }

        .logo-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 110px;
          height: 110px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%);
          animation: logoPulse 2.5s infinite alternate ease-in-out;
        }

        .mock-logo {
          border: 1px solid rgba(16, 185, 129, 0.25);
          background: rgba(12, 19, 15, 0.85);
          padding: 18px 26px;
          border-radius: 14px;
          text-align: center;
          position: relative;
          z-index: 2;
          box-shadow: 0 8px 25px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05);
          transition: transform 0.3s ease;
        }

        .mock-logo:hover { transform: scale(1.05); }
        .logo-icon { font-size: 2.4rem; display: block; margin-bottom: 6px; }
        
        .mock-logo h4 {
          font-family: 'Fraunces', serif;
          font-size: 1.25rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 2px;
        }
        
        .mock-logo p {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.68rem;
          color: #34d399;
          margin: 0;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .cta-start-btn {
          width: 100%;
          padding: 12px;
          text-align: center;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #fff;
          text-decoration: none;
          font-size: 0.88rem;
          font-weight: 700;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.25);
          transition: all 0.3s ease;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .cta-start-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.35);
        }

        @keyframes logoPulse {
          0% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(1.25); opacity: 1; }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* RESPONSIVE LAYOUT */
        @media (max-width: 1023px) {
          .story-flow-section {
            padding: 70px 4%;
          }

          .desktop-trail-svg {
            display: none;
          }

          .mobile-trail-svg {
            display: block;
          }

          .trail-badge {
            display: none;
          }

          .trail-watermark {
            display: none;
          }

          .story-trail-container {
            padding-left: 20px;
          }

          .trail-row {
            flex-direction: column;
            height: auto;
            min-height: auto;
            gap: 20px;
            margin-bottom: 60px;
            align-items: flex-start;
          }

          .trail-col-left, .trail-col-right {
            width: 100%;
            justify-content: flex-start;
          }

          .trail-col-center {
            display: none;
          }

          .story-card {
            max-width: 100%;
            border-left: 3px solid #10b981;
            border-radius: 0 18px 18px 0;
            background: rgba(12, 19, 15, 0.4);
            padding: 24px 26px;
          }

          .interactive-widget-container {
            max-width: 100%;
          }

          .mobile-narrative-header {
            display: block;
            font-size: 0.8rem;
            color: #34d399;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 8px;
            border-bottom: 1px dashed rgba(16, 185, 129, 0.2);
            padding-bottom: 4px;
            width: 100%;
            font-family: 'Plus Jakarta Sans', sans-serif;
          }
        }
      `}</style>
    </section>
  );
}

export default StoryFlow;
