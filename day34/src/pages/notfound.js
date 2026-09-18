// Trang 404: hiển thị khi người dùng vào 1 đường dẫn không tồn tại.

export function render() {
  return `
    <div class="text-center py-20">
      <p class="text-6xl font-bold text-orange-600 mb-4">404</p>
      <h1 class="text-xl font-semibold mb-2">Không tìm thấy trang</h1>
      <p class="text-gray-500 mb-6">Đường dẫn bạn vừa truy cập không tồn tại.</p>
      <a href="/" data-link
         class="inline-block bg-orange-600 text-white px-5 py-2.5 rounded hover:bg-orange-700">
        Quay về Trang chủ
      </a>
    </div>
  `;
}