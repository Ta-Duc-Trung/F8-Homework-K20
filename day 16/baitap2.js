const text =
    "javascript là ngôn ngữ lập trình phổ biến javascript chạy trên trình duyệt và javascript cũng chạy trên server";
// Tách đoạn văn thành mảng các từ
function getWords(text) {
    return text.split(" ");
}
console.log(getWords(text));

// Đếm số lần xuất hiện của một từ trong đoạn văn (phân biệt chữ hoa/thường).

function countWord(text, word) {
    return getWords(text).filter((item) => item === word).length;
}

console.log(countWord(text, "javascript"));

// Trả về mảng các từ không trùng lặp, sắp xếp theo thứ tự alphabet.

function getUniqueWords(text) {
    const words = getWords(text);
    return words.filter((item, index) => words.indexOf(item) === index).sort();
}

console.log(getUniqueWords(text));

// Trả về mảng n từ xuất hiện nhiều nhất, mỗi phần tử là object { word, count }, sắp xếp theo count giảm dần.
function getTopWord(text, n) {
    const words = getWords(text);
    const counts = {};
    words.forEach((item) => {
        if (counts[item]) {
            counts[item]++;
        } else {
            counts[item] = 1;
        }
    });
    const result = [];
    for (let key in counts) {
        result.push({
            word: key,
            count: counts[key],
        });
    }
    const sortWords = result.sort((a, b) => b.count - a.count).slice(0, n);
    return sortWords;
}
console.log(getTopWord(text, 3));
// Trả về chuỗi gốc nhưng mỗi lần xuất hiện từ word được bọc trong **...**.
function highlight(text, word) {
    const words = getWords(text);
    const highlightedWords = words.map((item) => {
        if (item === word) {
            return `**${item}**`;
        }
        return item;
    });
    return highlightedWords.join(" ");
}
console.log(highlight(text, "javascript"));
