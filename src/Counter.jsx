import React, { useState, useEffect, useMemo } from 'react';

export const Counter = () => {

    const [normalCounter, setNormalCounter] = useState(0);
    const [delayCounter, setDelayCounter] = useState(0);

    const delayWorker = useMemo(() => new Worker(new URL('./workers/delayCounter.js', import.meta.url)), []);

    const handleNormalCount = () => {
        setNormalCounter(normalCounter+1);
    };

    const handleDelayCount = () => {
        delayWorker.postMessage({ msg: 'updateDelayCount', currentCount: delayCounter });
    };

    useEffect(() => {
        delayWorker.onmessage = (event) => {
            if(event?.data) {
                setDelayCounter(event?.data?.newCount);
            }
        };

    }, [delayWorker]);

    return(
        <div className="counterContainer">
            COUNTER GOES HERE
            <div>
                <button onClick={handleNormalCount}>Update Normal Count</button>
            </div>
            <div>
                {normalCounter}
            </div>
            <div>
                <button onClick={handleDelayCount}>
                    Update Delayed Counter
                </button>
            </div>
            <div>
                {delayCounter}
            </div>
        </div>
    );
};
