// hàm 1/
function createSlug(text) {
    return text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
}
console.log(createSlug("MacBook Pro 2024"));
console.log(createSlug("Bàn Phím Cơ RGB"));

// hàm 2/
function generateOrderId(productName, quantity) {
    return `ORD-${productName.slice(0, 3).toUpperCase()}-${quantity}-${productName.length}`;
}

console.log(generateOrderId("MacBook Pro", 2));

console.log(generateOrderId("iPhone 15", 5));

console.log(generateOrderId("Bàn phím cơ", 1));
// hàm 3/
function formatPrice(price, currency = "VND") {
    if (currency === "VND") {
        return price.toLocaleString("vi-VN") + "đ";
    }
    if (currency === "USD") {
        return (
            "$" +
            price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })
        );
    }
}
console.log(formatPrice(500000));
// hàm 4
const baseUrl = "https://shop.vn";
const product = { name: "MacBook Pro 2024", id: 101, category: "laptop" };



function buildProductUrl(baseUrl, product) {
    return `${baseUrl}/${product.category}/${createSlug(product.name)}?id=${product.id}`;
}
console.log(buildProductUrl(baseUrl,product));
