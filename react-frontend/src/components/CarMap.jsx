import React, { useEffect, useState } from 'react';

export default function CarMap() {
  const [car1ycord, setcar1ycord] = useState(0);
  const [car1xcord, setcar1xcord] = useState(0);
  const [daySliderValue, setDaySliderValue] = useState(0);
  const [hourSliderValue, setHourSliderValue] = useState(0);
  const [minuteSliderValue, setMinuteSliderValue] = useState(0);
  const [secondSliderValue, setSecondSliderValue] = useState(0);
  const [formattedDateTime, setFormattedDateTime] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.12.1.108:8888/api/location');
        const data = await response.json();
        console.log("working continuously");
        //test
        // Find the data for car 1
        const car1Data = data.find(item => item.car_id === 1);

        if (car1Data) {
          setcar1xcord((car1Data.x));
          setcar1ycord((car1Data.y));
        } else {
          console.log('No data found for car 1.');
        }
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
    
    // Fetch data every 1 second
    const interval = setInterval(fetchData, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

 

  const handleDaySliderChange = event => {
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

    setFormattedDateTime(`${formattedDayDate} ${hourSliderValue.toString().padStart(2, '0')}:${minuteSliderValue.toString().padStart(2, '0')}:${secondSliderValue.toString().padStart(2, '0')}`);
    console.log(formattedDayDate, hourSliderValue, minuteSliderValue, secondSliderValue);
  };

  const handleHourSliderChange = event => {
    const hours = parseInt(event.target.value, 10);
    setHourSliderValue(hours);

    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    if (daySliderValue === 0 && hours > currentHour) {
      setHourSliderValue(currentHour);
      return;
    }

    setFormattedDateTime(`${formattedDateTime.split(' ')[0]} ${hours.toString().padStart(2, '0')}:${minuteSliderValue.toString().padStart(2, '0')}:${secondSliderValue.toString().padStart(2, '0')}`);
    console.log(formattedDateTime.split(' ')[0], hours, minuteSliderValue, secondSliderValue);
  };

  const handleMinuteSliderChange = event => {
    const minutes = parseInt(event.target.value, 10);
    setMinuteSliderValue(minutes);

    const currentDate = new Date();
    const currentMinute = currentDate.getMinutes();

    if (daySliderValue === 0 && hourSliderValue === currentDate.getHours() && minutes > currentMinute) {
      setMinuteSliderValue(currentMinute);
      return;
    }

    setFormattedDateTime(`${formattedDateTime.split(' ')[0]} ${hourSliderValue.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secondSliderValue.toString().padStart(2, '0')}`);
    console.log(formattedDateTime.split(' ')[0], hourSliderValue, minutes, secondSliderValue);
  };

  const handleSecondSliderChange = event => {
    const seconds = parseInt(event.target.value, 10);
    setSecondSliderValue(seconds);

    const currentDate = new Date();
    const currentSecond = currentDate.getSeconds();

    if (daySliderValue === 0 && hourSliderValue === currentDate.getHours() && minuteSliderValue === currentDate.getMinutes() && seconds > currentSecond) {
      setSecondSliderValue(currentSecond);
      return;
    }

    setFormattedDateTime(`${formattedDateTime.split(' ')[0]} ${hourSliderValue.toString().padStart(2, '0')}:${minuteSliderValue.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    console.log(formattedDateTime.split(' ')[0], hourSliderValue, minuteSliderValue, seconds);
  };

  useEffect(() => {
    const currentDate = new Date();
    setHourSliderValue(currentDate.getHours());
    setMinuteSliderValue(currentDate.getMinutes());
    setSecondSliderValue(currentDate.getSeconds());
    setFormattedDateTime(
      `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`
    );
    console.log(formattedDateTime.split(' ')[0], currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds());
  }, []);

  return (
    <div id="wholeBody">
      <div id="map_container">
          <div id="image_container">
            <img id="cityImage" src="/images/legoCityFlipped.png" alt="City" />
            <div id="car-1" style={{ top: parseInt(car1ycord, 10) * 2.7, left: parseInt(car1xcord, 10) * 2.7}}>
              <p className="carLabel">1</p>
            </div>
        </div>
        <div id="coordinate_container">
          <div class="coordinates">
            <p>Car 1</p>
            <div>
              <p>y-coordinate: {car1ycord}</p>
              <p>x-coordinate: {car1xcord}</p>
            </div>
          </div>
        </div>
      </div>
      <div id="lowerContent_container">
        <p id="mastertime">Selected time: {formattedDateTime}</p>
        <div id="slider_container">
          
          {formattedDateTime && (
            <>
              <div id="daySlider_container">
                <p>Day : {formattedDateTime.split(' ')[0]}</p>
                <input type="range" min={0} max={7} value={7 - daySliderValue} onChange={handleDaySliderChange} />
              </div>
              <div id="hourSlider_container">
              <p>Hour : {formattedDateTime.split(' ')[1].split(':')[0]} hr</p>
              <input
                  type="range"
                  min={0}
                  max={23}
                  value={hourSliderValue}
                  onChange={handleHourSliderChange}
                  disabled={daySliderValue === 0 && hourSliderValue > new Date().getHours()}
                />
              </div>
              
              <div id="minuteSlider_container">
                <p>Minute : {formattedDateTime.split(' ')[1].split(':')[1]} min</p>
                <input
                  type="range"
                  min={0}
                  max={59}
                  value={minuteSliderValue}
                  onChange={handleMinuteSliderChange}
                  disabled={
                    daySliderValue === 0 &&
                    hourSliderValue === new Date().getHours() &&
                    minuteSliderValue > new Date().getMinutes()
                  }
                />
              </div>

              <div id="secondSlider_container">
                <p>Second : {formattedDateTime.split(' ')[1].split(':')[2]} sec</p>
                <input
                  type="range"
                  min={0}
                  max={59}
                  value={secondSliderValue}
                  onChange={handleSecondSliderChange}
                  disabled={
                    daySliderValue === 0 &&
                    hourSliderValue === new Date().getHours() &&
                    minuteSliderValue === new Date().getMinutes() &&
                    secondSliderValue > new Date().getSeconds()
                  }
              />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

