// Hàm tiện ích dùng chung - format số thành dạng tiền tệ dễ đọc
// Ví dụ: 1200 -> "$1,200.00"
export function formatPrice(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}