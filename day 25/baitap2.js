const form = document.querySelector("#register-form");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");
const usernameError = document.querySelector("#username-error");
const emailError = document.querySelector("#email-error");
const passwordError = document.querySelector("#password-error");
const confirmPasswordError = document.querySelector("#confirm-password-error");
const submitBtn = document.querySelector("#submit-btn");

let usernameTouched = false;
let emailTouched = false;
let passwordTouched = false;
let confirmPasswordTouched = false;
// Kiểm tra Username
function validateUsername() {
    const username = usernameInput.value;
    // ít nhất 4 ký tự
    if (username.length < 4) {
        if (usernameTouched) {
            usernameError.textContent = "Tên đăng nhập phải có ít nhất 4 ký tự";
            return false;
        }
    }
    if (username.includes(" ")) {
        usernameError.textContent = "Tên đăng nhập không được có khoảng trắng";

        return false;
    }
    // hợp lệ
    usernameError.textContent = "";
    return true;
}
// Kiểm tra Email
function validateEmail() {
    const email = emailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        if (emailTouched) {
            emailError.textContent = "Email không đúng định dạng";
        }
        return false;
    }
    emailError.textContent = "";
    return true;
}
// Kiểm tra Password
function validatePassword() {
    const password = passwordInput.value;
    // ít nhất 8 ký tự
    if (password.length < 8) {
        if (passwordTouched) {
            passwordError.textContent = "Mật khẩu phải có ít nhất 8 ký tự";
        }
        return false;
    }
    // phải có ít nhất 1 số
    const hasNumber = /[0-9]/.test(password);
    if (!hasNumber) {
        if (passwordTouched) {
            passwordError.textContent = "Mật khẩu phải có ít nhất 1 chữ số";
        }
        return false;
    }
    passwordError.textContent = "";
    return true;
}
// Kiểm tra Confirm Password
function validateConfirmPassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    if (confirmPassword !== password) {
        if (confirmPasswordTouched) {
            confirmPasswordError.textContent = "Mật khẩu nhập lại không khớp";
        }
        return false;
    }
    // tránh pass trống
    if (confirmPassword === "") {
        if (confirmPasswordTouched) {
            confirmPasswordError.textContent = "Vui lòng nhập lại mật khẩu";
        }
        return false;
    }
    confirmPasswordError.textContent = "";
    return true;
}
// Kiểm tra form
function checkForm() {
    const usernameValid = validateUsername();
    const emailValid = validateEmail();
    const passwordValid = validatePassword();
    const confirmPasswordValid = validateConfirmPassword();
    if (usernameValid && emailValid && passwordValid && confirmPasswordValid) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}
// Sự kiện khi gõ Username
usernameInput.addEventListener("input", function () {
    usernameTouched = true;
    validateUsername();
    checkForm();
});
// Sự kiện khi gõ Email
emailInput.addEventListener("input", function () {
    emailTouched = true;
    validateEmail();
    checkForm();
});
// Sự kiện khi gõ Password
passwordInput.addEventListener("input", function () {
    passwordTouched = true;
    validatePassword();
    if (confirmPasswordTouched) {
        validateConfirmPassword();
    }
    checkForm();
});
// Sự kiện khi gõ Confirm Password
confirmPasswordInput.addEventListener("input", function () {
    confirmPasswordTouched = true;
    validateConfirmPassword();
    checkForm();
});
// Submit form
form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (
        validateUsername() &&
        validateEmail() &&
        validatePassword() &&
        validateConfirmPassword()
    ) {
        const message = document.createElement("p");
        message.textContent = "Đăng ký thành công!";
        form.appendChild(message);
    }
});
