// Hàm 1
function addDays(dateString, days) {
    const date = new Date(dateString + "T00:00:00");
    const currentDay = date.getDate();
    const newDay = currentDay + days;
    date.setDate(newDay);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}
console.log(addDays("2026-07-19", 10));
console.log(addDays("2026-07-25", 10));
console.log(addDays("2026-01-01", -5));
// Hàm 2
function getDaysBetween(date1String, date2String) {
    const date1 = new Date(date1String);
    const date2 = new Date(date2String);
    const difference = date2 - date1;
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const days = Math.abs(difference / millisecondsPerDay);
    return days;
}
console.log(getDaysBetween("2026-07-19", "2026-08-01"));
console.log(getDaysBetween("2026-01-01", "2026-12-31"));
// Hàm 3
function isExpired(expiryDateString, currentDateString) {
    const expiryDate = new Date(expiryDateString);
    const currentDate = new Date(currentDateString);

    return currentDate > expiryDate;
}
console.log(isExpired("2026-07-01", "2026-07-19")); // true
console.log(isExpired("2026-12-31", "2026-07-19")); // false
// Hàm 4
function getCountdown(targetDateString, currentDateString) {
    const targetDate = new Date(targetDateString);
    const currentDate = new Date(currentDateString);
    const difference = targetDate - currentDate;
    if (difference < 0) {
        return "Đã qua hạn";
    }
    const millisecondsPerHour = 60 * 60 * 1000;
    const millisecondsPerDay = 24 * millisecondsPerHour;
    const days = Math.floor(difference / millisecondsPerDay);
    const remainingMilliseconds = difference % millisecondsPerDay;
    const hours = Math.floor(remainingMilliseconds / millisecondsPerHour);
    return `Còn ${days} ngày ${hours} giờ`;
}
console.log(getCountdown("2026-08-01T00:00:00", "2026-07-19T12:00:00")); 
console.log(getCountdown("2026-07-01T00:00:00", "2026-07-19T12:00:00"));