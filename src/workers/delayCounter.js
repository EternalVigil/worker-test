const updateDelayCounter = (currentValue) => {
    const now = Date.now();

    while(Date.now() < now + 5000) {}
    return currentValue + 1;
};

onmessage = async (event) => {
    if(event?.data?.msg === 'updateDelayCount') {
        const newCount = updateDelayCounter(event.data.currentCount);
        postMessage({ msg: 'delay count', newCount: newCount});
    }
}
