import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const History = ({handleHistory}) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const call = async () => {
      const res = await axios.get(`http://localhost:3000/history`);
      setData(res.data);
    };
    call();
  }, []);

  return (
    <FormContainer >
      <div className="modal">
          {data
            ? data.map((ele, i) => {
                return (
                  <div className="item">
                    <div className="name">{ele.name}</div>
                    <div className="time">{ele.lastPlayed}</div>
                  </div>
                );
              })
            : null}
        <button onClick={handleHistory}>Close</button>
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
    height: 70%;
    width: 50%;
    overflow-y:scroll;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    postion:relative;
    button{
      position:absolute;
      bottom:50px;
      left:50%;
    }
  }
`;

export default History;
