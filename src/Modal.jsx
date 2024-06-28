import React, { useState, useRef, useEffect } from 'react';
import './App.css'; // Make sure to import your CSS for styling

const XModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: ''
  });

  const modalRef = useRef();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, phone, dob } = formData;

    if (!username) {
      alert('Please enter your username');
      return;
    }
    if (!email || !email.includes('@')) {
      alert('Invalid email. Please check your email address.');
      return;
    }
    if (!phone || phone.length !== 10) {
      alert('Invalid phone number. Please enter a 10-digit phone number.');
      return;
    }
    if (new Date(dob) > new Date()) {
      alert('Invalid date of birth. Date of birth cannot be in the future.');
      return;
    }

    console.log('Form submitted successfully', formData);
    setFormData({
      username: '',
      email: '',
      phone: '',
      dob: ''
    });
    closeModal();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <button onClick={openModal}>Open Form</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
            <h1 className="form-heading">Fill Details</h1>
            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  required
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address:</label>
                <input
                  required
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  required
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  required
                  type="date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default XModal;
