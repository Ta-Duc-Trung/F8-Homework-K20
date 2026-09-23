
export function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "đ";
}

export default function ProductPrice({ value, className }) {
  return <span className={className}>{formatPrice(value)}</span>;
}