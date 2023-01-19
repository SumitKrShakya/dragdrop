import './App.css';
import Navbar from './components/Navbar';
import Page from './components/Page';
import { DatePicker, message } from 'antd';
import 'antd/dist/reset.css';

function App() {
  return (
    <>
    <Navbar/>
    <Page/>
    </>
  );
}

export default App;
