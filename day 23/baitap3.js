function createOrderSystem() {
    let cart = [];
    function addToCart(name, price, qty) {
        const product = {
            name: name,
            price: price,
            qty: qty,
        };
        cart.push(product);
        return cart.length;
    }
    function getCartSize() {
        return cart.length;
    }
    function checkout(distance) {
        let subtotal = 0;
        // Tính tổng tiền hàng
        for (const product of cart) {
            subtotal += product.price * product.qty;
        }
        // Tính phí ship
        let shippingFee = 0;
        if (distance <= 5) {
            const fee = 15000;
            shippingFee = fee;
        } else if (distance <= 20) {
            const fee = 30000;
            shippingFee = fee;
        } else {
            const fee = 50000;
            shippingFee = fee;
        }
        // Miễn phí ship
        if (subtotal >= 500000) {
            shippingFee = 0;
        }
        // Tính tổng tiền cuối cùng
        const finalTotal = subtotal + shippingFee;
        const result = {
            subtotal: subtotal,
            shippingFee: shippingFee,
            finalTotal: finalTotal,
        };
        // Reset giỏ hàng sau khi thanh toán
        cart = [];
        return result;
    }

    return {
        addToCart: addToCart,
        checkout: checkout,
        getCartSize: getCartSize,
    };
}
const store = createOrderSystem();
console.log(store.addToCart("Mũ lưỡi trai", 120000, 1));
console.log(store.getCartSize());
console.log(store.checkout(15));
console.log(store.getCartSize());

const store2 = createOrderSystem();
console.log(store2.addToCart("Tất", 30000, 2));
console.log(store2.checkout(3));

const store3 = createOrderSystem();
console.log(store3.addToCart("Áo khoác", 600000, 1));
console.log(store3.checkout(30));

console.log(store.getCartSize()); // 0
console.log(store2.getCartSize()); // 0
console.log(store3.getCartSize()); // 0
