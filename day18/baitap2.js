// hàm 1/
const createCalculator = function () {
    return {
        add: (a, b) => a + b,
        subtract: (a, b) => a - b,
        multiply: (a, b) => a * b,
        divide: (a, b) => (b === 0 ? "Lỗi: chia cho 0" : a / b),
    };
};
const calculator = createCalculator();
console.log(calculator.add(2, 3));
console.log(calculator.subtract(10, 4));
console.log(calculator.multiply(3, 5));
console.log(calculator.divide(10, 2));
console.log(calculator.divide(10, 0));
// hàm 2
function average(...numbers) {
    if (numbers.length === 0) return 0;
    const tong = numbers.reduce((acc, n) => acc + Number(n), 0);
    return tong / numbers.length;
}
console.log(average(10, 20, 30));
console.log(average(5));
console.log(average());
console.log(average(1, 2, 3, 4, 5));
// hàm 3/
function applyDiscount(price, discountPercent = 10) {
    if (!Number.isFinite(price)) return "Giá không hợp lệ";
    return Math.floor(price * (1 - discountPercent / 100));
}

console.log(applyDiscount(100000));

// hàm 4/
function safeCalculate(operation, ...numbers) {
    const nums = numbers.map(Number);
    let result;

    switch (operation) {
        case "add":
            result = nums.reduce((a, b) => a + b, 0);
            break;

        case "subtract":
            result = nums.reduce((a, b) => a - b);
            break;

        case "multiply":
            result = nums.reduce((a, b) => a * b, 1);
            break;

        case "average":
            result = average(...nums);
            break;

        default:
            return "Phép tính không được hỗ trợ";
    }
    return Number.isNaN(result) ? "Kết quả không hợp lệ" : result;
}
console.log(safeCalculate("add", 1, 2, 3));
console.log(safeCalculate("add", 1, "abc", 3));
