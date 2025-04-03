function checkRoute(url) {
    if (url.includes("/charter")) {
        return 0;
    } else if (url.includes("/purchase")) {
        return 1;
    }
    return null;
}
export default checkRoute