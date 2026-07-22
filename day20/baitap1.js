// Bước 1: Object gốc

const baseProto = {
    introduce() {
        return `Tôi là ${this.name}, ${this.age} tuổi`;
    },
};

// Bước 2: Object cấp 2

const levelTwoProto = Object.create(baseProto);

levelTwoProto.getInfo = function () {
    return `${this.name} làm ở phòng ${this.department}, lương ${this.salary}`;
};

// Bước 3: Tạo 5 object

const item1 = Object.create(levelTwoProto);
item1.name = "Nguyễn Văn A";
item1.age = 28;
item1.department = "IT";
item1.salary = 15000000;

const item2 = Object.create(levelTwoProto);
item2.name = "Trần Thị B";
item2.age = 30;
item2.department = "HR";
item2.salary = 18000000;

const item3 = Object.create(levelTwoProto);
item3.name = "Lê Văn C";
item3.age = 25;
item3.department = "IT";
item3.salary = 12000000;

const item4 = Object.create(levelTwoProto);
item4.name = "Phạm Thị D";
item4.age = 32;
item4.department = "Finance";
item4.salary = 22000000;

const item5 = Object.create(levelTwoProto);
item5.name = "Hoàng Văn E";
item5.age = 27;
item5.department = "HR";
item5.salary = 16000000;

const items = [item1, item2, item3, item4, item5];

// ====================
// Bước 4: Kiểm tra thuộc tính riêng
// ====================

function checkOwnProperty(obj, key) {
    return Object.hasOwn(obj, key);
}

console.log(item1.introduce());

console.log(item1.getInfo());

console.log(checkOwnProperty(item1, "name"));

console.log(checkOwnProperty(item1, "introduce"));

// Bước 5: Kiểm tra prototype chain

console.log(Object.getPrototypeOf(item1) === levelTwoProto);

console.log(Object.getPrototypeOf(levelTwoProto) === baseProto);

const newProto = {
    getInfo() {
        return `Nhân viên ${this.name} đang làm việc tại ${this.department} với mức lương ${this.salary}`;
    },
};

Object.setPrototypeOf(item4, newProto);

console.log(item4.getInfo());

// Bước 6: Thuộc tính riêng

console.log(Object.getOwnPropertyNames(item1));

// Bước 7: Descriptor

console.log(Object.getOwnPropertyDescriptor(item1, "salary"));

// Bước 8: Object.seal()

Object.seal(item2);

item2.bonus = 1000000;

console.log(item2.bonus);

item2.salary = 20000000;

console.log(item2.salary);

console.log(Object.isSealed(item2));

// Bước 9: Object.groupBy()

const grouped = Object.groupBy(items, (item) => item.department);

console.log(grouped);

// Bước 10: Object.fromEntries()

const lookup = Object.fromEntries([
    ["A001", "Nguyễn Văn A"],
    ["A002", "Trần Thị B"],
]);

console.log(lookup);

console.log(lookup["A002"]);


