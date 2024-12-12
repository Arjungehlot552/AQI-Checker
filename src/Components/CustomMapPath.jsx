
export const fetchingData = async (city) => {
  
  try{
    const pm10Response = []
    const data = await fetch(`https://api.waqi.info/feed/${city}/?token=2957d73d72e0f99e73a757c6c091c83fd6415f7c`);
    const res = await data.json();
    const pm10List = res.data.forecast.daily.pm10
    const pm25List = res.data.forecast.daily.pm25
    const o3List = res.data.forecast.daily.o3

    for(let i = 0; i < Math.min(pm10List.length, pm25List.length, o3List.length); i++){
      pm10Response.push({
        date: pm10List[i].day,
        pm10: pm10List[i].avg,
        pm25: pm25List[i].avg,
        o3: o3List[i].avg
      })
    }

    return pm10Response
    
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
