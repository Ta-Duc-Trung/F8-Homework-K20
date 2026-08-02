const members = [
    { id: 1, name: "Minh Tran", email: "minh@example.com" },
    { id: 2, name: "Lan Pham", email: "lan@example.com" },
    { id: 3, name: "Huy Nguyen", email: "huy@example.com" },
    { id: 4, name: "Trang Le", email: "trang@example.com" },
    { id: 5, name: "Duc Vo", email: "duc@example.com" },
];

const books = [
    { id: 201, title: "Clean Code", finePerDay: 5000 },
    { id: 202, title: "Atomic Habits", finePerDay: 3000 },
    { id: 203, title: "Sapiens", finePerDay: 4000 },
    { id: 204, title: "Deep Work", finePerDay: 2000 },
    { id: 205, title: "The Pragmatic Programmer", finePerDay: 6000 },
];

const borrowRecords = [
    {
        id: 3001,
        memberId: 1,
        lines: [
            { bookId: 201, lateDays: 2 },
            { bookId: 202, lateDays: 0 },
        ],
    },
    {
        id: 3002,
        memberId: 2,
        lines: [
            { bookId: 202, lateDays: 1 },
            { bookId: 203, lateDays: 3 },
        ],
    },
    {
        id: 3003,
        memberId: 3,
        lines: [
            { bookId: 204, lateDays: 5 },
            { bookId: 205, lateDays: 2 },
        ],
    },
    {
        id: 3004,
        memberId: 4,
        lines: [
            { bookId: 201, lateDays: 1 },
            { bookId: 203, lateDays: 2 },
        ],
    },
    {
        id: 3005,
        memberId: 5,
        lines: [{ bookId: 205, lateDays: 10 }],
    },
    {
        id: 3006,
        memberId: 1,
        lines: [
            { bookId: 201, lateDays: 1 },
            { bookId: 205, lateDays: 3 },
        ],
    },
    {
        id: 3007,
        memberId: 2,
        lines: [
            { bookId: 204, lateDays: 2 },
            { bookId: 203, lateDays: 1 },
        ],
    },
    {
        id: 3008,
        memberId: 3,
        lines: [{ bookId: 202, lateDays: 2 }],
    },
    {
        id: 3009,
        memberId: 4,
        lines: [
            { bookId: 201, lateDays: 1 },
            { bookId: 202, lateDays: 1 },
        ],
    },
    {
        id: 3010,
        memberId: 5,
        lines: [
            { bookId: 203, lateDays: 4 },
            { bookId: 204, lateDays: 3 },
        ],
    },
];

function getMemberFineStatistics(members, books, borrowRecords) {
    const result = members
        .map((member) => {
            // Lấy các borrowRecord của member
            const memberRecords = borrowRecords.filter((record) => {
                return (
                    record.memberId === member.id &&
                    Object.hasOwn(record, "lines") // Chỉ xử lý nếu lines là thuộc tính riêng
                );
            });

            // Gom tất cả lines
            const allLines = memberRecords.flatMap((record) => record.lines);

            // Gom các sách trùng nhau
            const groupedBooks = {};

            for (const line of allLines) {
                const book = books.find((b) => b.id === line.bookId);

                if (!book) continue;

                if (!groupedBooks[line.bookId]) {
                    groupedBooks[line.bookId] = {
                        title: book.title,
                        lateDays: line.lateDays,
                        fine: line.lateDays * book.finePerDay,
                    };
                } else {
                    groupedBooks[line.bookId].lateDays += line.lateDays;
                    groupedBooks[line.bookId].fine +=
                        line.lateDays * book.finePerDay;
                }
            }

            const bookList = Object.values(groupedBooks);

            // Sắp xếp sách
            bookList.sort((a, b) => b.fine - a.fine);

            // Tổng tiền phạt
            const totalFine = bookList.reduce(
                (sum, book) => sum + book.fine,
                0,
            );

            return {
                id: member.id,
                name: member.name,
                totalFine,
                books: bookList,
            };
        })
        .sort((a, b) => b.totalFine - a.totalFine);
    for (const member of result) {
        Object.freeze(member);
    }
    Object.freeze(result);

    return result;
}

//  test case 1
const testMembers = [
    {
        id: 1,
        name: "Minh",
    },
];
const testBooks = [
    {
        id: 201,
        title: "Clean Code",
        finePerDay: 5000,
    },
];
const testBorrowRecords = [
    {
        id: 1,
        memberId: 1,
        lines: [
            {
                bookId: 201,
                lateDays: 2,
            },
        ],
    },
    {
        id: 2,
        memberId: 1,
        lines: [
            {
                bookId: 201,
                lateDays: 1,
            },
        ],
    },
];
const result = getMemberFineStatistics(
    testMembers,
    testBooks,
    testBorrowRecords,
);

