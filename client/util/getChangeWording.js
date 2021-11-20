// Gets the proper wording for analytics cards based on the selected timeframe.
export default function getChangeWording(timeRange) {
    let words;
    switch (timeRange) {
        case 'Today':
            return 'yesterday';

        default:
            words = timeRange.toLowerCase().split(' ');
            return 'last ' + words[words.length - 1];
    }
}
