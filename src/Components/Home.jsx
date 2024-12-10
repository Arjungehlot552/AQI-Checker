import React from "react";
// import { GoogleMap, LoadScript } from '@react-google-maps/api';
import AQIScale from "./AQIScale";
import Know from "./Know";
import Blog from "../Blog/Blog";
// import MediaCoverage from './MediaCoverage';
// import AllCountry from './AllCountry';
import AQIAppPage from "./AQIAppPage";
// import AQIRoom from './AQIRoom';
// import AQIMeter from './AQIMeter';
// import WeatherApp from './WeatherApp';
// import HealthAdvice from './HealthAdvice';
import MapComponent from "./MapComponent";
// import Activity from './Activity';
// import MyDoctor from './MyDoctor';
import Swiper from "./Swiper";
// import SearchAqi from './SearchAqi'
// import NGOs from './NGOs';
// import MoreWeather from './MoreWeather';
import MyVideo from "./MyVideo";
import MoreWeather from "./MoreWeather";
// import ForeCast from './ForeCast';
// import Cigarette from './Cigarette';
// import MonitorMap from './MonitorMap';
// import CustomMapPath from './CustomMapPath';
// import DailyForecast from '../Forecast/DailyForecast'
// import InputData from '../Analysis/InputData';
import EditorsPick from "../Media/Editor";
import Main from "../Home/Main";
// import Contact from './Contact';
// import Thing from '../Thing_Speak/Thing';

// import AuthPage from './AuthPage';

// const mapContainerStyle = {
//   height: "99vh", // 99% of the viewport height
//   width: "99vw"   // 99% of the viewport width
// };

// Center the map on India
// const center = {
//   lat: 20.5937, // Latitude for India's approximate center
//   lng: 78.9629  // Longitude for India's approximate center
// };

// const options = {
//   disableDefaultUI: true,
//   zoomControl: true,
//   fullscreenControl: true,
//   minZoom: 4, // Minimum zoom level to keep focus on India only
//   maxZoom: 45 // Max zoom level to avoid zooming out too far
// };

const Home = () => {
  return (
    <>
      <div className="bg-bg">
        <div className="lg:pl-20 lg:pr-20 ">
          {/* <div className="relative mt-[5.2rem] h-[98vh] w-[98vw] ">
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={5}  // Zoom level set to focus on India
            options={options}
          >
            {/* Additional components like markers can be added here */}
          {/* </GoogleMap> */}
          {/* </LoadScript>
        <div className="absolute top-0 left-0 z-10 p-4 text-white">
          <h1 className="text-3xl font-bold">AQI Project</h1>
          <p className="text-lg">Air Quality Index Monitoring</p>
        </div> */}
          {/* </div> */}
          {/* <Activity /> */}
          {/* <AuthPage /> */}
          {/* <CustomMapPath /> */}
          {/* <MonitorMap /> */}
          {/* <DailyForecast /> */}

          <Main />
          {/* <Thing /> */}

          <Swiper />

          <AQIScale />
          <MapComponent />
          <MoreWeather />
          {/* <InputData /> */}
          {/* <SearchAqi /> */}
          {/* <ForeCast /> */}
          {/* <Cigarette /> */}
          {/* <MyDoctor /> */}

          {/* <NGOs /> */}

          {/* <HealthAdvice /> */}
          {/* <AQIRoom /> */}

          {/* <AQIMeter /> */}
          {/* <WeatherApp /> */}
          <Know />
          <MyVideo />
          <Blog />
          <EditorsPick />

          {/* <MediaCoverage /> */}
          {/* <AllCountry /> */}
          <AQIAppPage />
        </div>
      </div>
    </>
  );
};

export default Home;
