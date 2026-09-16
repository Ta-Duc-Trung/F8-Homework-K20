// Component nhỏ dùng chung cho 2 loại nhãn: "Giảm giá X%" và "Hết hàng"
// Nhận vào text hiển thị + loại (type) để quyết định màu sắc
function Badge({ text, type }) {
  const colorClasses =
    type === 'discount'
      ? 'bg-red-100 text-red-700'
      : 'bg-gray-200 text-gray-600';

  return (
    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${colorClasses}`}>
      {text}
    </span>
  );
}

export default Badge;