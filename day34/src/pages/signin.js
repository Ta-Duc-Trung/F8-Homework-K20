// Trang Sign In: form đăng nhập đơn giản, chỉ validate cơ bản, không gọi API thật.

export function render() {
  return `
    <h1 class="text-xl font-bold mb-1">Đăng nhập</h1>
    <p class="text-sm text-gray-500 mb-6">Chào mừng bạn quay lại</p>

    <form id="signin-form" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Email</label>
        <input type="email" id="signin-email"
          class="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
        <p id="signin-email-error" class="hidden text-xs text-red-600 mt-1">Email không hợp lệ.</p>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Mật khẩu</label>
        <input type="password" id="signin-password"
          class="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
        <p id="signin-password-error" class="hidden text-xs text-red-600 mt-1">Vui lòng nhập mật khẩu.</p>
      </div>

      <p id="signin-success" class="hidden text-sm text-green-600">Đăng nhập thành công (giả lập)!</p>

      <button type="submit" class="w-full bg-orange-600 text-white py-2.5 rounded hover:bg-orange-700">
        Đăng nhập
      </button>
    </form>

    <p class="text-sm text-gray-500 mt-6 text-center">
      Chưa có tài khoản?
      <a href="/sign-up" data-link class="text-orange-600 hover:underline">Đăng ký</a>
    </p>
  `;
}

export function afterRender() {
  const form = document.getElementById("signin-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("signin-email").value.trim();
    const password = document.getElementById("signin-password").value;

    const isEmailValid = email.includes("@") && email.includes(".");
    const isPasswordValid = password.length > 0;

    document.getElementById("signin-email-error").classList.toggle("hidden", isEmailValid);
    document.getElementById("signin-password-error").classList.toggle("hidden", isPasswordValid);

    const allValid = isEmailValid && isPasswordValid;
    document.getElementById("signin-success").classList.toggle("hidden", !allValid);
  });
}