import React from 'react';
import styled from 'styled-components';

const OrderUPButton = () => {
  return (
    <StyledWrapper>
      <div className="box">
        <div className="arrow right" />
        <div className="text">UPDATE</div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .box {
    width: 45px;
    height: 45px;
    background: #5cda5c;
    border-radius: 25px;
    display: flex;
    justify-items: center;
    justify-content: center;
    align-items: center;
    transition: 0.3s;
    cursor: pointer;
    position: relative;
  }

  .arrow {
    border: solid black;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
  }

  .right {
    transform: rotate(-45deg);
  }

  .box:hover {
    width: 160px;
    background: linear-gradient(to right, #26d526, yellow);
  }

  .box:hover .arrow {
    display: none;
  }

  .box .text {
    display: none;
  }

  .box:hover .text {
    display: flex;
    font-size: 16px;
    font-weight: 550;
    color: black;
    letter-spacing: 0.6px;
    animation: anima 0.6s ease;
  }

  @keyframes anima {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  .box:active {
    background: linear-gradient(to right, rgb(38, 213, 38, 0.8), rgba(255, 255, 0, 0.8));
  }`;

export default OrderUPButton;
