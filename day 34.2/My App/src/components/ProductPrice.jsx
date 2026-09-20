// Hàm tiện ích: format số tiền cho dễ đọc, ví dụ 150000 -> "150.000đ"
// Tách riêng hàm này ra để dùng lại được ở nhiều nơi (ProductCard, ProductDetail, Cart...).
export function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "đ";
}

// Component nhỏ, chỉ có 1 nhiệm vụ: nhận vào 1 số tiền, hiển thị ra đã format đẹp.
// Nhờ vậy, không nơi nào trong app phải tự gọi toLocaleString() lặp đi lặp lại.
export default function ProductPrice({ value, className }) {
  return <span className={className}>{formatPrice(value)}</span>;
}