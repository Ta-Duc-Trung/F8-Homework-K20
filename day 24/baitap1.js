// Lỗi sai kiểu dữ liệu
class InvalidTypeError extends Error {
    constructor(message, field) {
        super(message);
        this.name = "InvalidTypeError";
        this.field = field;
    }
}

// Lỗi giá trị vượt phạm vi
class RangeValidationError extends Error {
    constructor(message, field, value) {
        super(message);
        this.name = "RangeValidationError";
        this.field = field;
        this.value = value;
    }
}
// Lỗi email không hợp lệ
class InvalidEmailError extends Error {
    constructor(message, field) {
        super(message);
        this.name = "InvalidEmailError";
        this.field = field;
    }
}
// Lỗi mật khẩu yếu
class WeakPasswordError extends Error {
    constructor(message, field) {
        super(message);
        this.name = "WeakPasswordError";
        this.field = field;
    }
}

function registerUser(user) {
    try {
// TH1: user không phải là object
        if (typeof user !== "object" || user === null) {
            throw new InvalidTypeError(
                "Không phải là object",
                "user",
            );
        }
// TH2: username không phải kiểu string
        if (typeof user.username !== "string") {
            throw new InvalidTypeError("Không phải là chuỗi", "username");
        }
// Age phải là số
        if (typeof user.age !== "number") {
            throw new InvalidTypeError("Age phải là số", "age");
        }
// TH3: Age nằm trong phạm vi từ 13 đến 120
        if (user.age < 13 || user.age > 120) {
            throw new RangeValidationError(
                "Tuổi phải nằm trong khoảng từ 13 đến 120",
                "age",
                user.age,
            );
        }
// TH4:email không chứa kí tự @
        if (typeof user.email !== "string" || !user.email.includes("@")) {
            throw new InvalidEmailError("Email không hợp lệ", "email");
        }
// TH5: password phải có ít nhất 8 ký tự
        if (typeof user.password !== "string" || user.password.length < 8) {
            throw new WeakPasswordError(
                "Mật khẩu phải có ít nhất 8 ký tự",
                "password",
            );
        }
// Hợp lệ hết
        const result = {
            success: true,
            message: "Đăng ký thành công",
        };

        console.log(result);

        return result;
    } catch (error) {
        if (error instanceof InvalidTypeError) {
            console.log("Lỗi sai kiểu dữ liệu");
            console.log(error.message);
            console.log("Field:", error.field);
        } else if (error instanceof RangeValidationError) {
            console.log("Lỗi vượt phạm vi");
            console.log(error.message);
            console.log("Field:", error.field);
            console.log("Value:", error.value);
        } else if (error instanceof InvalidEmailError) {
            console.log("Lỗi email không hợp lệ");
            console.log(error.message);
            console.log("Field:", error.field);
        } else if (error instanceof WeakPasswordError) {
            console.log("Lỗi mật khẩu quá ngắn");
            console.log(error.message);
            console.log("Field:", error.field);
        } else {
            console.log("Lỗi không xác định");
            console.log(error.message);
        }
    } finally {
        console.log("Quá trình xử lý đăng ký đã kết thúc.");
    }
}


console.log("TEST 1");
registerUser();
console.log("TEST 2");
registerUser({
    username: 123,
    age: 20,
    email: "a@b.com",
    password: "12345678",
});
console.log("TEST 3");
registerUser({
    username: "an",
    age: 8,
    email: "a@b.com",
    password: "12345678",
});
console.log("TEST 4");
registerUser({
    username: "an",
    age: 20,
    email: "abgmail.com",
    password: "12345678",
});
console.log("TEST 5");
registerUser({
    username: "an",
    age: 20,
    email: "a@b.com",
    password: "123",
});
console.log("TEST 6");
registerUser({
    username: "an",
    age: 20,
    email: "a@b.com",
    password: "12345678",
});
