import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";

const Player = ({ data, bucket, item, handlePlayer }) => {
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;

  useEffect(() => {
    console.log({
        "name":data[bucket].items[item].name,
        "lastPlayed":dateTime
    })
    const  call = async()=>{
        const response = await axios.post(`http://localhost:3000/history`,{
            "name":data[bucket].items[item].name,
            "lastPlayed":dateTime
        })
    }
    call()
  }, [])
  const url = data[bucket].items[item].url.replace("watch?v=", "embed/");
  return (
    <FormContainer>
      <div className="modal">
        <iframe width="95% " height="90%" src={url}></iframe>
        <button onClick={handlePlayer}>Close</button>
      </div>
    </FormContainer>
  );
};
const FormContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(3px);
  transition: all 1s ease;
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 70%;
    width: 50%;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    button {
      margin: 5px;
    }
  }
`;

export default Player;
