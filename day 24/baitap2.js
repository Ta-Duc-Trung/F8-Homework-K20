class BankAccount {
#balance;
    static totalMoney = 0;
    constructor(ownerName, balance) {
        if (typeof balance !== "number") {
            throw new TypeError("Số dư phải là number");
        }
        if (balance < 0) {
            throw new RangeError("Số dư ban đầu không được âm");
        }
        this.ownerName = ownerName;
        this.#balance = balance;
        BankAccount.totalMoney += balance;
    }

    // Getter để bên ngoài xem số dư
    get balance() {
        return this.#balance;
    }
    deposit(amount) {
        if (typeof amount !== "number") {
            throw new TypeError("Số tiền nạp phải là number");
        }
        if (amount <= 0) {
            throw new RangeError("Số tiền nạp phải lớn hơn 0");
        }

        this.#balance += amount;
        return this.#balance;
    }
    withdraw(amount) {
        if (typeof amount !== "number") {
            throw new TypeError("Số tiền rút phải là number");
        }
        if (amount <= 0) {
            throw new RangeError("Số tiền rút phải lớn hơn 0");
        }
        if (amount > this.#balance) {
            throw new RangeError("Số dư không đủ");
        }
        this.#balance -= amount;
        return this.#balance;
    }
    toString() {
        return `Chủ tài khoản: ${this.ownerName} Số dư: ${this.#balance}`;
    }
}
// SAVINGS ACCOUNT
class SavingsAccount extends BankAccount {
    constructor(ownerName, balance, interestRate) {
        super(ownerName, balance);
        if (typeof interestRate !== "number") {
            throw new TypeError("Lãi suất phải là number");
        }
        if (interestRate < 0) {
            throw new RangeError("Lãi suất không được âm");
        }
        this.interestRate = interestRate;
    }
    addInterest() {
        const interest = this.balance * this.interestRate;
        this.deposit(interest);
        return this.balance;
    }

    withdraw(amount) {
        const maxWithdraw = this.balance * 0.5;
        if (amount > maxWithdraw) {
            throw new RangeError(
                "Tài khoản tiết kiệm không được rút quá 50% số dư"
            );
        }

        return super.withdraw(amount);
    }
}
// TEST 1
// balance âm
try {
    const account1 = new BankAccount("An", -100);
} catch (error) {
    console.log("Test 1:", error.message);
}

// TEST 2
// deposit sai kiểu
const account2 = new BankAccount("An", 500000);
try {
    account2.deposit("100");
} catch (error) {
    console.log("Test 2:", error.message);
}
console.log(account2.balance);
// TEST 3
// rút nhiều hơn số dư
const account3 = new BankAccount("An", 500000);
try {
    account3.withdraw(700000);
} catch (error) {
    console.log("Test 3:", error.message);
}
console.log(account3.balance);

// TEST 4
// cộng lãi
const account4 = new SavingsAccount(
    "Bình",
    1000000,
    0.05
);
account4.addInterest();
console.log(account4.balance);
// TEST 5
// rút quá 50%
const account5 = new SavingsAccount(
    "Bình",
    1000000,
    0.05
);
try {
    account5.withdraw(600000);
} catch (error) {
    console.log("Test 5:", error.message);
}

console.log(account5.balance);
// TEST 6
const account6 = new SavingsAccount(
    "Bình",
    1000000,
    0.05
);
account6.withdraw(400000);
console.log(account6.balance);
// TEST toString()
console.log(account6.toString());
console.log(BankAccount.totalMoney);