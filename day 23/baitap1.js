// Hàm 1
function formatBirthday(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
}
console.log(formatBirthday("1995-03-25"));
console.log(formatBirthday("2000-12-01"));
// Hàm 2
function getAge(birthdayString, currentDateString) {
    const [birthYear, birthMonth, birthDay] = birthdayString
        .split("-")
        .map(Number);
    const [currentYear, currentMonth, currentDay] = currentDateString
        .split("-")
        .map(Number);
    let age = currentYear - birthYear;
    if (
        currentMonth < birthMonth ||
        (currentMonth === birthMonth && currentDay < birthDay)
    ) {
        age--;
    }
    return age;
}
console.log(getAge("1995-03-25", "2026-07-19"));
console.log(getAge("2000-12-01", "2026-07-19"));
console.log(getAge("1995-08-01", "2026-07-19"));
// Hàm 3
function getDayOFweekName(dateString) {
    const dayNames = [
        "Chủ nhật",
        "Thứ hai",
        "Thứ ba",
        "Thứ tư",
        "Thứ năm",
        "Thứ sáu",
        "Thứ bảy",
    ];
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return dayNames[date.getDay()];
}

console.log(getDayOFweekName("2026-07-19"));
console.log(getDayOFweekName("2000-01-01"));


