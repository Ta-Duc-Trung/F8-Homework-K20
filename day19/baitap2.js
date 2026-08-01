const customers = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com" },
    { id: 4, name: "Bob Brown", email: "bob@example.com" },
    { id: 5, name: "Charlie Green", email: "charlie@example.com" },
];

const products = [
    { id: 101, name: "Laptop", price: 1200 },
    { id: 102, name: "Phone", price: 800 },
    { id: 103, name: "Tablet", price: 500 },
    { id: 104, name: "Smartwatch", price: 300 },
    { id: 105, name: "Headphones", price: 150 },
];

const orders = [
    {
        id: 1001,
        customerId: 1,
        items: [
            { productId: 101, quantity: 2 },
            { productId: 102, quantity: 1 },
        ],
    },
    {
        id: 1002,
        customerId: 2,
        items: [
            { productId: 102, quantity: 1 },
            { productId: 103, quantity: 3 },
        ],
    },
    {
        id: 1003,
        customerId: 3,
        items: [
            { productId: 104, quantity: 5 },
            { productId: 105, quantity: 2 },
        ],
    },
    {
        id: 1004,
        customerId: 4,
        items: [
            { productId: 101, quantity: 1 },
            { productId: 103, quantity: 2 },
        ],
    },
    {
        id: 1005,
        customerId: 5,
        items: [{ productId: 105, quantity: 10 }],
    },
    {
        id: 1006,
        customerId: 1,
        items: [
            { productId: 101, quantity: 1 },
            { productId: 105, quantity: 3 },
        ],
    },
    {
        id: 1007,
        customerId: 2,
        items: [
            { productId: 104, quantity: 2 },
            { productId: 103, quantity: 1 },
        ],
    },
    {
        id: 1008,
        customerId: 3,
        items: [{ productId: 102, quantity: 2 }],
    },
    {
        id: 1009,
        customerId: 4,
        items: [
            { productId: 101, quantity: 1 },
            { productId: 102, quantity: 1 },
        ],
    },
    {
        id: 1010,
        customerId: 5,
        items: [
            { productId: 103, quantity: 4 },
            { productId: 104, quantity: 3 },
        ],
    },
];

// function getCustomerStatistics(customers, products, orders) {
//     return customers
//         .map((customer) => {
//             const customerOrders = orders.filter(
//                 (order) => order.customerId === customer.id,
//             );

//             const allItems = customerOrders.flatMap((order) => order.items);

//             const groupedProducts = {};

//             for (const item of allItems) {
//                 const product = products.find(
//                     (product) => product.id === item.productId,
//                 );

//                 if (!groupedProducts[item.productId]) {
//                     groupedProducts[item.productId] = {
//                         name: product.name,
//                         quantity: item.quantity,
//                         totalSpent: product.price * item.quantity,
//                     };
//                 } else {
//                     groupedProducts[item.productId].quantity += item.quantity;
//                     groupedProducts[item.productId].totalSpent +=
//                         product.price * item.quantity;
//                 }
//             }

//             const productList = Object.values(groupedProducts);

//             productList.sort((a, b) => b.totalSpent - a.totalSpent);
//             const totalSpent = productList.reduce(
//                 (sum, product) => sum + product.totalSpent,
//                 0,
//             );

//             return {
//                 id: customer.id,
//                 name: customer.name,
//                 totalSpent,
//                 products: productList,
//             };
//         })
//         .sort((a, b) => b.totalSpent - a.totalSpent);
// }

// console.log(getCustomerStatistics(customers, products, orders));

// const a = { value: 1 };
// const b = { value: 1 };
// const c = a;
// console.log(a === b);
// console.log(a === c);

function getCustomerStatistics(customers, products, orders) {
    const result = [];

    for (const customer of customers) {
        const customerOrders = orders.filter(
            (order) => order.customerId === customer.id,
        );

        let totalSpent = 0;

        const productMap = {};

        for (const order of customerOrders) {
            for (const item of order.items) {
                const product = products.find((p) => p.id === item.productId);

                const money = product.price * item.quantity;

                totalSpent += money;

                if (!productMap[product.id]) {
                    productMap[product.id] = {
                        name: product.name,
                        quantity: 0,
                        totalSpent: 0,
                    };
                }

                productMap[product.id].quantity += item.quantity;

                productMap[product.id].totalSpent += money;
            }
        }

        const productList = Object.values(productMap);

        productList.sort((a, b) => b.totalSpent - a.totalSpent);

        result.push({
            id: customer.id,
            name: customer.name,
            totalSpent,
            products: productList,
        });
    }

    result.sort((a, b) => b.totalSpent - a.totalSpent);

    return result;
}

const customers1 = [
    { id: 1, name: "John" },
];

const products1 = [
    { id: 101, name: "Laptop", price: 1200 },
];

const orders1 = [
    {
        id: 1,
        customerId: 1,
        items: [
            { productId: 101, quantity: 2 },
            { productId: 101, quantity: 3 },
        ],
    },
];

console.log("===== Test Case 1 =====");
console.log(getCustomerStatistics(customers1, products1, orders1));
const customers2 = [
    {
        id: 10,
        name: "David",
    },
];

console.log("===== Test Case 2 =====");
console.log(getCustomerStatistics(customers2, [], []));
const customers3 = [
    {
        id: 1,
        name: "John",
    },
];

const products3 = [
    { id: 101, name: "Laptop", price: 1200 },
    { id: 102, name: "Phone", price: 800 },
];

const orders3 = [
    {
        id: 1,
        customerId: 1,
        items: [
            {
                productId: 101,
                quantity: 1,
            },
            {
                productId: 102,
                quantity: 2,
            },
        ],
    },
];

console.log("===== Test Case 3 =====");
console.log(getCustomerStatistics(customers3, products3, orders3));
const customers4 = [
    {
        id: 1,
        name: "John",
    },
];

const products4 = [
    {
        id: 101,
        name: "Laptop",
        price: 1200,
    },
];

const orders4 = [
    {
        id: 1,
        customerId: 1,
        items: [
            {
                productId: 101,
                quantity: 1,
            },
        ],
    },
    {
        id: 2,
        customerId: 1,
        items: [
            {
                productId: 101,
                quantity: 2,
            },
        ],
    },
    {
        id: 3,
        customerId: 1,
        items: [
            {
                productId: 101,
                quantity: 5,
            },
        ],
    },
];

console.log("===== Test Case 4 =====");
console.log(getCustomerStatistics(customers4, products4, orders4));
console.log("===== Test Case 5 =====");

const result = getCustomerStatistics(customers, products, orders);

result.forEach(customer => {
    console.log(customer.name, customer.totalSpent);
});
console.log("===== Test Case 6 =====");

const john = getCustomerStatistics(customers, products, orders)
    .find(customer => customer.id === 1);

john.products.forEach(product => {
    console.log(product.name, product.totalSpent);
});
console.log("===== Test Case 7 =====");

const charlie = getCustomerStatistics(customers, products, orders)
    .find(customer => customer.id === 5);

console.log(charlie);
console.log("===== Test Case 8 =====");

console.log(
    getCustomerStatistics([], [], [])
);