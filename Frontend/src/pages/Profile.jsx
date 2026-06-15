import { useEffect, useState, useRef, useContext } from "react";
import API from "../api/api";
import { UserContext } from "../context/UserContext";
import styles from "./Auth.module.css";

function Profile({ onBack }) {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "",
    goal: "",
    dietPreference: "",
    allergies: "",
    location: "",
  });
  const { user, setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");

  const containerRef = useRef(null);
  const cardRef = useRef(null);

  // GET PROFILE
  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/profile");
      setFormData(res.data);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put("/auth/profileUpdate", formData);
      setMessage("Profile Updated ✅");
      setUser(formData);
    } catch (error) {
      console.log(error);
      setMessage("Update Failed ❌");
    }
  };

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
      
      const angleX = (e.clientY - cardY) / (cardRect.height / 2) * -5;
      const angleY = (e.clientX - cardX) / (cardRect.width / 2) * 5;
      
      card.style.setProperty("--tilt-x", `${angleX}deg`);
      card.style.setProperty("--tilt-y", `${angleY}deg`);

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

  const isSuccess = message.includes("Updated") || message.includes("✅");

  return (
    <div 
      className={styles['auth-page-container']}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ minHeight: "calc(100vh - 80px)", height: "auto", padding: "40px 20px" }}
    >
      {/* Spotlight revealed background */}
      <div className={`${styles['auth-bg-image']} ${styles['profile-bg-image']}`} />

      {/* Floating background Icons */}
      <div className={`${styles['floating-icon']} ${styles['float-1']}`} style={{ top: "10%", left: "8%", width: "40px", height: "40px" }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.58 1 9.2a7 7 0 0 1-9 8.8z"/>
          <path d="M19 2L9.8 11.2"/>
        </svg>
      </div>
      <div className={`${styles['floating-icon']} ${styles['float-2']}`} style={{ top: "15%", right: "10%", width: "45px", height: "45px" }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" />
        </svg>
      </div>

      <div className={`${styles['auth-wrapper']} ${styles['profile-wrapper']}`}>
        <div className={styles['auth-brand']}>
          <h1>My Profile 👤</h1>
          <p>Update your body metrics and dietary choices</p>
        </div>

        <div className={styles['auth-card']} ref={cardRef} style={{ padding: "40px" }}>
          <form onSubmit={handleSubmit} className={styles['auth-form']}>
            <h2 className={styles['auth-form-title']} style={{ textAlign: "center", marginBottom: "10px" }}>Edit Profile</h2>

            <div className={styles['profile-grid']}>
              {/* Age */}
              <div className={styles['input-group']}>
                <label className={styles['input-label']}>Age (years)</label>
                <div className={styles['input-field-wrapper']}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <input
                    type="number"
                    name="age"
                    placeholder="Enter your age"
                    value={formData.age || ""}
                    onChange={handleChange}
                    className={styles['auth-input']}
                  />
                </div>
              </div>

              {/* Gender */}
              <div className={styles['input-group']}>
                <label className={styles['input-label']}>Gender</label>
                <div className={styles['input-field-wrapper']}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <input
                    type="text"
                    name="gender"
                    placeholder="e.g. Male, Female"
                    value={formData.gender || ""}
                    onChange={handleChange}
                    className={styles['auth-input']}
                  />
                </div>
              </div>

              {/* Height */}
              <div className={styles['input-group']}>
                <label className={styles['input-label']}>Height (cm)</label>
                <div className={styles['input-field-wrapper']}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 3h14c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2z"/>
                    <path d="M19 8h-4"/>
                    <path d="M19 12h-6"/>
                    <path d="M19 16h-4"/>
                  </svg>
                  <input
                    type="number"
                    name="height"
                    placeholder="Enter height in cm"
                    value={formData.height || ""}
                    onChange={handleChange}
                    className={styles['auth-input']}
                  />
                </div>
              </div>

              {/* Weight */}
              <div className={styles['input-group']}>
                <label className={styles['input-label']}>Weight (kg)</label>
                <div className={styles['input-field-wrapper']}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                  <input
                    type="number"
                    name="weight"
                    placeholder="Enter weight in kg"
                    value={formData.weight || ""}
                    onChange={handleChange}
                    className={styles['auth-input']}
                  />
                </div>
              </div>

              {/* Activity Level */}
              <div className={styles['input-group']}>
                <label className={styles['input-label']}>Activity Level</label>
                <div className={styles['input-field-wrapper']}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                  <input
                    type="text"
                    name="activityLevel"
                    placeholder="e.g. Sedentary, Active"
                    value={formData.activityLevel || ""}
                    onChange={handleChange}
                    className={styles['auth-input']}
                  />
                </div>
              </div>

              {/* Goal */}
              <div className={styles['input-group']}>
                <label className={styles['input-label']}>Goal</label>
                <div className={styles['input-field-wrapper']}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <circle cx="12" cy="12" r="6"/>
                    <circle cx="12" cy="12" r="2"/>
                  </svg>
                  <input
                    type="text"
                    name="goal"
                    placeholder="e.g. Weight Loss, Muscle Gain"
                    value={formData.goal || ""}
                    onChange={handleChange}
                    className={styles['auth-input']}
                  />
                </div>
              </div>

              {/* Diet Preference */}
              <div className={styles['input-group']}>
                <label className={styles['input-label']}>Diet Preference</label>
                <div className={styles['input-field-wrapper']}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.58 1 9.2a7 7 0 0 1-9 8.8z"/>
                    <path d="M19 2L9.8 11.2"/>
                  </svg>
                  <input
                    type="text"
                    name="dietPreference"
                    placeholder="e.g. Vegan, Keto, Anything"
                    value={formData.dietPreference || ""}
                    onChange={handleChange}
                    className={styles['auth-input']}
                  />
                </div>
              </div>

              {/* Allergies */}
              <div className={styles['input-group']}>
                <label className={styles['input-label']}>Allergies</label>
                <div className={styles['input-field-wrapper']}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  <input
                    type="text"
                    name="allergies"
                    placeholder="e.g. Nuts, Dairy, None"
                    value={formData.allergies || ""}
                    onChange={handleChange}
                    className={styles['auth-input']}
                  />
                </div>
              </div>

              {/* Location */}
              <div className={styles['input-group']} style={{ gridColumn: "span 2" }}>
                <label className={styles['input-label']}>Location</label>
                <div className={styles['input-field-wrapper']}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter your location"
                    value={formData.location || ""}
                    onChange={handleChange}
                    className={styles['auth-input']}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px", marginTop: "12px" }}>
              <button type="submit" className={styles['auth-btn']} style={{ flex: 1 }}>
                Save Profile
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "16px", height: "16px", position: "static", color: "inherit" }}>
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </button>
              <button 
                type="button" 
                onClick={onBack} 
                className={styles['auth-btn']} 
                style={{ 
                  flex: 1, 
                  background: "transparent", 
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  boxShadow: "none" 
                }}
              >
                Cancel
              </button>
            </div>

            {message && (
              <p className={`${styles['auth-message']} ${isSuccess ? styles['auth-message-success'] : styles['auth-message-error']}`}>
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
