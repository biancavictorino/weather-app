import { useState } from 'react'
import axios from 'axios'

const Weather = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [data , setData] = useState({});
    const [location , setLocation] = useState('');

    const apiKey = import.meta.env.VITE_API_KEY

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`

    const searchLocation = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            setData({});
            const response = await axios.get(url);
            setData(response.data);
            setError('');
            console.log(response.data);

        } catch (error) {
            setError('Error fetching data. Please Try again later.');
            setData({});
            
        }
        
        setLoading(false);
        setLocation("");
    }

    return (
        <div className='p-8 h-screen md:px-96 bg-cover bg-center' style={{ backgroundImage: `url('/src/assets/bg-image.jpg')`}} >
            <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-0'></div>
            <div className='relative search-bar rounded-full bg-white bg-opacity-15 z-10'>
                <form onSubmit={searchLocation} className='flex' name='input'>
                    <input required value={location} onChange={event => setLocation(event.target.value)} type="text" className='rounded-full w-full text-white px-4 text-sm font-light bg-white bg-opacity-0 focus:outline-none placeholder:text-white' placeholder='Search a location'/>
                    <button type='submit' className='border py-2 px-4 rounded-full text-sm text-white font-semibold border-gray hover:bg-white hover:text-sky-500'>Search</button>
                </form>
            </div>

            <div className='relative py-10 flex flex-col justify-around gap-2'>
                {error && 
                    <div className='text-white font-bold text-center rounded-full text-xl'>
                        <p>{error}</p>
                    </div>
                }

                {loading && 
                    <div className='text-white font-medium text-center'>
                        <p>Please wait...</p>
                    </div>
                }

                <div className='flex items-start flex-col'>
                    <h1 className='text-2xl font-bold'>{data.name}</h1>
                    {data.weather ? <p className='text-sm font-extralight'>{data.weather[0].description}</p> :null}
                    
                </div>
                <div className='flex flex-col justify-center items-center py-10 gap-2'>
                    {data.weather ? <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="" className='h-28 w-28'/> : null}
                    {data.main ? <h1 className='text-7xl font-extrabold'>{data.main.temp.toFixed()}<span className='font-medium'>°C</span></h1> : null}
                    {data.weather ? <p className='text-xl'>{data.weather[0].main}</p> : null}
                </div>

                {data.name != undefined && 
                    <div className='p-4 bg-white bg-opacity-30 h-auto rounded-2xl flex flex-row items-center justify-around'>
                    <div className='flex flex-col justify-center items-center'>
                        {data.main ? <h1 className='text-2xl font-semibold'>{data.main.feels_like.toFixed()}°C</h1> : null}
                        <p className='text-sm'>Feels Like</p>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        {data.main ? <h1 className='text-2xl font-semibold'>{data.main.humidity}%</h1> : null}
                        <p className='text-sm'>Humidity</p>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        {data.wind ? <h1 className='text-2xl font-semibold'>{data.wind.speed.toFixed()} MPH</h1> : null}
                        <p className='text-sm'>Wind</p>
                    </div>
                </div>
                }
            </div>
        </div>
    )
    }

export default Weather