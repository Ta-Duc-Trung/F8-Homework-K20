// Trang Sign Up: form đăng ký đơn giản, chỉ validate cơ bản, không gọi API thật.

export function render() {
  return `
    <h1 class="text-xl font-bold mb-1">Đăng ký</h1>
    <p class="text-sm text-gray-500 mb-6">Tạo tài khoản mới</p>

    <form id="signup-form" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Họ và tên</label>
        <input type="text" id="signup-name"
          class="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
        <p id="signup-name-error" class="hidden text-xs text-red-600 mt-1">Vui lòng nhập họ tên.</p>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Email</label>
        <input type="email" id="signup-email"
          class="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
        <p id="signup-email-error" class="hidden text-xs text-red-600 mt-1">Email không hợp lệ.</p>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Mật khẩu</label>
        <input type="password" id="signup-password"
          class="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
        <p id="signup-password-error" class="hidden text-xs text-red-600 mt-1">Mật khẩu cần ít nhất 6 ký tự.</p>
      </div>

      <p id="signup-success" class="hidden text-sm text-green-600">Đăng ký thành công (giả lập)!</p>

      <button type="submit" class="w-full bg-orange-600 text-white py-2.5 rounded hover:bg-orange-700">
        Đăng ký
      </button>
    </form>

    <p class="text-sm text-gray-500 mt-6 text-center">
      Đã có tài khoản?
      <a href="/sign-in" data-link class="text-orange-600 hover:underline">Đăng nhập</a>
    </p>
  `;
}

export function afterRender() {
  const form = document.getElementById("signup-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // ngăn trình duyệt tự reload trang khi submit form

    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;

    // Kiểm tra hợp lệ đơn giản cho từng ô
    const isNameValid = name.length > 0;
    const isEmailValid = email.includes("@") && email.includes(".");
    const isPasswordValid = password.length >= 6;

    // Hiện/ẩn thông báo lỗi tương ứng
    document.getElementById("signup-name-error").classList.toggle("hidden", isNameValid);
    document.getElementById("signup-email-error").classList.toggle("hidden", isEmailValid);
    document.getElementById("signup-password-error").classList.toggle("hidden", isPasswordValid);

    // Nếu tất cả đều hợp lệ, hiện thông báo thành công
    const allValid = isNameValid && isEmailValid && isPasswordValid;
    document.getElementById("signup-success").classList.toggle("hidden", !allValid);
  });
}