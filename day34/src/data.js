// Dữ liệu sản phẩm 

export const products = [
  {
    id: 1,
    name: "Áo thun trắng basic",
    price: 150000,
    thumbnail: "https://picsum.photos/seed/product1/400/400",
    description: "Áo thun cotton 100%, form rộng, mặc thoải mái, dễ phối đồ.",
  },
  {
    id: 2,
    name: "Quần jean xanh",
    price: 350000,
    thumbnail: "https://picsum.photos/seed/product2/400/400",
    description: "Quần jean chất vải dày dặn, form slimfit, bền màu sau nhiều lần giặt.",
  },
  {
    id: 3,
    name: "Giày sneaker trắng",
    price: 550000,
    thumbnail: "https://picsum.photos/seed/product3/400/400",
    description: "Giày sneaker đế êm, phù hợp đi học đi làm, dễ phối với nhiều outfit.",
  },
  {
    id: 4,
    name: "Mũ lưỡi trai đen",
    price: 90000,
    thumbnail: "https://picsum.photos/seed/product4/400/400",
    description: "Mũ lưỡi trai vải kaki, có khóa chỉnh size phía sau, form unisex.",
  },
  {
    id: 5,
    name: "Túi đeo chéo mini",
    price: 220000,
    thumbnail: "https://picsum.photos/seed/product5/400/400",
    description: "Túi đeo chéo nhỏ gọn, nhiều ngăn tiện lợi, phù hợp đi chơi hằng ngày.",
  },
  {
    id: 6,
    name: "Đồng hồ dây da",
    price: 480000,
    thumbnail: "https://picsum.photos/seed/product6/400/400",
    description: "Đồng hồ mặt tròn, dây da thật, thiết kế cổ điển dễ phối trang phục.",
  },
];

export function findProductById(id) {
    return products.find((product) => String(product.id) === String(id));
}