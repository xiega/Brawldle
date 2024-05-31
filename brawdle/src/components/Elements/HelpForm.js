import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/style-Help.css';

const apiClient = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

const HelpForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issue: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(formData);
      const response = await apiClient.post('/help', formData);
      console.log('Form submitted successfully', response.data);
      // Clear the form
      setFormData({
        name: '',
        email: '',
        issue: '',
        description: '',
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
          type="email"
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HelpForm;
