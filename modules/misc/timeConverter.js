module.exports = {
    name: "timeConverter",
    execute: (min) => {
        const hours = min / 60;
        const roundHours = Math.floor(hours);
        const minutes = Math.floor((hours - roundHours) * 60);

        const hoursText = roundHours < 10 ? `0${roundHours}` : roundHours;
        const minutesText = minutes < 10 ? `0${minutes}` : minutes;

        return `${hoursText}h${minutesText}`;
    }
}