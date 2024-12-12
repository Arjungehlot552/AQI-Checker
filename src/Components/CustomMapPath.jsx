
export const fetchingData = async (city) => {
  
  try{
    const response = []
    const data = await fetch(`https://api.waqi.info/feed/${city}/?token=2957d73d72e0f99e73a757c6c091c83fd6415f7c`);
    const res = await data.json();
    const aqiList = res.data.forecast.daily.pm10

    for(let i = 0; i < aqiList.length; i++){
      response.push({
        date: aqiList[i].day,
        aqi: aqiList[i].avg
      })
    }

    return response
    
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
