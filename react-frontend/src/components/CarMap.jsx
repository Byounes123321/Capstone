import React, { useEffect, useState } from 'react';

export default function CarMap() {
    
    // Define the state variable for the top value
    const [car1ycord, setcar1ycord] = useState('0px');

    useEffect(() => {
        const interval = setInterval(() => {
            setcar1ycord(Math.random() * 306 + 'px');
        }, 1000);

        // Clean up the interval when the component is unmounted
        return () => clearInterval(interval);
        }, []);

    return (
        <div id="map">
                <img id="cityImage" src="/images/legoCity.png"></img>
                <div id='car-1' style={{top: car1ycord, left: '110px'}}><p class="carLabel">1</p></div>
                <div id='car-2' style={{top: car1ycord, left: '360px'}}><p class="carLabel">2</p></div>
                <p>Pink Car y-coordinate: {car1ycord}</p>
        </div>
    )
}