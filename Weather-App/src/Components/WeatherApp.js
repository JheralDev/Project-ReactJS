import { useState, useEffect } from 'react'
import WeatherForm from './WeatherForm';
import WeatherMainInfo from './WeatherMainInfo';
import Loading from './Loading';

import styles from './WeatherApp.module.css'

export default function WeatherApp(){

    const [weather, setWeather] = useState(null);

    useEffect(() => {
        loadInfo()
    }, []);

    useEffect(() => {
        document.title = `Weather | ${weather?.location.name ?? ""}`
    }, [weather])

    async function loadInfo(city = 'london'){
        try {
            const request = await fetch(
                `${process.env.REACT_APP_URL}
                &key=${process.env.REACT_APP_KEY}
                &q=${city}`
            )

            const json = await request.json()

            setWeather(json)

            console.log(json)
        } catch (error) {}
    }

    function handleSearchCity(city){
        setWeather(null)
        loadInfo(city)
    }

    return (
        <div className={styles.weatherContainer}>
            <WeatherForm changeCity={handleSearchCity} />
            {weather ? <WeatherMainInfo weather={weather} /> : <Loading />}
        </div>
    )
}