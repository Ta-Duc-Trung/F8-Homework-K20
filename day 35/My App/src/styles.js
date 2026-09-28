// =====================================================================
// Các chuỗi class Tailwind dùng lại nhiều lần (nút bấm, card, modal...).
// Gom vào 1 chỗ để không phải chép đi chép lại một chuỗi dài,
// muốn đổi giao diện nút thì chỉ sửa ở đây.
//
// Mẹo đọc class Tailwind:
//   px-4 = padding trái/phải   py-2 = padding trên/dưới
//   rounded-lg = bo góc        border = viền   text-sm = chữ nhỏ
//   bg-white = nền trắng       hover:... = khi rê chuột
//   enabled:hover:... = chỉ đổi màu khi nút KHÔNG bị disabled
//   disabled:... = kiểu khi nút bị disabled
// =====================================================================

const btnBase =
  'rounded-lg border px-3.5 py-2 text-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-40';

// Nút thường (nền trắng)
export const btn = `${btnBase} border-gray-300 bg-white enabled:hover:bg-gray-100`;

// Nút chính (nền tím)
export const btnPrimary = `${btnBase} border-indigo-600 bg-indigo-600 text-white enabled:hover:bg-indigo-700`;

// Nút nguy hiểm (chữ đỏ, dùng cho Xóa / Đặt lại)
export const btnDanger = `${btnBase} border-red-300 bg-white text-red-600 enabled:hover:bg-red-50`;

// Khung trắng bo góc có đổ bóng nhẹ
export const card = 'rounded-xl bg-white p-5 shadow-sm';

// Lớp nền mờ phủ toàn màn hình khi mở modal
export const overlay = 'fixed inset-0 z-10 flex items-center justify-center bg-black/45 p-4';

// Hộp modal
export const modalBox = 'max-h-[90vh] w-full overflow-y-auto rounded-xl bg-white p-5';