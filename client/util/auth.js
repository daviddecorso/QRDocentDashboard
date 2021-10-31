export default function isLogin() {
    const token = localStorage.getItem('accessToken');
    if (token === null || token === 'logout') {
        return false;
    } else {
        return true;
    }
}
