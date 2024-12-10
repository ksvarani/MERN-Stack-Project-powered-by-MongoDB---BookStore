import React from 'react';
import styled from 'styled-components';

const Button1 = () => {
  return (
    <StyledWrapper>
      <div className="buttons">
        <button className="btn"><span /><p data-start="good luck!" data-text="Let's Hunt!" data-title="Book Hunt" /></button>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .buttons {
    display: flex;
    justify-content: space-around;
    top: 20px;
    left: 20px;
  }

  .buttons button {
    width: 150px;
    height: 50px;
    background-color: white; /* Default background color */
    margin: 20px;
    color: black; /* Default text color */
    position: relative;
    overflow: hidden;
    font-size: 14px;
    letter-spacing: 1px;
    font-weight: 500;
    text-transform: uppercase;
    transition: all 0.3s ease;
    cursor: pointer;
    border: 2px solid white; /* Default border color */
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
  }

  .buttons button:hover {
    background-color: black; /* Background color on hover */
    color: #00f7ff; /* Text color on hover */
    border: 2px solid #fffbb3; /* Border color on hover */
  }

  .buttons button p {
    padding: 0;
    margin: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden; /* Prevent text from overlapping */
  }

  .buttons button p:before, .buttons button p:after {
    position: absolute;
    width: 100%;
    left: 0;
    text-align: center;
    transition: all 0.4s cubic-bezier(0.35, 0.1, 0.25, 1);
  }

  .buttons button p:before {
    content: attr(data-title); /* Default text */
    top: 50%;
    transform: translateY(-50%);
    opacity: 1; /* Fully visible initially */
  }

  .buttons button p:after {
    content: attr(data-text); /* Hover text */
    top: 150%; /* Hidden below the button */
    opacity: 0; /* Initially hidden */
  }

  .buttons button:hover p:before {
    top: -50%; /* Moves out of view */
    opacity: 0; /* Fades out */
  }

  .buttons button:hover p:after {
    top: 50%; /* Moves into view */
    transform: translateY(-50%);
    opacity: 1; /* Fades in */
  }

  .buttons button:active {
    outline: none;
    border: none;
  }

  .buttons button:focus {
    outline: 0;
  }
`;

export default Button1;
