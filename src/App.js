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
import Blog from './Components/Blog';
import AboutUs from './Components/AboutUs';
import DailyForecast from './Forecast/DailyForecast';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
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
        <Route path="/CustomMapPath/:searchQuery" element={<DailyForecast />}/>
        
      </Routes>
      <Footer />
    </>
  );
}

export default App;
