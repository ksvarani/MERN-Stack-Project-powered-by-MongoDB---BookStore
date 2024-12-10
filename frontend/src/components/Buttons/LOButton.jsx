import React from 'react';
import styled from 'styled-components';
import { authActions } from '../../store/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LOButton = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <StyledWrapper>
      <button className="ui-btn"
      onClick={() => {
        dispatch(authActions.logout());
        dispatch(authActions.changeRole("USER"));
        localStorage.clear("id");
        localStorage.clear("token");
        localStorage.clear("role");
        navigate("/");
      }}>
        LOG OUT
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .ui-btn {
    cursor: pointer;
    border-radius: 5px;
    color: rgb(219, 218, 218);
    border-style: solid;
    background-color: transparent;
    border-color: rgb(219, 218, 218);
    width: 120px;
    height: 40px;
    transition: 0.2s ease;
    text-transform: uppercase;
    border-width: 2px;
    font-weight: 500;
    font-size: 18px;
    letter-spacing: 2px;
  }
  .ui-btn:hover {
    color: rgb(247, 247, 247);
    background-color: rgb(202, 25, 25);
    border-color: rgb(202, 25, 25);
    text-shadow: 0 0 50px white, 0 0 20px white, 0 0 15px white;
    box-shadow: 0 0 50px rgb(202, 25, 25), 0 0 30px rgb(202, 25, 25),
      0 0 60px rgb(202, 25, 25), 0 0 120px rgb(202, 25, 25);
    font-size: 20px;
    width: 130px;
    height: 50px;
    letter-spacing: 3px;
  }
  .ui-btn:active {
    width: 115px;
    height: 38px;
    letter-spacing: 0px;
  }`;

export default LOButton;