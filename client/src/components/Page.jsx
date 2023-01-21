import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { BsFillPlayFill } from "react-icons/bs";

const Page = ({ handlePlayer, data, setData }) => {
  // const [data, setData] = useState(null);
  // useEffect(() => {
  //   const call = async () => {
  //     const d = await axios.get("http://localhost:3000/data");
  //     console.log(d.data);
  //     setData(d.data);
  //   };
  //   call();
  // }, []);

  const handleOnDragEnd = async (result) => {
    if (!result.destination) return;
    console.log(result);
    const tempData = Array.from(data);
    console.log(tempData, result.source, result.source.droppableId - 1);
    const [moveItem] = tempData[result.source.droppableId - 1].items.splice(
      result.source.index,
      1
    );

    tempData[result.destination.droppableId - 1].items.splice(
      result.destination.index,
      0,
      moveItem
    );

    const temp1 = await axios.put(
      `http://localhost:3000/data/${result.source.droppableId}`,
      tempData[result.source.droppableId - 1]
    );
    const temp2 = await axios.put(
      `http://localhost:3000/data/${result.destination.droppableId}`,
      tempData[result.destination.droppableId - 1]
    );
    // call(tempData)
  };
  // const call = async (tempData) => {
  //   const result = await axios.put('http://localhost:3000/data',tempData)
  // }
  const handleOnPlay = (bucket, item) => {
    handlePlayer(bucket, item);
  };
  let selected = [];
  const handleCheckbox = (e) => {
    let i = e.target.name.split("-").map((num) => parseInt(num));
    selected.push(i);
    console.log(selected);
  };

  const deleteSelected = () => {
    if (selected.length === 0) return;
    console.log(selected);
    const tempData = Array.from(data)
    selected.map(async (i) => {
      console.log(i);
      tempData[i[0]].items.splice(i[1],1)
      console.log("here----->",`http://localhost:3000/data/${i[0]+1}`,tempData)
      let response = await axios.put(
        `http://localhost:3000/data/${i[0]+1}`,
        tempData[i[0]]
      )
      setData(tempData)
      return;
    });
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <FormContainer>
        {data === null ? (
          <div className="div">
            <h1>Loading...</h1>
          </div>
        ) : (
          data.map((oneBucket, ib) => {
            console.log(oneBucket);
            if (!oneBucket.items.length) {
              return null;
            }
            return (
              <Droppable
                key={`${oneBucket.bucket}-${ib}`}
                className="buckets"
                droppableId={oneBucket.id.toString()}
              >
                {(provided, snapshot) => {
                  return (
                    // <Draggable>
                    <div
                      className="buckets"
                      key={`${oneBucket.bucket}-${oneBucket.id}`}
                    >
                      <div className="headding">
                        <h2>{oneBucket.bucket}</h2>
                      </div>
                      <div
                        className="items"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {oneBucket.items.map((item, i) => {
                          return (
                            <Draggable
                              key={`${oneBucket.bucket}-${item.name}`}
                              draggableId={item.name}
                              index={i}
                            >
                              {(provided) => {
                                return (
                                  <div
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                    className="item"
                                    key={`${oneBucket.bucket}-${item.name}second`}
                                  >
                                    <div
                                      onClick={() => handleOnPlay(ib, i)}
                                      className="playButton"
                                    >
                                      <BsFillPlayFill
                                        style={{ fontSize: "30px" }}
                                      />
                                    </div>
                                    <button onClick={deleteSelected}>
                                      delete
                                    </button>

                                    <div className="itemName">{item.name}</div>
                                    <div className="itemSelect">
                                      <input
                                        style={{
                                          width: "20px",
                                          height: "20px",
                                        }}
                                        onChange={handleCheckbox}
                                        type="checkbox"
                                        name={`${ib}-${i}`}
                                        value="Bike"
                                      />
                                    </div>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    </div>
                    // </Draggable>
                  );
                }}
              </Droppable>
            );
          })
        )}
      </FormContainer>
    </DragDropContext>
  );
};
const FormContainer = styled.div`
  height: 80vh;
  width: 100vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  // flex-direction:column;
  // overflow-x:scroll;
  // overflow-y:hidden;
  // display:grid;
  // grid-template-columns  :auto auto;
  background-color: "#e9e9e9";

  .buckets {
    float: left;
    background-color: rgba(255, 255, 255, 0.5);
    // backdrop-filter: blur(40px);
    height: 90%;
    width: 350px;
    margin: 10px 15px;
    border-radius: 20px;
    padding-bottom: 20px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
      rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    transition: all 0.5s ease;

    &:hover {
      transition: all 0.5s ease;
      box-shadow: #aacbff 0px 50px 100px -20px, #64a1ff 0px 30px 60px -30px,
        #9d80ff 0px -2px 6px 0px inset;
    }
  }
  .headding {
    width: 100%;
    height: 15%;
    text-align: center;
    padding-top: 7%;
    // line-height:15%;
    border-radius: 20px 20px 0px 0px;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(40px);
  }
  .items {
    height: 85%;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 10px;
      border-radius: 10px;
      &-thumb {
        width: 6px;
        border-radius: 10px;
        background-color: #80808066;
        background-clip: padding-box;
      }
    }
  }
  .item {
    margin: 0px 0px 0px 10px;
    height: 13%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    border: 1px black solid;
    border-width: 1px 0px 1px 0px;
    .playButton {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      cursor: pointer;
    }
    .itemName {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex: 4;
    }
    .itemSelect {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
    }
  }
`;
export default Page;
