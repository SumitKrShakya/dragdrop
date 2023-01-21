import React from "react";
import styled from "styled-components";
import Logo from "../images/logo.png";
import { Button, Space } from 'antd';
const Navbar = ({handleAdd, handleHistory}) => {
  return (
    <FormContainer>
      <div className="logo">
        <img src={Logo} />
      </div>
      <div className="buttons">
        <button onClick={handleAdd}>Add Item</button>
        <button onClick={handleHistory}>History</button>
      </div>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  height: 20vh;
  width: 100vw;
  // background-color:cyan;
  display:flex;
  justify-content:space-between;

  img {
    height: 70%;
  }
  .buttons{
    display:flex;
    justify-content:space-between;
    height:45%;
    margin:1%;
    margin-top:2%;
    background-color:rgba(255, 255, 255, 0.4);
    border-radius:10px;

    transition: all 0.5s ease;
    button {
      cursor:pointer;
      margin:10px;
      padding:10px;
      border-radius:5px;
      &:hover{
        background-color:rgba(255, 255, 255, 0.6);
        transition: all 0.5s ease;
      }
    }
  }
`;

export default Navbar;
