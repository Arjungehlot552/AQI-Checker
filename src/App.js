import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Ranking from './Components/Ranking';
import Monitor from './Components/Monitor';
import Resources from './Components/Resources';
import Footer from './Components/Footer';
import AqiData from './Components/AQIData';
import MyProfile from './Components/MyProfile';
import Dashboard from './Dashboard';
import Activity from './Components/Activity';
import ProblemArise from './Components/ProblemArise';
import MyScore from './Components/MyScore';
import MyRedeem from './Components/MyRedeem';
import { Route, Routes } from 'react-router-dom'; // Remove BrowserRouter import
import Blog from './Blog/Blog';
import AboutUs from './Components/AboutUs';
import DailyForecast from './Forecast/DailyForecast';
import Condition from "../src/Terms&Codition/Condition"
import Doctor from './Components/MyDoctor';
import NGOs from './Components/NGOs';
import InputData from './Analysis/InputData';
import Contact from './Components/Contact';
import BlogPage from './Blog/BlogPage';
import AboutSensors from './Sensors/AboutSensors';
// import Thing from './ThinkSpeak/Thing';
import HeatMap from './Components/HeatMap';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/thing' element={<HeatMap />} />
        <Route path="/monitor" element={<Monitor />} />
        <Route path="/aqi-data" element={<AqiData />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/myProfile" element={<MyProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/activity' element={<Activity />} />
        <Route path='/problemarise' element={<ProblemArise />} />
        <Route path='/myscore' element={<MyScore />} />
        <Route path='/myredeem' element={<MyRedeem />} />
        <Route path="/blog" element={<Blog />}/>
        <Route path="/about" element={<AboutUs />}/>
        <Route path="/terms" element={<Condition />}/>
        <Route path="/CustomMapPath/:searchQuery" element={<DailyForecast />}/>
        <Route path="/Doctor" element={<Doctor />} />
        <Route path="/NGOs" element={<NGOs />} />
        <Route path='/aqi-info' element={<InputData />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog/blog-page" element={<BlogPage />} />
        <Route path="/air-quality" element={<AboutSensors />} />
        
      </Routes>
      <Footer />
</>
  );
}

export default App;
