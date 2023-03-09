import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { Input, Select, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
const { Option } = Select;

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

  const checkAddBucket = (value) => {
    console.log(value)
    setOption(value);
    if (data.length + 1 == value) {
      setAddBucket(true);
    } else {
      setAddBucket(false);
    }
  };

  return (
    <FormContainer className="bg">
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <Input
            onChange={(e) => {
              return setName(e.target.value);
            }}
            value={name}
            required
            type="text"
            name="name"
            size="large"
            placeholder="Enter Name of the Video"
            prefix={<UserOutlined />}
            style={{ margin:"10px"}}
          />

          {/* <label>Name </label>
          <input
            onChange={(e) => {
              return setName(e.target.value);
            }}
            value={name}
            required
            type="text"
            name="name"
          /> */}
          <br />
          <Input
            onChange={(e) => {
              return setURL(e.target.value);
            }}
            value={URL}
            required
            type="url"
            name="URL"
            size="large"
            placeholder="Enter URL of the Video"
            prefix={<UserOutlined />}
            style={{ margin:"10px"}}

          />
          {/* <label>URL </label>
          <input
            onChange={(e) => {
              return setURL(e.target.value);
            }}
            value={URL}
            required
            type="url"
            name="URL"
          /> */}
          <br />
          <Select size="large" onChange={checkAddBucket} required name="bucketSelect" id="temp" defaultValue="select Bucket" style={{width:"100%", margin:"10px"}}>
            {/* <Option value="Option1-1">Option1-1</Option>
            <Option value="Option1-2">Option1-2</Option> */}
            {data.map((bucket, i, n) => {
              return (
                <Option id={i} value={bucket.id}>
                  {bucket.bucket}
                </Option>
              )
            })}
            <Option id={data.length + 1} value={data.length + 1}>
              Create New
            </Option>
          </Select>

          {/* <label>bucket </label>
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
          </select> */}
          <br />

          {
            addBucket ? (
              <Input
                onChange={(e) => {
                  return setaddBucketName(e.target.value);
                }}
                value={addBucketName}
                name="newBucketName"
                required
                type="text"
                size="large"
                plaveholder="Enter Name of the Bucket"
                style={{ margin:"10px"}}
                />
            ):null
          }

          {/* {addBucket ? (
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
          ) : null} */}
          <br />
          <Button style={{margin:"10px"}}  onClick={handleAdd}>Cancel</Button>
          <button style={{padding: "5px 16px",color: "#000000d9",border: "1px solid #d9d9d9",backgroundColor: "transparent", borderRadius: "2px", lineHeight: "1.4", boxShadow: "0 2px #00000004",cursor: "pointer",transition: ".3s",margin:"10px",backgroundColor:"white",borderRadius:"5px", border:"1px solid green"}} type="submit">Add</button>
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
    height: 50%;
    width: 30%;
    min-width: 300px;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    

  }
  // Input{
  //   margin: 10px 0px;
  // }
`;
export default ModalAddElement;
