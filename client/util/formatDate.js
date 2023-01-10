export default function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

export function sortDates(stringA, stringB) {
    const dateA = new Date(stringA);
    const dateB = new Date(stringB);

    if (dateA.getFullYear() < dateB.getFullYear())
        return 1;
    else if (dateA.getFullYear() > dateB.getFullYear())
        return -1;
    else if (dateA.getMonth() < dateB.getMonth())
        return 1;
    else if (dateA.getMonth() > dateB.getMonth())
        return -1;
    else if (dateA.getDate() < dateB.getDate())
        return 1;
    else if (dateA.getDate() > dateB.getDate())
        return -1;
    else
        return 0;
}
