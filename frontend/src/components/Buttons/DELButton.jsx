import React from 'react';
import styled from 'styled-components';

const DELButton = ({ onClick }) => {
  return (
    <StyledWrapper>
      <button onClick={onClick}>
        <span>DELETE</span>
        <div className="top" />
        <div className="left" />
        <div className="bottom" />
        <div className="right" />
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
    padding: 20px 60px;
    background-color: #000;
    border: none;
    font-size: 18px;
    position: relative;
    /* overflow: hidden; */
    transition: 500ms;
  }

  button span {
    color: gray;
    position: relative;
    transition: 500ms;
    transition-delay: 500ms;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 600;
  }

  button:before {
    content: '';
    position: absolute;
    width: 0%;
    height: 0%;
    left: 50%;
    right: 50%;
    top: 50%;
    bottom: 50%;
    transition: 500ms;
    transition-delay: 500ms;
    background-color: red;
    box-shadow: 0 0 10px red,
     0 0 30px red, 
     0 0 50px red;
  }

  button div {
    transition: 500ms;
    position: absolute;
    background-color: red;
    box-shadow: 0 0 15px red, 0 0 30px red, 0 0 50px red;
  }

  button .top {
    width: 15px;
    height: 2px;
    top: 0;
    left: 0;
  }

  button .bottom {
    width: 15px;
    height: 2px;
    bottom: 0;
    right: 0;
  }

  button .left {
    width: 2px;
    height: 15px;
    top: 0;
    left: 0;
  }

  button .right {
    width: 2px;
    height: 15px;
    bottom: 0;
    right: 0;
  }

  button:hover {
    color: #000;
  }

  button:hover span {
    color: #000;
  }

  button:hover:before {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  button:hover .top, 
  button:hover .bottom {
    width: 100%;
  }

  button:hover .left,
  button:hover .right {
    height: 100%;
  }`;

export default DELButton;
