"use client";

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from './login.module.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/auth/login-data", {
        email,
        password,
      });

      setMessage(response.data.message);

      // Save the token in cookies
      document.cookie = `Authorization=${response.data.token}; path=/; max-age=3600`;

      // Redirect to homepage
      window.location.href = "/home";
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };


  return (
    <div className={styles.mainlogin}>
      <div className={styles.navbar}>
        <div className={styles.navbar1}>
          <Link href="/home">CampusPlatz</Link>
        </div>
        <div className={styles.navbar2}>
          <Link href="/signup">
            <button>Sign Up</button>
          </Link>
        </div>
      </div>
      <div className={styles['sign-up-form']}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles['form-control']}>
            <label htmlFor="email">
              <span className={styles['label-text']}>University Email</span>
            </label>
            <input
              id="email"
              placeholder="ughur.hasan@university.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles['form-control']}>
            <label htmlFor="password">
              <span className={styles['label-text']}>Password</span>
            </label>
            <input
              id="password"
              placeholder="********"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className={styles['reset-password']}>
              <Link href="/reset">Forgot Password?</Link>
            </div>
          </div>
          <div className={styles['button-form']}>
            <button className={styles['btn-1']} type="submit">
              Login
            </button>
            <div className={styles['already-account']}>
              <p>Don't have an account?</p>
              <Link href="/signup">Sign Up</Link>
            </div>
          </div>
        </form>

        {message && <p className={styles.success}>{message}</p>}
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles['text-sm']}>
          <p>
            If you need help, please contact{' '}
            <a href="mailto:support@campusplatz.com">support@campusplatz.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
