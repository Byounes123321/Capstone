import React, { useEffect, useState } from 'react';

export default function CarMap() {
    

    // Define the state variable for the top value
    const [car1ycord, setcar1ycord] = useState('0px');
    const [sliderValue, setSliderValue] = useState(0);
    const [formattedDate, setFormattedDate] = useState('');


    useEffect(() => {
        const interval = setInterval(() => {
            setcar1ycord(Math.random() * 306 + 'px');
        }, 1000);

        // Clean up the interval when the component is unmounted
        return () => clearInterval(interval);
        }, []);
        const handleSliderChange = (event) => {
            const days = parseInt(event.target.value, 10);
            setSliderValue(days);
        
            const millisecondsPerDay = 24 * 60 * 60 * 1000;
            const currentDate = new Date();
            const targetDate = new Date(currentDate.getTime() - (7 - days) * millisecondsPerDay);
        
            // Format the target date
            const year = targetDate.getFullYear();
            const month = (targetDate.getMonth() + 1).toString().padStart(2, '0');
            const day = targetDate.getDate().toString().padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
        
            setFormattedDate(formattedDate);
            console.log(formattedDate);
          };


    return (
        <div id="map">
                <img id="cityImage" src="/images/legoCity.png"></img>
                <div id='car-1' style={{top: car1ycord, left: '110px'}}><p class="carLabel">1</p></div>
                <div id='car-2' style={{top: car1ycord, left: '360px'}}><p class="carLabel">2</p></div>
                <p>Pink Car y-coordinate: {car1ycord}</p>
                <input type="range" min={0} max={7} onChange={handleSliderChange} />
                <p>Slider Value: {formattedDate}</p>
        </div>
    )
}