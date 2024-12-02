import React from 'react';
import styled from 'styled-components';

const ABLoader = () => {
  return (
    <StyledWrapper>
      <svg viewBox="0 0 16 16" height={48} width={48} className="windows-loading-spinner">
        <circle r="7px" cy="8px" cx="8px" />
      </svg>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .windows-loading-spinner {
    box-sizing: border-box;
    width: 3rem;
    height: 3rem;
    padding: 2px;
    overflow: visible;
  }

  .windows-loading-spinner > circle {
    stroke: #fff;
    fill: none;
    stroke-width: 2px;
    stroke-linecap: round;
    transform-origin: 50% 50%;
    transition: all 0.2s ease-in-out 0s;
    animation: 2s linear 0s infinite normal none running loading-spinner;
  }

  @keyframes loading-spinner {
    0% {
      stroke-dasharray: 0.01px, 43.97px;
      transform: rotate(0);
    }

    50% {
      stroke-dasharray: 21.99px, 21.99px;
      transform: rotate(450deg);
    }

    100% {
      stroke-dasharray: 0.01px, 43.97px;
      transform: rotate(1080deg);
    }
  }`;

export default ABLoader;
