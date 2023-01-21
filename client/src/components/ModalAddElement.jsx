import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const ModalAddElement = ({ handleAdd, data }) => {
  const [addBucket, setAddBucket] = useState(false);
  const [name, setName] = useState("");
  const [URL, setURL] = useState("");
  const [option, setOption] = useState(1);
  const [addBucketName, setaddBucketName] = useState("");
  console.log(name);
  console.log(URL);
  console.log(option);
  console.log(addBucketName);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("----------->", data.length + 1, option);
    if (data.length + 1 == option) {
      const newData = {
        bucket: addBucketName,
        items: [{ url: URL, lastPlayed: "", name: name }],
      };
      const temp = await axios.post(`http://localhost:3000/data`, newData);
    } else {
      const newData = {
        bucket: addBucketName,
        items: [{ url: URL, lastPlayed: "", name: name }],
      };
      const tempData = Array.from(data);
      tempData[option - 1].items.push({ url: URL, lastPlayed: "", name: name });
      const temp = await axios.put(
        `http://localhost:3000/data/${option}`,
        tempData[option - 1]
      );
    }
    handleAdd();
  };

  const checkAddBucket = (event) => {
    console.log(event.target.value);
    setOption(event.target.value);
    if (data.length + 1 == event.target.value) {
      setAddBucket(true);
    } else {
      setAddBucket(false);
    }
  };

  return (
    <FormContainer className="bg">
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <label>Name </label>
          <input
            onChange={(e) => {
              return setName(e.target.value);
            }}
            value={name}
            required
            type="text"
            name="name"
          />
          <br />
          <label>URL </label>
          <input
            onChange={(e) => {
              return setURL(e.target.value);
            }}
            value={URL}
            required
            type="url"
            name="URL"
          />
          <br />
          <label>bucket </label>
          <select onChange={checkAddBucket} required name="bucketSelect" id="">
            {data.map((bucket, i, n) => {
              return (
                <option id={i} value={bucket.id}>
                  {bucket.bucket}
                </option>
              );
            })}
            <option id={data.length + 1} value={data.length + 1}>
              Create New
            </option>
          </select>
          <br />
          {addBucket ? (
            <>
              <label>New Bucket Name </label>
              <input
                onChange={(e) => {
                  return setaddBucketName(e.target.value);
                }}
                value={addBucketName}
                name="newBucketName"
                required
              />
            </>
          ) : null}
          <br />
          <button onClick={handleAdd}>Cancel</button>
          <button type="submit">Add</button>
        </form>
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
    height: 70%;
    width: 50%;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
  }
`;
export default ModalAddElement;
