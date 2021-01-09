import React, { useEffect, useState, useRef } from 'react'

function StopWatch(props) {
    const [time, setTime] = useState(0)
    const [timeStatus, setTimeStatus] = useState(0) // Timer status 0: stop, 1: running, 2: pause
    const timeInt = useRef(null)

    const startTimer = () => {
        setTimeStatus(1)
    }

    const pauseTimer = () => {
        setTimeStatus(2)
    }

    const stopTimer = () => {
        setTimeStatus(0)
    }


    const getFormatedTime = (rawTime) => {
        const millis = rawTime % 100;
        const second = Math.floor((rawTime / 100) % 60);
        const minute = Math.floor((rawTime / (100 * 60)) % 60);
        const hour = Math.floor((rawTime / (100 * 60 * 60)) % 24);

        return `${("0" + hour).slice(-2)}:${("0" + minute).slice(-2)}:${("0" + second).slice(-2)}:${("" + millis).slice(-2)}`
    }

    useEffect(() => {
        if (timeStatus === 1) {
            const timeInterval = setInterval(() => {
                setTime((prevTime) => {
                    return prevTime + 1
                })
            }, 10)

            timeInt.current = timeInterval
        }

        if (timeStatus === 2) {
            clearInterval(timeInt.current)
        }

        if (timeStatus === 0) {
            clearInterval(timeInt.current)
            setTime(0)
        }

        return () => {
            clearInterval(timeInt.current);
        }
    }, [timeStatus])

    return (
        <div style={{ padding: '10px', border: '2px solid deepPink', marginTop: '4px' }}>
            <div>Stop watch</div>
            <div style={{ fontSize: '2em' }}>
                { getFormatedTime(time) }
            </div>
            <div style={{ paddingTop: '10px', display: 'flex', gap: '5px' }}>
                {
                    timeStatus === 1 ?
                    (<button onClick={pauseTimer} style={{ flex: 1 }}>Pause</button>) :   
                    (<button onClick={startTimer} style={{ flex: 1 }}>Start</button>)   
                }
                <button onClick={stopTimer} style={{ flex: 1 }}>Stop</button>
                <button onClick={() => props.remove(props.watchID)} style={{ flex: 1 }}>Remove</button>
            </div>
        </div>
    )
}

export default StopWatch
