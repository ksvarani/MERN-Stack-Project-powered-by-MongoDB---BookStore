import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const SignUp = () => {
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  // For displaying error messages
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(""); // Reset error message

    try {
      // Validation on the client side before sending the request
      if (
        Values.username === "" ||
        Values.email === "" ||
        Values.password === "" ||
        Values.address === ""
      ) {
        setError("All fields are required!");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation
      if (!emailRegex.test(Values.email)) {
        setError("Please enter a valid email address.");
        return;
      }

      // Validate username length
      if (Values.username.length < 4) {
        setError("Username should contain at least 4 characters.");
        return;
      }

      // Validate password length
      if (Values.password.length < 8) {
        setError("Password should contain at least 8 characters.");
        return;
      }

      // Make API request
      const response = await axios.post("http://localhost:3000/api/v1/Sign-up", Values);

      console.log("Response:", response.data.message);

      if (response.data.success) {
        alert(response.data.message);
        navigate("/LogIn");
      }
    } catch (error) {
      // Handle server-side validation errors
      if (error.response && error.response.data) {
        const { message } = error.response.data;

        if (message === "Username already exists") {
          setError("Username already exists. Please use a different username.");
        } else if (message === "Email already exists") {
          setError("Email already exists. Please use a different email.");
        } else if (message === "Username should contain at least 4 characters") {
          setError("Username should contain at least 4 characters.");
        } else if (message === "Password should contain at least 8 characters") {
          setError("Password should contain at least 8 characters.");
        } else {
          setError("Failed to sign up. Please try again later.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      console.error("Error:", error);
    }
  };

  return (
    <StyledWrapper> {/* Styling Form */}
      <div className="container">
        <form className="form_front" onSubmit={submit}>
          <div className="form_details">Sign Up</div>

          {error && <div className="error_message">{error}</div>} {/* Error display */}

          <div>
            <label htmlFor="username" className="label">Username</label>
            <input
              type="text"
              className="input"
              placeholder="Username"
              name="username"
              value={Values.username}
              onChange={change}
            />
          </div>

          <div>
            <label htmlFor="email" className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="ghost1119@gmail.com"
              name="email"
              value={Values.email}
              onChange={change}
            />
          </div>

          <div>
            <label htmlFor="password" className="label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              name="password"
              value={Values.password}
              onChange={change}
            />
          </div>

          <div>
            <label htmlFor="address" className="label">Address</label>
            <textarea
              className="input textarea"
              rows="5"
              placeholder="Address"
              name="address"
              value={Values.address}
              onChange={change}
            />
          </div>
          <button type="submit" className="btn">Sign Up</button>
        </form>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1c1c1c;
  margin: 0;
  padding: 0;

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%; /* Ensure the form is centered */
    max-width: 400px;
  }

  .form_front {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 40px;
    border-radius: 15px;
    background-color: #212121;
    box-shadow: 6px 6px 10px rgba(0, 0, 0, 1),
      -6px -6px 10px rgba(255, 255, 255, 0.1);
    width: 100%;
  }

  .form_details {
    font-size: 25px;
    font-weight: 600;
    text-align: center;
    color: white;
    margin-bottom: 10px;
  }

  .label {
    display: block;
    font-size: 14px;
    font-weight: 400;
    color: #999;
    margin-bottom: 5px;
  }

  .input {
    width: 100%;
    min-height: 45px;
    color: #fff;
    outline: none;
    padding: 10px;
    background-color: #212121;
    border-radius: 6px;
    border: 2px solid #212121;
    box-shadow: 6px 6px 10px rgba(0, 0, 0, 1),
      -6px -6px 10px rgba(255, 255, 255, 0.1);
    transition: 0.3s;
  }

  .input::placeholder {
    color: #999;
  }

  .input:focus {
    transform: scale(1.03);
    border-color: #4caf50; /* Add a visible focus color */
    box-shadow: 6px 6px 10px rgba(0, 0, 0, 1),
      -6px -6px 10px rgba(255, 255, 255, 0.2),
      inset 2px 2px 10px rgba(0, 0, 0, 0.6);
  }

  .textarea {
    resize: none;
  }

  .btn {
    padding: 12px 30px;
    cursor: pointer;
    background-color: #212121;
    border-radius: 6px;
    border: 2px solid #212121;
    box-shadow: 6px 6px 10px rgba(0, 0, 0, 1),
      -6px -6px 10px rgba(255, 255, 255, 0.1);
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    transition: 0.3s;
    text-align: center;
    width: 100%; /* Button spans the form width */
  }

  .btn:hover {
    transform: scale(1.03);
    background-color: #4caf50; /* Hover effect */
    color: #fff;
    box-shadow: 6px 6px 10px rgba(0, 0, 0, 1),
      -6px -6px 10px rgba(255, 255, 255, 0.2),
      inset 2px 2px 10px rgba(0, 0, 0, 0.6);
  }
  
  .error_message {
    color: red;
    font-size: 14px;
    margin-bottom: 10px;
    text-align: center;
  }

  .textarea:focus {
    transform: scale(1.03);
    border-color: #4caf50;
    box-shadow: 6px 6px 10px rgba(0, 0, 0, 1),
      -6px -6px 10px rgba(255, 255, 255, 0.2),
      inset 2px 2px 10px rgba(0, 0, 0, 0.6);
  }
`;

export default SignUp;