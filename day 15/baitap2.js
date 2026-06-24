function isPrime(num) {
    if (num < 2) {
        return false;
    }

    for (let i = 2; i < num; i++) {
        if (num % i === 0) {
            return false;
        }
    }

    return true;
}

function printTriangle(n) {
    for (let i = 1; i <= n; i++) {
        let line = "";

        for (let j = 1; j <= i; j++) {
            let value = j;
            if (j % 15 === 0) {
                value = "#";
            } else if (isPrime(j)) {
                value = "*";
            }
            line += value + " ";
        }
        console.log(line.trim());
        if (i % 2 === 0) {
            console.log("-".repeat(i));
        }
    }
}

// Test
printTriangle(7);
