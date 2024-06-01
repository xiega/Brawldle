import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/style-Help.css';
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";

const apiClient = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const MySwal = withReactContent(Swal);

const HelpForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issue: '',
    description: '',
    consent: false, // Dodajemy stan dla checkboxa
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value; // Obsługa zmiany dla checkboxa
    setFormData((prevData) => ({
      ...prevData,
      [name]: val,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      MySwal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Invalid email address.',
        customClass: {
          confirmButton: 'custom-confirm-button'
        },
        confirmButtonText: 'OK'
      });
      return;
    }
    if (!formData.consent) {
      MySwal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Please consent to data processing.',
        customClass: {
          confirmButton: 'custom-confirm-button'
        },
        confirmButtonText: 'OK'
      });
      return;
    }
    try {
      console.log(formData);
      const response = await apiClient.post('/help', formData);
      MySwal.fire({
        icon: 'success',
        title: 'Sent',
        text: 'Thank you for helping us 🧡',
        customClass: {
          confirmButton: 'custom-confirm-button'
        },
        confirmButtonText: 'OK'
      });
      console.log('Form submitted successfully', response.data);
      // Clear the form
      setFormData({
        name: '',
        email: '',
        issue: '',
        description: '',
        consent: false, // Resetujemy checkbox po wysłaniu formularza
      });
    } catch (error) {
      console.error('Error submitting the form', error);
    }
  };

  return (
      <div className="aside-help">
        <h2>Report an Issue / Request Help</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
          />

          <label htmlFor="email">Email:</label>
          <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
          />

          <label htmlFor="issue">Issue:</label>
          <input
              type="text"
              id="issue"
              name="issue"
              value={formData.issue}
              onChange={handleChange}
              required
          />

          <label htmlFor="description">Description:</label>
          <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
          />

          <label htmlFor="consent">
            <div className={'check'}>
              <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  required
              />
              <p>I consent to data processing.</p>
            </div>
          </label>

          <button type="submit" className={'button'}>Submit</button>
        </form>
      </div>
  );
};

export default HelpForm;