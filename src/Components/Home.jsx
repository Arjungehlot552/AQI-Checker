import React from 'react';
import AQIScale from './AQIScale';
import Know from './Know';
import Blog from '../Blog/Blog';
import AQIAppPage from './AQIAppPage';
import MapComponent from './MapComponent';
import Swiper from './Swiper';
import MyVideo from './MyVideo';
import MoreWeather from './MoreWeather';
import EditorsPick from '../Media/Editor';
import Main from '../Home/Main';
import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate()
  const email = localStorage.getItem('email');
  const role = localStorage.getItem('role');
  if(!email || !role){
    navigate("/auth")
  }

  return (
    <>
      <div style={{ backgroundColor: "rgb(5, 8, 22)" }}>


        <div className=' '>

          <Main />
          <Swiper />

          <AQIScale />
          <MapComponent />
          <MoreWeather />
          <Know />
          <MyVideo />
          <Blog />
          <EditorsPick />
          <AQIAppPage />
        </div>
      </div>
    </>
  );
};

export default Home;
