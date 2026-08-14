const products = [
    {
        id: 1,
        name: "Tai nghe Bluetooth",
        category: "do-dien-tu",
        price: 350000,
        inStock: true,
    },
    {
        id: 2,
        name: "Áo thun cotton",
        category: "quan-ao",
        price: 150000,
        inStock: true,
    },
    {
        id: 3,
        name: "Sách Lập trình JS căn bản",
        category: "sach",
        price: 120000,
        inStock: false,
    },
    {
        id: 4,
        name: "Bàn phím cơ",
        category: "do-dien-tu",
        price: 890000,
        inStock: true,
    },
    {
        id: 5,
        name: "Quần jean nam",
        category: "quan-ao",
        price: 420000,
        inStock: false,
    },
    {
        id: 6,
        name: "Sách Tư duy nhanh và chậm",
        category: "sach",
        price: 95000,
        inStock: true,
    },
];

// Lấy các phần tử HTML
const searchBox = document.querySelector("#search-box");
const categoryFilter = document.querySelector("#category-filter");
const sortPriceBtn = document.querySelector("#sort-price-btn");
const productList = document.querySelector("#product-list");
const resultCount = document.querySelector("#result-count");
let sortDirection = null;
// Chuyển category thành tên tiếng Việt
function getCategoryName(category) {
    if (category === "do-dien-tu") {
        return "Đồ điện tử";
    }
    if (category === "quan-ao") {
        return "Quần áo";
    }
    if (category === "sach") {
        return "Sách";
    }
}
// Định dạng giá
function formatPrice(price) {
    return price.toLocaleString("vi-VN") + "đ";
}
// Render sản phẩm
function renderProducts(productArray) {
    // Xóa nội dung cũ
    productList.innerHTML = "";
    // Không có sản phẩm
    if (productArray.length === 0) {
        const message = document.createElement("p");
        message.textContent = "Không tìm thấy sản phẩm nào phù hợp.";
        productList.appendChild(message);
        resultCount.textContent = "Tìm thấy 0 sản phẩm";
        return;
    }
    // Render từng sản phẩm
    productArray.forEach(function (product) {
        const productItem = document.createElement("div");
        productItem.classList.add("product-item");
        // Nếu hết hàng
        if (!product.inStock) {
            productItem.classList.add("out-of-stock");
        }
        const name = document.createElement("h3");
        name.textContent = product.name;

        const category = document.createElement("p");
        category.textContent = "Danh mục: " + getCategoryName(product.category);

        const price = document.createElement("p");
        price.textContent = "Giá: " + formatPrice(product.price);

        const stock = document.createElement("p");

        if (product.inStock) {
            stock.textContent = "Tình trạng: Còn hàng";
        } else {
            stock.textContent = "Tình trạng: Hết hàng";
        }
        productItem.appendChild(name);
        productItem.appendChild(category);
        productItem.appendChild(price);
        productItem.appendChild(stock);

        productList.appendChild(productItem);
    });
    // Cập nhật số lượng
    resultCount.textContent = `Tìm thấy ${productArray.length} sản phẩm`;
}
// Hàm xử lý tìm kiếm + lọc + sắp xếp
function updateProducts() {
    const searchText = searchBox.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;
    // Luôn bắt đầu lại từ products gốc
    let result = [...products];
    // 1. Tìm kiếm
    result = result.filter(function (product) {
        return product.name.toLowerCase().includes(searchText);
    });
    // 2. Lọc category
    if (selectedCategory !== "all") {
        result = result.filter(function (product) {
            return product.category === selectedCategory;
        });
    }
    // 3. Sắp xếp
    if (sortDirection === "asc") {
        result.sort(function (a, b) {
            return a.price - b.price;
        });
    }
    if (sortDirection === "desc") {
        result.sort(function (a, b) {
            return b.price - a.price;
        });
    }

    // 4. Render lại
    renderProducts(result);
}
// Khi gõ tìm kiếm
searchBox.addEventListener("input", function () {
    updateProducts();
});
// Khi đổi danh mục
categoryFilter.addEventListener("change", function () {
    updateProducts();
});
// Khi bấm sort
sortPriceBtn.addEventListener("click", function () {
    if (sortDirection === null || sortDirection === "desc") {
        sortDirection = "asc";
        sortPriceBtn.textContent = "Giá: Thấp → Cao";
    } else {
        sortDirection = "desc";
        sortPriceBtn.textContent = "Giá: Cao → Thấp";
    }
    updateProducts();
});
// Render lần đầu
updateProducts();
