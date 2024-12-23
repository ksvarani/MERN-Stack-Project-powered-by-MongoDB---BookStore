import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const EditButton = ({ id }) => {
  return (
    <StyledWrapper>
      <div className="container">
        <div className="btn">
          <Link to={`/editBook/${id}`}>
            E D I T
          </Link>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 220px;
  }

  .container .btn {
    height: 50px;
    margin: 20px;
    margin-bottom: 40px;
    position: relative;
    width: 175px;
  }

  .container .btn a {
    align-items: center;
    background: rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 30px;
    color: #fff;
    display: flex;
    font-size: 18px;
    font-weight: 700;
    left: 0;
    top: 0;
    position: absolute;
    height: 100%;
    width: 100%;
    justify-content: center;
    letter-spacing: 1px;
    text-decoration: none;
    overflow: hidden;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(15px);
    z-index: 1;
    transition: 0.5s;
  }

  .container .btn:hover a {
    letter-spacing: 2px;
    color: #000;
  }

  .container .btn a::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(to left,
                  rgba(255,255,255,0.15),
                  transparent);
    transform: skewX(45deg) translateX(0);
    transition: 0.5s;
  }

  .container .btn:hover a::before {
    transform: skewX(45deg) translateX(200%);
  }

  .container .btn::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -5px;
    height: 10px;
    width: 30px;
    background: rgb(8, 107, 183);
    border-radius: 10px;
    transition: 0.5s;
    transition-delay: 0s;
  }

  .container .btn:hover::before {
    bottom: 0;
    height: 50%;
    width: 80%;
    border-radius: 30px;
    transition-delay: 0.5s;
  }

  .container .btn::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -5px;
    height: 10px;
    width: 30px;
    background: rgb(7, 95, 189);
    border-radius: 10px;
    transition: 0.5s;
    transition-delay: 0s;
  }

  .container .btn:hover::after {
    top: 0;
    height: 50%;
    width: 80%;
    border-radius: 30px;
    transition-delay: 0.5s;
  }

  .container .btn:nth-child(1):before,
  .container .btn:nth-child(1)::after {
    background: #ffea00;
      0 0 15px #eaff2b,
      0 0 30px #dfff2b,
      0 0 60px #dfff2b;
  }

  .container .btn:active a {
    color: #000;
  }`;

export default EditButton;
