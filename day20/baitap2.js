
// Bước 1: Object cấu hình

const config = {
  serviceFee: 120000,
  currency: "VND",
  version: 1,
};

Object.freeze(config);
// Bước 2: Class
let idCounter = 1;

class MyClass {
  constructor(name) {
    this.name = name;
    this.items = [];
    this._discountPercent = 0;

    Object.defineProperty(this, "id", {
      value: `ID-${idCounter++}`,
      writable: false,
      enumerable: false,
      configurable: false,
    });
  }

  addItem(name, price, quantity) {
    this.items.push({
      name,
      price,
      quantity,
    });
  }

  get total() {
    let sum = 0;

    for (const item of this.items) {
      sum += item.price * item.quantity;
    }

    sum += config.serviceFee;

    sum -= sum * this._discountPercent / 100;

    return sum;
  }

  set discountPercent(value) {
    if (value < 0 || value > 100) {
      throw new Error("Discount phải từ 0 đến 100");
    }

    this._discountPercent = value;
  }
}

// Bước 3: Hàm ngoài class

function logSummary() {
  console.log(`${this.name}: ${this.total}`);
}

// Bước 4: Tạo instance
const instance = new MyClass("Danh sách của An");
instance.addItem("Bàn phím", 500000, 2);
instance.addItem("Chuột", 200000, 1);
config.serviceFee = 0;
console.log(config.serviceFee);
console.log(Object.isFrozen(config));
console.log(instance.total);
instance.discountPercent = 10;
console.log(instance.total);
try {
  instance.discountPercent = 150;
} catch (e) {
  console.log(e.message);
}
setTimeout(logSummary.bind(instance), 100);
console.log(Object.keys(instance));
instance.id = "hack123";
console.log(instance.id);
console.log(delete instance.id);
// Bước 5 :
const objA = {
  a: 1,
  b: 2,
  c: 3,
};

const objB = {
  b: 20,
  d: 40,
};
const merged = Object.assign({}, objA, objB);

console.log(merged);
console.log(objA);
console.log(objB);


