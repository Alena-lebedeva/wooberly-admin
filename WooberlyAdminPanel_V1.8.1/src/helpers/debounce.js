// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// `wait` milliseconds.
export default function debounce(func, wait) {
    let timeout;
    try {
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };

            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    } catch (e) {
        console.log('error');
        console.log(e);
    }
};