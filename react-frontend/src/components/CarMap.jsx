import React, { useEffect, useState } from 'react';

export default function CarMap() {
  const [car1ycord, setcar1ycord] = useState('0px');
  const [daySliderValue, setDaySliderValue] = useState(0);
  const [hourSliderValue, setHourSliderValue] = useState(0);
  const [formattedDateTime, setFormattedDateTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setcar1ycord(Math.random() * 306 + 'px');
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleDaySliderChange = (event) => {
    const days = 7 - parseInt(event.target.value, 10);
    setDaySliderValue(days);

    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const targetDate = new Date(currentDate.getTime() - days * millisecondsPerDay);

    // Format the target date
    const year = targetDate.getFullYear();
    const month = (targetDate.getMonth() + 1).toString().padStart(2, '0');
    const day = targetDate.getDate().toString().padStart(2, '0');
    const formattedDayDate = `${year}-${month}-${day}`;

    setFormattedDateTime(`${formattedDayDate} ${hourSliderValue}:00`);
    console.log(formattedDayDate, hourSliderValue);
  };

  const handleHourSliderChange = (event) => {
    const hours = parseInt(event.target.value, 10);
    setHourSliderValue(hours);

    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    if (daySliderValue === 0 && hours > currentHour) {
      setHourSliderValue(currentHour);
      return;
    }

    setFormattedDateTime(`${formattedDateTime.split(' ')[0]} ${hourSliderValue}:00`);
    console.log(formattedDateTime.split(' ')[0], hourSliderValue);
  };

  useEffect(() => {
    const currentDate = new Date();
    setHourSliderValue(currentDate.getHours());
    setFormattedDateTime(
      `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours()}:00`
    );
    console.log(formattedDateTime.split(' ')[0], currentDate.getHours());
  }, []);

  return (
    <div id="map">
      <img id="cityImage" src="/images/legoCity.png" alt="City" />
      <div id="car-1" style={{ top: car1ycord, left: '110px' }}>
        <p className="carLabel">1</p>
      </div>
      <div id="car-2" style={{ top: car1ycord, left: '360px' }}>
        <p className="carLabel">2</p>
      </div>
      <p>Pink Car y-coordinate: {car1ycord}</p>
      <input type="range" min={0} max={7} value={7 - daySliderValue} onChange={handleDaySliderChange} />
      <p>Day Slider Value: {formattedDateTime}</p>
      <input
        type="range"
        min={0}
        max={24}
        value={hourSliderValue}
        onChange={handleHourSliderChange}
        disabled={daySliderValue === 0 && hourSliderValue > new Date().getHours()}
      />
      <p>Hour Slider Value: {formattedDateTime.split(' ')[1]}</p>
    </div>
  );
}
