import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';



const Clock = ({ timezone, isPause }) => {

    const [time, setTime] = useState(moment())
    const [pausedTime, setPausedTime] = useState(null);

    const getTimeBasedOnTimeZone = async (timezoneArea) => {
        try {
            const timeDetails = await axios.get(`http://worldtimeapi.org/api/${timezoneArea}`);
            const responseTime = timeDetails.data.utc_datetime

            const timeZoneWise = moment.tz(responseTime, timezoneArea)
            // const hour = timeZoneWise.format('HH');
            // const minute = timeZoneWise.format('mm');
            // const second = timeZoneWise.format('ss');
            // console.log('timeZoneWise', timeZoneWise)
            // const readableTime = `${hour}:${minute}:${second}`;

            setTime(timeZoneWise);

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        const interval = setInterval(() => {
            if (!isPause && timezone && timezone.length > 0) {
                // Update the time every second when not paused
                setTime((prevTime) => prevTime.add(1, 'second'));

            }
        }, 1000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timezone, isPause]);

    useEffect(() => {
        if (!isPause && timezone && timezone.length > 0) {
            getTimeBasedOnTimeZone(timezone)
        } else {
            setPausedTime(time)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPause, timezone])

    console.log('pausedTime', pausedTime)
    useEffect(() => {
        // If isPause changes to false, resume the clock from the paused time
        if (!isPause && pausedTime && pausedTime.length > 0) {
            setTime(pausedTime);
        }
    }, [isPause, pausedTime]);

    return (
        <div className='bg-[#1533667f] text-white w-15 h-12 mt-2 text-center pt-2'>
            <h2>{pausedTime && pausedTime !== null ? pausedTime.format('HH:mm:ss') : time.format('HH:mm:ss')}</h2>
        </div>
    );
};

export default Clock;
