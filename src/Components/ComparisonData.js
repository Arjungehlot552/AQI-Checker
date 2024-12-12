import axios from "axios"

const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
};

export const fetchMonthlyData = async (city, month, year, pp) => {
    const daysInMonth = getDaysInMonth(month, year);
    const data = [];

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
    return data;
};

export const fetchData = async (city, date, pp) => {
        const response = await axios.post("https://newmodelaqi.onrender.com/predict-aqi", {
            city: city,
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