import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const clickHandler = () => {
    setIsOpen(true);
  };

  const closeHandler = (e) => {
    if (e.target.className === "modal") setIsOpen(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const { username, email, phoneNo, dob } = e.target;
    if (phoneNo.value.toString().length !== 10) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
    } else if (new Date(dob.value).getTime() > Date.now()) {
      alert("Invalid date of birth. Date of birth cannot be in the future.");
    } else {
      username.value = "";
      email.value = "";
      phoneNo.value = "";
      dob.value = "";
      setIsOpen(false);
    }
  };

  return (
    <div className="App">
      <div>
        <h1>User Details Modal</h1>
        <button onClick={clickHandler}>Open Form</button>
        {isOpen && (
          <div className="modal" onClick={closeHandler}>
            <div className="modal-content">
              <form onSubmit={submitHandler}>
                <h2>Fill Details</h2>
                <div className="input-group">
                  <label htmlFor="username">Username: </label>
                  <input type="text" name="username" id="username" required />
                </div>
                <div className="input-group">
                  <label htmlFor="email">Email Address:</label>
                  <input type="email" name="email" id="email" required />
                </div>
                <div className="input-group">
                  <label htmlFor="phoneNo">Phone Number:</label>
                  <input type="tel" name="phoneNo" id="phone" required />
                </div>
                <div className="input-group">
                  <label htmlFor="dob">Date of Birth:</label>
                  <input type="date" name="dob" id="dob" required />
                </div>
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
