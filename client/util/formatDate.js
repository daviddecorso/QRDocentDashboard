export default function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
}
