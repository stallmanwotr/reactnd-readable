/* eslint indent: 0 */

const MONTH_NAMES = 
    ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * Formats the timestamp as a simple string. This could be improved!
 */
export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const month = MONTH_NAMES[date.getMonth()];

    if (date.getFullYear() !== now.getFullYear()) {
        return `${month} ${date.getFullYear()}`;
    }
    if (date.getMonth() !== now.getMonth()) {
        return `${month}`;
    }

    const days = now.getDate() - date.getDate();
    if (days > 1) {
        return `${days} days ago`;
    }
    if (days === 1) {
        return '1 day ago';
    }

    const hours = now.getHours() - date.getHours();
    if (hours > 1) {
        return `${hours} hours ago`;
    }
    if (hours === 1) {
        return '1 hour ago';
    }

    const mins = now.getMinutes() - date.getMinutes();
    if (mins > 1) {
        return `${mins} mins ago`;
    }
    if (mins === 1) {
        return '1 min ago';
    }

    const secs = now.getSeconds() - date.getSeconds();
    if (secs > 1) {
        return `${secs} seconds ago`;
    }
    if (secs === 1) {
        return '1 second ago';
    }

    return 'just now';
};
