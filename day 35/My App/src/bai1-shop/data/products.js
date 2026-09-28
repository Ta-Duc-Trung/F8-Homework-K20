// Dữ liệu sản phẩm mẫu (9 sản phẩm).
// Thay vì ảnh thật, mỗi sản phẩm có một "thumbnail" là MÀU + EMOJI
// để hiển thị placeholder — không cần tải ảnh từ internet.

export const CATEGORIES = ['Tất cả', 'Điện thoại', 'Laptop', 'Phụ kiện'];
export const PRODUCTS = [
  {
    id: 1,
    name: 'iPhone 15',
    price: 20990000,
    category: 'Điện thoại',
    thumbnail: { color: '#fde2e4', emoji: '📱' },
    description: 'Màn hình 6.1 inch, chip A16, camera 48MP.',
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24',
    price: 18490000,
    category: 'Điện thoại',
    thumbnail: { color: '#e2ece9', emoji: '📱' },
    description: 'Màn hình Dynamic AMOLED, tích hợp Galaxy AI.',
  },
  {
    id: 3,
    name: 'Xiaomi Redmi Note 13',
    price: 4890000,
    category: 'Điện thoại',
    thumbnail: { color: '#fff1e6', emoji: '📱' },
    description: 'Giá rẻ, pin 5000mAh, sạc nhanh 33W.',
  },
  {
    id: 4,
    name: 'MacBook Air M2',
    price: 24990000,
    category: 'Laptop',
    thumbnail: { color: '#dfe7fd', emoji: '💻' },
    description: 'Mỏng nhẹ, pin 18 tiếng, không quạt tản nhiệt.',
  },
  {
    id: 5,
    name: 'Dell XPS 13',
    price: 29990000,
    category: 'Laptop',
    thumbnail: { color: '#cddafd', emoji: '💻' },
    description: 'Màn hình viền mỏng, vỏ nhôm cao cấp.',
  },
  {
    id: 6,
    name: 'Asus Vivobook 15',
    price: 12490000,
    category: 'Laptop',
    thumbnail: { color: '#e9edc9', emoji: '💻' },
    description: 'Laptop học tập, văn phòng giá tốt.',
  },
  {
    id: 7,
    name: 'Tai nghe AirPods Pro',
    price: 5990000,
    category: 'Phụ kiện',
    thumbnail: { color: '#f0efeb', emoji: '🎧' },
    description: 'Chống ồn chủ động, hộp sạc MagSafe.',
  },
  {
    id: 8,
    name: 'Chuột Logitech MX Master 3S',
    price: 2390000,
    category: 'Phụ kiện',
    thumbnail: { color: '#e8e8e4', emoji: '🖱️' },
    description: 'Chuột không dây, cuộn siêu nhanh, bấm êm.',
  },
  {
    id: 9,
    name: 'Sạc dự phòng Anker 10000mAh',
    price: 690000,
    category: 'Phụ kiện',
    thumbnail: { color: '#fae1dd', emoji: '🔋' },
    description: 'Nhỏ gọn, sạc nhanh 20W.',
  },
];

// Hàm định dạng tiền Việt: 20990000 -> "20.990.000 ₫"
export function formatPrice(number) {
  return number.toLocaleString('vi-VN') + ' ₫';
}