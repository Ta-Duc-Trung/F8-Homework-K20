// Quản lý giỏ hàng 
// Để đơn giản, ta chỉ lưu giỏ hàng trong 1 biến (mảng) ở trên RAM.
// -> Nghĩa là nếu bạn tải lại (F5) trình duyệt, giỏ hàng sẽ bị mất.
// Đây là cách làm đơn giản nhất để bạn dễ hiểu luồng hoạt động.

let cartItems = []; // mảng chứa các sản phẩm đã thêm vào giỏ

// Thêm 1 sản phẩm vào giỏ hàng
export function addToCart(product) {
  // Kiểm tra xem sản phẩm này đã có trong giỏ chưa
  const existingItem = cartItems.find((item) => item.id === product.id);

  if (existingItem) {
    // Nếu đã có rồi thì chỉ tăng số lượng lên 1
    existingItem.quantity = existingItem.quantity + 1;
  } else {
    // Nếu chưa có thì thêm sản phẩm mới vào giỏ với số lượng là 1
    cartItems.push({
      id: product.id,
      name: product.name,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity: 1,
    });
  }
}

// Xoá 1 sản phẩm khỏi giỏ hàng theo id
export function removeFromCart(productId) {
  cartItems = cartItems.filter((item) => item.id !== productId);
}

// Lấy toàn bộ danh sách sản phẩm trong giỏ
export function getCartItems() {
  return cartItems;
}

// Đếm tổng số sản phẩm trong giỏ (để hiển thị số lên menu Cart)
export function getCartCount() {
  let total = 0;
  for (const item of cartItems) {
    total = total + item.quantity;
  }
  return total;
}

// Tính tổng tiền của cả giỏ hàng
export function getCartTotal() {
  let total = 0;
  for (const item of cartItems) {
    total = total + item.price * item.quantity;
  }
  return total;
}

// Hàm tiện ích: format số tiền cho dễ đọc, ví dụ 150000 -> "150.000đ"
export function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "đ";
}