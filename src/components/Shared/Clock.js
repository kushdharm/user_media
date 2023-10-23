import axios from 'axios';
import React, {useEffect, useMemo, useState } from 'react';
import moment from 'moment-timezone';



const Clock = ({ timezone, isPause }) => {

    const [time, setTime] = useState(moment())

    const getTimeOfRegion = async (timezoneArea) => {

        try {
            const timeDetails = await axios.get(`http://worldtimeapi.org/api/${timezoneArea}`);
            const responseTime = timeDetails.data.utc_datetime

            const timeZoneWise = moment.tz(responseTime, timezoneArea)
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

                console.log('second +++')
                console.log('time',time)
            }
        }, 1000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timezone, isPause]);

    const getTimeOfRegionCall = useMemo(() => {
        getTimeOfRegion(timezone)
    }, [timezone])

    useEffect(() => {
        if (!isPause && timezone && timezone.length > 0) {
            // eslint-disable-next-line no-unused-expressions
            getTimeOfRegionCall
        } else {
            setTime(time)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPause, timezone])


    return (
        <div className='bg-[#1533667f] text-white w-15 h-12 mt-2 text-center pt-2'>
            <h2>{time && Object.keys(time).length>0 && time.format('HH:mm:ss')}</h2>
        </div>
    );
};

export default Clock;
