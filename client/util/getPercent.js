// Gets percent difference between data.
export default function getPercent(newData, oldData) {
    if (oldData === 0) {
        return 0;
    } else {
        return (newData / oldData) * 100 - 100;
    }
}
