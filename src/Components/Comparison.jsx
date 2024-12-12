import { CartesianGrid, LineChart, XAxis, YAxis, Legend, Tooltip, Line } from 'recharts';
import { fetchMonthlyData } from './ComparisonData';
import { useEffect, useState } from 'react';

const Comparison = () => {
    const [data, setData] = useState([]);
    const [prev, setPrev] = useState([]);
    const [city, setCity] = useState('');

    const fetch = async (city) => {
        const res1 = await fetchMonthlyData(city, 12, 2024, 'pm10');
        setData(res1);
        const res2 = await fetchMonthlyData(city, 12, 2023, 'pm10');
        setPrev(res2);
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
        <div className='flex items-center justify-center'>
            <LineChart 
                width={800} 
                height={400} 
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" angle={90} interval={1} textAnchor='middle' dx={5} height={100} dy={45}/>
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
                <XAxis dataKey="date" angle={90} interval={1} textAnchor='middle' dx={5} height={100} dy={45}/>
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="aqi" stroke="#82ca9d" fill='blue' />
            </LineChart>
        </div>
    </div>

  )
}

export default Comparison