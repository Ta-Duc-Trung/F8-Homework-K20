function classifyTriangle(a, b, c) {
    // Kiểm tra cạnh hợp lệ
    if (a <= 0 || b <= 0 || c <= 0) {
        return "Cạnh không hợp lệ";
    }

    // Kiểm tra bất đẳng thức tam giác
    if (a + b <= c || a + c <= b || b + c <= a) {
        return "Không tạo thành tam giác";
    }

    // Tam giác đều
    if (a === b && b === c) {
        return "Tam giác đều";
    }

    // Tam giác cân
    if (a === b || a === c || b === c) {
        return "Tam giác cân";
    }

    // Tam giác vuông
    if (
        a * a + b * b === c * c ||
        a * a + c * c === b * b ||
        b * b + c * c === a * a
    ) {
        return "Tam giác vuông";
    }

    // Tam giác thường
    return "Tam giác thường";
}

// Test
console.log(classifyTriangle(3, 4, 5));
console.log(classifyTriangle(2, 2, 2));
console.log(classifyTriangle(1, 2, 10));
console.log(classifyTriangle(5, 5, 7));
console.log(classifyTriangle(5, 3, 4));
console.log(classifyTriangle(3, 4, 6));