console.log(result[0].books);
// test case 2

const membersTest2 = [
    {
        id: 10,
        name: "Khanh",
    },
];

const booksTest2 = [];

const borrowRecordsTest2 = [];
const resultTest2 = getMemberFineStatistics(
    membersTest2,
    booksTest2,
    borrowRecordsTest2,
);

console.log(resultTest2);

// test case 3
console.log("test case 3");
let members3 = [{ id: 1, name: "Minh Tran" }];
let records3 = [
    {
        id: 1,
        memberId: 1,
        lines: [
            { bookId: 201, lateDays: 1 },
            { bookId: 202, lateDays: 2 },
        ],
    },
];
let result3 = getMemberFineStatistics(members3, books, records3);
console.log(result3[0].books);
console.log("Member Total:", result3[0].totalFine);

// test case 4
console.log("test case 4");
let books4 = [{ id: 201, title: "Clean Code", finePerDay: 5000 }];
let members4 = [{ id: 1, name: "Minh Tran" }];
let records4 = [
    { id: 1, memberId: 1, lines: [{ bookId: 201, lateDays: 1 }] },
    { id: 2, memberId: 1, lines: [{ bookId: 201, lateDays: 2 }] },
    { id: 3, memberId: 1, lines: [{ bookId: 201, lateDays: 4 }] },
];
let result4 = getMemberFineStatistics(members4, books4, records4);
console.log(result4[0].books[0]);

// test case 5
console.log("test case 5");
let members5 = [
    { id: 1, name: "Huy" },
    { id: 2, name: "Lan" },
    { id: 3, name: "Minh" },
];
let books5 = [{ id: 1, title: "Test Book", finePerDay: 100 }];
let records5 = [
    { id: 1, memberId: 1, lines: [{ bookId: 1, lateDays: 280 }] },
    { id: 2, memberId: 2, lines: [{ bookId: 1, lateDays: 330 }] },
    { id: 3, memberId: 3, lines: [{ bookId: 1, lateDays: 305 }] },
];
let result5 = getMemberFineStatistics(members5, books5, records5);
for (let m of result5) {
    console.log(m.name, m.totalFine);
}

// test case 6
console.log("test case 6");
let books6 = [
    { id: 1, title: "Clean Code", finePerDay: 6000 },
    { id: 2, title: "The Pragmatic Programmer", finePerDay: 6000 },
    { id: 3, title: "Atomic Habits", finePerDay: 3000 },
    { id: 4, title: "Deep Work", finePerDay: 2000 },
];
let members6 = [{ id: 1, name: "Test" }];
let records6 = [
    {
        id: 1,
        memberId: 1,
        lines: [
            { bookId: 1, lateDays: 3 },
            { bookId: 2, lateDays: 4 },
            { bookId: 3, lateDays: 2 },
            { bookId: 4, lateDays: 0 },
        ],
    },
];
let result6 = getMemberFineStatistics(members6, books6, records6);
for (let b of result6[0].books) {
    console.log(b.title, b.fine);
}

// test case 7
console.log("test case 7");
let members7 = [{ id: 5, name: "Duc" }];
let books7 = [{ id: 205, title: "The Pragmatic Programmer", finePerDay: 6000 }];
let records7 = [{ id: 1, memberId: 5, lines: [{ bookId: 205, lateDays: 10 }] }];
let result7 = getMemberFineStatistics(members7, books7, records7);
console.log(result7[0]);

// test case 8
console.log("test case 8");
let result8 = getMemberFineStatistics([], [], []);
console.log(result8);

// test case 9
console.log("test case 9");
let result9 = getMemberFineStatistics(members, books, borrowRecords);
result9[0].totalFine = 999999;
result9[0].extraField = "hack";
console.log(result9[0].totalFine);
console.log(result9[0].extraField);

// test case 10
console.log("test case 10");
let members10 = [{ id: 1, name: "Minh Tran" }];
let books10 = [{ id: 201, title: "Clean Code", finePerDay: 5000 }];
let brokenRecord = Object.create({ lines: [{ bookId: 201, lateDays: 5 }] });
brokenRecord.id = 1;
brokenRecord.memberId = 1;
let result10 = getMemberFineStatistics(members10, books10, [brokenRecord]);
console.log(result10[0]);

// test case 11
console.log("test case 11");
function MemberPaginator(list, pageSize) {
    let pages = [];
    for (let i = 0; i < list.length; i += pageSize) {
        pages.push(list.slice(i, i + pageSize));
    }
    return pages;
}
let result11 = getMemberFineStatistics(members, books, borrowRecords);
let pages = [...MemberPaginator(result11, 2)];
let trang = 1;
for (let p of pages) {
    let ten = p.map((m) => m.name).join(", ");
    console.log("Trang " + trang + ": [" + ten + "]");
    trang++;
}
