import React, { useState } from 'react'
import axios from 'axios';
const THING_SPEAK_API = process.env.THING_SPEAK_API || "https://api.thingspeak.com/channels/1899264/feeds/last.json?api_key=RM077HSBKWZR970D";
const Thing = () => {
    const [data, setData] = useState({

    });
    const handleClick = async () => {
        await axios.get(THING_SPEAK_API)
            .then((response) => {
                setData(response.data.feeds);
            }).catch(err => setData(err))
    }
    return (
        <div>
            <button onClick={handleClick}>Click Me</button>
            {data && <p>{data}</p>}
        </div>
    )
}
//   "created_at": "2024-12-08T13:58:13Z",
//   "entry_id": 392,
//   "field1": "26.70000",
//   "field2": "45.80000",
//   "field3": "0.10000",
//   "field4": "73.54000",
//   "field5": "1.13636",
//   "field6": "73.54000",
//   "field7": "\"23.2601516\"",
//   "field8": "\"77.4133993\""
export default Thing;
