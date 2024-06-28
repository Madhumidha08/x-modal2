import React, { useEffect, useRef, useState } from 'react';

const Modal = ({ isOpen, onClose }) => {
  const modalRef = useRef();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: ""
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, dob, phone } = formData;

    let isValid = true;

    if (!username) {
      alert("Please enter your username");
      isValid = false;
    }

    if (!email) {
      alert("Invalid email. Please check your email address.");
      isValid = false;
    }

    if (!phone || phone.length !== 10) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      isValid = false;
    }

    if (new Date(dob) > new Date()) {
      alert("Invalid date of birth. Date of birth cannot be in the future.");
      isValid = false;
    }

    if (isValid) {
      console.log("form submitted successfully", formData);
      setFormData({
        username: "",
        email: "",
        phone: "",
        dob: ""
      });
      onClose();
    }
  };

  const onCloseModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={onCloseModal}>
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
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
