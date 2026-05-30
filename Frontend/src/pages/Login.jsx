import { useState, useContext } from "react";

import API from "../api/api";

import { AuthContext } from "../context/AuthContext";
import styles from "./Auth.module.css";

function Login({ toggleView }) {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // context login
      login(res.data.token);

      setMessage("Login successful ✅");
    } catch (error) {
      console.log(error);

      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  const isSuccess = message.includes("successful") || message.includes("✅");

  return (
    <div>
      <form onSubmit={handleLogin} className={styles['auth-form']}>
        <h2 className={styles['auth-form-title']}>Login</h2>

        <div className={styles['input-group']}>
          <label className={styles['input-label']}>Email Address</label>
          <div className={styles['input-field-wrapper']}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles['auth-input']}
              required
            />
          </div>
        </div>

        <div className={styles['input-group']}>
          <label className={styles['input-label']}>Password</label>
          <div className={styles['input-field-wrapper']}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles['auth-input']}
              required
            />
          </div>
        </div>

        <button type="submit" className={styles['auth-btn']}>
          Login
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "16px", height: "16px", position: "static", color: "inherit" }}>
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>

        {message && (
          <p className={`${styles['auth-message']} ${isSuccess ? styles['auth-message-success'] : styles['auth-message-error']}`}>
            {message}
          </p>
        )}

        <div className={styles['auth-footer']}>
          Don't have an account?
          <button type="button" className={styles['auth-footer-link']} onClick={toggleView}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
