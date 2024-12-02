import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../store/auth';
import axios from 'axios';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

const LogIn = () => {
  const [Values, setValues] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setLoading(true); // Set loading state

    // Client-side validation
    if (Values.username === "" || Values.password === "") {
      setError("All fields are required!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/v1/Sign-in", Values);
      //console.log("Response:", response.data.message, "\nID:", response.data.ID, "\ntoken:", response.data.Token, "\nRole:", response.data.Role );

      if (response.data.success) {
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.Role));
        localStorage.setItem("id", response.data.ID);
        localStorage.setItem("token", response.data.Token);
        localStorage.setItem("role", response.data.Role);
        navigate("/profile");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { message } = error.response.data;

        if (message === "User not found") {
          setError("Invalid USERNAME. Please use a valid username.");
        } else {
          setError("Invalid Credentials");
        }
      } else {
        setError("Server ERROR. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <div className="container">
        <form className="form_front" onSubmit={submit}>
          <div className="form_details">Login</div>

          {/* Display error messages */}
          {error && <ErrorBanner>{error}</ErrorBanner>}

          <input
            type="text"
            className="input"
            placeholder="Username"
            name="username"
            value={Values.username}
            onChange={change}
            disabled={loading}
            required
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            name="password"
            value={Values.password}
            onChange={change}
            disabled={loading}
            required
          />
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <span className="switch">
            Don't have an account?{' '}
            <a href="/signup" className="signup_link">
              Sign Up
            </a>
          </span>
        </form>
      </div>
    </StyledWrapper>
  );
};

// Error banner styled component
const ErrorBanner = styled.div`
  background-color: #f44336;
  color: white;
  padding: 10px 15px;
  margin-bottom: 20px;
  border-radius: 5px;
  text-align: center;
`;

const StyledWrapper = styled.div`
  height: 100vh; /* Ensure full height covers the viewport */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1c1c1c; /* Consistent background */
  margin: 0;
  padding: 0;

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 400px; /* Limit form width for responsiveness */
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

  .input {
    width: 100%; /* Adapt inputs to container width */
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
    border-color: #4caf50; /* Focus color */
    box-shadow: 6px 6px 10px rgba(0, 0, 0, 1),
      -6px -6px 10px rgba(255, 255, 255, 0.2),
      inset 2px 2px 10px rgba(0, 0, 0, 0.6);
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
    background-color: #4caf50;
    color: #fff;
    box-shadow: 6px 6px 10px rgba(0, 0, 0, 1),
      -6px -6px 10px rgba(255, 255, 255, 0.2),
      inset 2px 2px 10px rgba(0, 0, 0, 0.6);
  }

  .switch {
    font-size: 13px;
    color: white;
    text-align: center;
  }

  .signup_link {
    font-weight: 700;
    cursor: pointer;
    text-decoration: underline;
    color: #4caf50; /* Highlight the link */
    transition: 0.3s;
  }

  .signup_link:hover {
    color: #f0f0f0;
  }
`;

export default LogIn;
