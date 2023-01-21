import "./App.css";
import Navbar from "./components/Navbar";
import Page from "./components/Page";
import { DatePicker, message } from "antd";
import "antd/dist/reset.css";
import Bg from "./images/bg.png";
import ModalAddElement from "./components/ModalAddElement";
import ModalAddBucket from "./components/ModalAddBucket";
import { useEffect, useState } from "react";
import axios from "axios";
import Player from "./components/Player";
import History from "./components/History";

function App() {
  const [data, setData] = useState(null);
  const [addShow, setAddShow] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [showHistory, setShowHistory] = useState(false)
  const [playBucket, setPlayBucket] = useState(null);
  const [playItem, setPlayItem] = useState(null);

  useEffect(() => {
    const call = async () => {
      const d = await axios.get("http://localhost:3000/data");
      console.log(d.data);
      setData(d.data);
    };
    call();
  }, [addShow]);

  const handleAdd = () => {
    setAddShow(!addShow);
  };
  const handlePlayer = (bucket, item) => {
    console.log(bucket,item);
    setPlayBucket(bucket)
    setPlayItem(item)
    setShowPlayer(!showPlayer);
  };
  const handleHistory =()=>{
    setShowHistory(!showHistory)
  }

  return (
    <div style={{ backgroundImage: `url(${Bg})` }}>
      <Navbar handleAdd={handleAdd} handleHistory={handleHistory} />
      <Page handlePlayer={handlePlayer} data={data} setData={setData} />
      {addShow ? <ModalAddElement handleAdd={handleAdd} data={data} /> : null}
      {showPlayer ? (
        <Player
          data={data}
          bucket={playBucket}
          item={playItem}
          handlePlayer={handlePlayer}
        />
      ) : null}
      {
        showHistory?<History handleHistory={handleHistory}/> : null
      }
    </div>
  );
}

export default App;
