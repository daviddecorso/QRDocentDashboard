export default function getMinutesFromTimestamp(timestamp) {
    const split = timestamp.split(':');
    let minutes = Number(split[0]) * 60 + Number(split[1]);
    if (split[2] >= 30) {
        minutes++;
    }
    return minutes;
}
