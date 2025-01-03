import { CartesianGrid, LineChart, XAxis, YAxis, Legend, Tooltip, Line } from 'recharts';
import { fetchMonthlyData } from './ComparisonData';
import { useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { redirect } from 'react-router';
import { capitalizeFirstLetter } from '../utils';

const Comparison = () => {

    if (localStorage.getItem('role') !== 'admin') {
        redirect('/');
    }
    
    const [data, setData] = useState([]);
    const [prev, setPrev] = useState([]);
    const [city, setCity] = useState('');
    const [error, setError] = useState('');
    const [fecthedCity, setFetchedCity] = useState('');

    const [loading, setLoading] = useState(false);
    const role = localStorage.getItem('role');
    if(role !== 'admin'){
        return <div className='text-white text-center text-3xl font-bold'>You are not authorized to access this page</div>
    }

    const fetch = async (city) => {
        setLoading(true);
        const res1 = await fetchMonthlyData(city, new Date(Date.now()).getMonth() + 1, new Date(Date.now()).getFullYear(), 'pm10');
        setData(res1);
        console.log(res1);
        const res2 = await fetchMonthlyData(city, new Date(Date.now()).getMonth() + 1, new Date(Date.now()).getFullYear() - 1, 'pm10');
        setPrev(res2);
        if (res1.length === 0 || res2.length === 0) {
            setError('Data not found');
        }
        setFetchedCity(city);
        setLoading(false);
    }

  return (
    <div className='pb-32 pt-32 bg-[#050816]'>
        <h1 className='text-3xl font-bold text-white text-center mb-8'>Monthwise Comparison with previous year</h1>
        <div className='flex items-center justify-center mb-8 space-x-2'>
            <input type="text" className='w-64 rounded-lg bg-transparent border h-12 px-4 py-2 text-white' placeholder='Search city' value={city} onChange={(e)=>setCity(e.target.value)}/>
            <button 
                className='bg-blue-500 text-white rounded-lg h-12 w-28' 
                onClick={()=>{
                    fetch(city);
            }}>
                Submit
            </button>
        </div>
        {loading && <Box style={{ backgroundColor: "rgb(5, 8, 22)" }} className="my-8 flex items-center justify-center">
            <CircularProgress />
        </Box>}
        <div className='text-red-600 text-lg text-center mb-7' > { error } </div>

        <div className='flex items-center justify-center'>
            <LineChart 
                width={800} 
                height={400} 
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >


                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" angle={-90} interval={1} textAnchor='middle' dx={5} height={100} dy={45}/>
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="aqi" stroke="#82ca9d" fill='blue' />
            </LineChart>
            <LineChart 
                width={800} 
                height={400} 
                data={prev}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" angle={-90} interval={1} textAnchor='middle' dx={5} height={100} dy={45}/>
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="aqi" stroke="#82ca9d" fill='blue' />
            </LineChart>
        </div>
        {fecthedCity && <div className='mt-7 font-medium text-lg text-white text-center'>AQI Comparison of {capitalizeFirstLetter(fecthedCity)}</div>}
    </div>

  )
}

export default Comparison