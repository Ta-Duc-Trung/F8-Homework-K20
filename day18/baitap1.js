const examResults = [
    { student: "An", scores: [8.5, 7, 9, 6.5] },
    { student: "Bình", scores: [10, 9.5, 8, 10] },
    { student: "Chi", scores: [5, 4.5, 6, 5.5] },
    { student: "Duy", scores: [7, 7, 7, 7] },
];
function getAverage(scores) {
    const tong = scores.reduce((acc, diem) => acc + diem, 0);
    return Number((tong / scores.length).toFixed(1));
}
console.log(getAverage([8.5, 7, 9, 6.5]));
console.log(getAverage([10, 9.5, 8, 10]));
console.log(getAverage([5, 4.5, 6, 5.5]));

// Hàm 2/
function classifyStudents(average) {
    if (average >= 9) {
        return "Xuất sắc";
    }
    if (average >= 8) {
        return "Giỏi";
    }
    if (average >= 6.5) {
        return "Khá";
    }
    if (average >= 5) {
        return "Trung bình";
    }
    return "Yếu";
}
console.log(classifyStudents(getAverage([8.5, 7, 9, 6.5])));
// Hàm 3/
function isValidScore(score) {
    return Number.isFinite(score) && score >= 0 && score <= 10;
}
console.log(isValidScore(8.5));
console.log(isValidScore(-1));
console.log(isValidScore(11));
console.log(isValidScore(Infinity));
console.log(isValidScore(NaN));
// Hàm 4/
function getReportCard(examResults) {
    return examResults.map(({ student, scores }) => {
        const average = getAverage(scores);
        return {
            student,
            average,
            classifyStudents: classifyStudents(average),
        };
    });
}
console.log(getReportCard(examResults));
