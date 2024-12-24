"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './signup.module.css'; // Adjust path as needed

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    university: '',
    campus: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please try again.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/auth/register-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Account created successfully!');
      } else {
        throw new Error(data.message || 'An error occurred. Please try again.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div className={styles.section}>
      <div className={styles.navbar}>
        <div className={styles.navbar1}>
          <Link href="/home">CampusPlatz</Link>
        </div>
        <div className={styles.navbar2}>
          <Link href="/login">
            <button>Log In</button>
          </Link>
        </div>
      </div>

      <div className={styles['sign-up-form']}>
        <h1>Sign up now</h1>
        <form onSubmit={handleSignup}>
          <div className={`${styles['form-control']} ${styles.names}`}>
            <div className="flex flex-col max-md:pr-5">
              <label htmlFor="firstName">
                <span className={styles['label-text']}>First Name</span>
              </label>
              <input
                id="firstName"
                placeholder="Ughur"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName">
                <span className={styles['label-text']}>Last Name</span>
              </label>
              <input
                id="lastName"
                placeholder="Hasan"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles['form-control']}>
            <label htmlFor="university">
              <span className={styles['label-text']}>Choose Your University</span>
            </label>
            <select id="university" value={formData.university} onChange={handleChange}>
              <option value="" disabled>
                Select Your University
              </option>
              <option value="IU International University of Applied Sciences">
                IU International University of Applied Sciences
              </option>
            </select>
          </div>
          <div className={styles['form-control']}>
            <label htmlFor="campus">
              <span className={styles['label-text']}>Select Campus</span>
            </label>
            <select id="campus" value={formData.campus} onChange={handleChange}>
              <option value="" disabled>
                Select Your Campus
              </option>
              <option value="Bad Honnef">Bad Honnef</option>
              <option value="Berlin">Berlin</option>
            </select>
          </div>
          <div className={styles['form-control']}>
            <label htmlFor="email">
              <span className={styles['label-text']}>University Email</span>
            </label>
            <input
              id="email"
              placeholder="ughur.hasan@university.com"
              type="email"
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className={styles['form-control']}>
            <label htmlFor="confirmPassword">
              <span className={styles['label-text']}>Confirm Password</span>
            </label>
            <input
              id="confirmPassword"
              placeholder="********"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className={styles['button-form']}>
            <button className={styles['btn-1']} type="submit" disabled={loading}>
              {loading ? (
                <div className={styles.spinner}></div>
              ) : (
                'Sign Up'
              )}
            </button>
            <div className={styles['already-account']}>
              <p>Already have an account?</p>
              <Link href="/login">Log In</Link>
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

export default Signup;
