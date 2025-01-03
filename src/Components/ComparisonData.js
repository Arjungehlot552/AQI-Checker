import axios from "axios"
import {capitalizeFirstLetter} from "../utils";

const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
};

export const fetchMonthlyData = async (city, month, year, pp) => {
    const daysInMonth = getDaysInMonth(month, year);
    const data = [];

    const localStorageValue = localStorage.getItem(`${city.toLowerCase()} ${month} ${year}`)

    if (localStorageValue){
        const localStorageItem = JSON.parse(localStorageValue);
        const generationTime = new Date(localStorageItem.generateTime);
        const currentTime = new Date(Date.now());
        const diff = Math.abs(currentTime - generationTime) / (1000 * 60 * 60 * 24);
        if (diff < 1) {
            return localStorageItem.data;
        }
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const date = `${day.toString().padStart(2, '0')}${month.toString().padStart(2, '0')}${year.toString().slice(-2)}`;
        try {
            const dailyData = await fetchData(city, date, pp);
            data.push({
                date: `${day}-${month}-${year}`,
                aqi: dailyData.predicted_aqi,
                prominent_pollutant: dailyData.prominent_pollutant
            });
        } catch (error) {
            console.error(`Error fetching data for ${date}:`, error);
        }
    }

    if (data.length !== 0) {
        const storageItem = {
            data,
            generateTime: new Date(Date.now())
        }
        localStorage.setItem(`${city.toLowerCase()} ${month} ${year}`, JSON.stringify(storageItem))
    }

    return data;
};

export const fetchData = async (city, date, pp) => {
        const response = await axios.post("https://newmodelaqi.onrender.com/predict-aqi", {
            city: capitalizeFirstLetter(city),
            date_ddmmyy: date,
            prominent_pollutant: pp,
        },{
            auth:{
                username: "admin",
                password: "password123"
            }
        })
        return response.data
}