const students = [
    { id: 1, name: "Khoa Nguyen" },
    { id: 2, name: "My Tran" },
    { id: 3, name: "Phong Le" },
    { id: 4, name: "Yen Vo" },
    { id: 5, name: "Bao Pham" },
];
const answerKey = [
    { question: 1, correctAnswer: "A", point: 2 },
    { question: 2, correctAnswer: "C", point: 1 },
    { question: 3, correctAnswer: "B", point: 3 },
    { question: 4, correctAnswer: "D", point: 2 },
    { question: 5, correctAnswer: "A", point: 2 },
];
const submissions = [
    {
        studentId: 1,
        submittedAt: "2026-07-10T08:00:00",
        answers: [
            { question: 1, answer: "A" },
            { question: 2, answer: "C" },
            { question: 3, answer: "B" },
            { question: 4, answer: "A" },
            { question: 5, answer: "A" },
        ],
    },
    {
        studentId: 2,
        submittedAt: "2026-07-10T08:05:00",
        answers: [
            { question: 1, answer: "A" },
            { question: 2, answer: "B" },
            { question: 3, answer: "B" },
            { question: 4, answer: "D" },
            { question: 5, answer: "C" },
        ],
    },
    {
        studentId: 3,
        submittedAt: "2026-07-10T07:58:00",
        answers: [
            { question: 1, answer: "A" },
            { question: 2, answer: "C" },
            { question: 3, answer: "B" },
            { question: 4, answer: "D" },
            { question: 5, answer: "A" },
        ],
    },
    {
        studentId: 4,
        submittedAt: "2026-07-10T08:02:00",
        answers: [
            { question: 1, answer: "B" },
            { question: 2, answer: "C" },
        ],
    },
    {
        studentId: 5,
        submittedAt: "2026-07-10T08:01:00",
        answers: [
            { question: 1, answer: "A" },
            { question: 2, answer: "C" },
            { question: 3, answer: "B" },
            { question: 4, answer: "D" },
            { question: 5, answer: "A" },
        ],
    },
];

function lockResult(obj) {
    let keys = Object.keys(obj);
    for (let key of keys) {
        Object.defineProperty(obj, key, {
            writable: false,
            configurable: false,
        });
    }
    return obj;
}

function gradeExam(students, answerKey, submissions) {
    let list = [];

    for (let student of students) {
        let mySubmission = null;
        for (let sub of submissions) {
            if (sub.studentId === student.id && Object.hasOwn(sub, "answers")) {
                mySubmission = sub;
                break;
            }
        }
        let score = 0;
        let correctCount = 0;
        let wrongQuestions = [];

        for (let item of answerKey) {
            let myAnswer = null;

            if (mySubmission) {
                for (let a of mySubmission.answers) {
                    if (a.question === item.question) {
                        myAnswer = a.answer;
                        break;
                    }
                }
            }
            if (myAnswer === item.correctAnswer) {
                score = score + item.point;
                correctCount = correctCount + 1;
            } else {
                wrongQuestions.push(item.question);
            }
        }

        wrongQuestions.sort((a, b) => a - b);
        list.push({
            id: student.id,
            name: student.name,
            score: score,
            correctCount: correctCount,
            wrongQuestions: wrongQuestions,
            rank: 0,             submittedAt: mySubmission ? mySubmission.submittedAt : null,
        });
    }

    list.sort((a, b) => {
        if (a.score !== b.score) {
            return b.score - a.score;
        }
        if (a.submittedAt === null) return 1;
        if (b.submittedAt === null) return -1;
        return new Date(a.submittedAt) - new Date(b.submittedAt);
    });
    for (let i = 0; i < list.length; i++) {
        if (i === 0) {
            list[i].rank = 1;
        } else if (list[i].score === list[i - 1].score) {
            list[i].rank = list[i - 1].rank;
        } else {
            list[i].rank = i + 1;
        }
    }
    let finalList = [];
    for (let r of list) {
        let obj = {
            id: r.id,
            name: r.name,
            score: r.score,
            correctCount: r.correctCount,
            wrongQuestions: r.wrongQuestions,
            rank: r.rank,
        };
        lockResult(obj);
        finalList.push(obj);
    }

    return finalList;
}

function WrongAnswerIterator(studentResult) {
    let list = studentResult.wrongQuestions;
    let index = 0;
    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            if (index < list.length) {
                let value = list[index];
                index = index + 1;
                return { value: value, done: false };
            } else {
                return { value: undefined, done: true };
            }
        },
    };
}

let ketQuaThat = gradeExam(students, answerKey, submissions);
for (let r of ketQuaThat) {
    console.log(r);
}
// ----- test case 1 -----
console.log("\ntest case 1");
let studentsT1 = [{ id: 1, name: "Test A" }];
let submissionsT1 = [
    {
        studentId: 1,
        submittedAt: "2026-07-10T08:00:00",
        answers: [
            { question: 1, answer: "A" }, // dung, 2 diem
            { question: 2, answer: "X" }, // sai
            { question: 3, answer: "B" }, // dung, 3 diem
            { question: 4, answer: "X" }, // sai
            { question: 5, answer: "A" }, // dung, 2 diem
        ],
    },
];
let resultT1 = gradeExam(studentsT1, answerKey, submissionsT1);
console.log(resultT1[0]);
// ----- test case 2 -----
console.log("\ntest case 2");
let studentsT2 = [{ id: 1, name: "Test B" }];
let submissionsT2 = [
    {
        studentId: 1,
        submittedAt: "2026-07-10T08:00:00",
        answers: [
            { question: 1, answer: "A" }, 
            { question: 2, answer: "X" }, 
               ],
    },
];
let resultT2 = gradeExam(studentsT2, answerKey, submissionsT2);
console.log(resultT2[0]);

// ----- test case 3 -----
console.log("\ntest case 3");
let studentsT3 = [{ id: 99, name: "Test C" }];
let submissionsT3 = []; 
let resultT3 = gradeExam(studentsT3, answerKey, submissionsT3);
console.log(resultT3[0]);

// ----- test case 4 -----
console.log("\ntest case 4");
let studentsT4 = [
    { id: 1, name: "Khoa" },
    { id: 2, name: "Yen" },
    { id: 3, name: "Phong" },
    { id: 4, name: "Bao" },
];
let submissionsT4 = [
    {
        studentId: 1,
        submittedAt: "2026-07-10T08:00:00",
        answers: [
            { question: 1, answer: "A" },
            { question: 2, answer: "C" },
            { question: 3, answer: "B" },
            { question: 4, answer: "D" },
            { question: 5, answer: "A" },
        ],
    },
    {
        studentId: 2,
        submittedAt: "2026-07-10T08:01:00",
        answers: [
            { question: 1, answer: "A" },
            { question: 2, answer: "C" },
            { question: 3, answer: "B" },
            { question: 4, answer: "D" },
            { question: 5, answer: "A" },
        ],
    },
    {
        studentId: 3,
        submittedAt: "2026-07-10T07:58:00",
        answers: [
            { question: 1, answer: "A" },
            { question: 2, answer: "C" },
            { question: 3, answer: "B" },
            { question: 4, answer: "D" },
            { question: 5, answer: "A" },
        ],
    },
    {
        studentId: 4,
        submittedAt: "2026-07-10T08:02:00",
        answers: [
            { question: 1, answer: "A" },
            { question: 2, answer: "C" },
            { question: 3, answer: "X" }, 
            { question: 4, answer: "D" },
            { question: 5, answer: "A" },
        ],
    },
];
let resultT4 = gradeExam(studentsT4, answerKey, submissionsT4);
for (let r of resultT4) {
    console.log(r.name, "diem:", r.score, "rank:", r.rank);
}
// ----- test case 5 -----
console.log("\ntest case 5");
let studentsT5 = [
    { id: 1, name: "Khoa" },
    { id: 2, name: "Yen" },
    { id: 3, name: "Phong" },
];
let submissionsT5 = [
    {
        studentId: 1,
        submittedAt: "2026-07-10T08:00:00",
        answers: [
            { question: 1, answer: "A" },
            { question: 2, answer: "C" },
            { question: 3, answer: "B" },
            { question: 4, answer: "D" },
            { question: 5, answer: "A" },
        ],
    },
    {
        studentId: 2,
        submittedAt: "2026-07-10T08:01:00",
        answers: [
            { question: 1, answer: "A" },
            { question: 2, answer: "C" },
            { question: 3, answer: "B" },
            { question: 4, answer: "D" },
            { question: 5, answer: "A" },
        ],
    },
    {
        studentId: 3,
        submittedAt: "2026-07-10T07:58:00",
        answers: [
            { question: 1, answer: "A" },
            { question: 2, answer: "C" },
            { question: 3, answer: "B" },
            { question: 4, answer: "D" },
            { question: 5, answer: "A" },
        ],
    },
];
let resultT5 = gradeExam(studentsT5, answerKey, submissionsT5);
for (let r of resultT5) {
    console.log(r.name);
}
// ----- test case 6 -----
console.log("\ntest case 6");
let studentsT6 = [
    { id: 1, name: "A" },
    { id: 2, name: "B" },
    { id: 3, name: "C" },
    { id: 4, name: "D" },
    { id: 5, name: "E" },
];
let baiLamDung = [
    { question: 1, answer: "A" },
    { question: 2, answer: "C" },
    { question: 3, answer: "B" },
    { question: 4, answer: "D" },
    { question: 5, answer: "A" },
];
let submissionsT6 = [
    { studentId: 1, submittedAt: "2026-07-10T08:00:00", answers: baiLamDung },
    { studentId: 2, submittedAt: "2026-07-10T08:01:00", answers: baiLamDung },
    { studentId: 3, submittedAt: "2026-07-10T08:02:00", answers: baiLamDung },
    { studentId: 4, submittedAt: "2026-07-10T08:03:00", answers: baiLamDung },

];
let resultT6 = gradeExam(studentsT6, answerKey, submissionsT6);
for (let r of resultT6) {
    console.log(r.name, "diem:", r.score, "rank:", r.rank);
}

// ----- test case 7 -----
console.log("\ntest case 7");
let brokenSubmission = Object.create({
    answers: [{ question: 1, answer: "A" }],
});
brokenSubmission.studentId = 2;
brokenSubmission.submittedAt = "2026-07-10T08:05:00";
let resultT7 = gradeExam(students, answerKey, [brokenSubmission]);
let myTran = resultT7.find((r) => r.id === 2);
console.log(myTran);
// ----- test case 8 -----
console.log("\ntest case 8");
let resultT8 = gradeExam(students, answerKey, submissions);
resultT8[0].score = 999;
resultT8[0].note = "diem danh gia them";
console.log("score sau khi co sua:", resultT8[0].score); 
console.log("note sau khi them:", resultT8[0].note); 
// ----- test case 9 -----
console.log("\ntest case 9");
let studentsT9 = [{ id: 1, name: "Test D" }];
let submissionsT9 = [
    {
        studentId: 1,
        submittedAt: "2026-07-10T08:00:00",
        answers: [
            { question: 1, answer: "A" },
            { question: 2, answer: "C" },
         
        ],
    },
];
let resultT9 = gradeExam(studentsT9, answerKey, submissionsT9);
let hocSinh9 = resultT9[0];
console.log("wrongQuestions:", hocSinh9.wrongQuestions);

for (let cauSai of WrongAnswerIterator(hocSinh9)) {
    console.log(cauSai);
}
let studentsT9b = [{ id: 1, name: "Test E" }];
let submissionsT9b = [
    { studentId: 1, submittedAt: "2026-07-10T08:00:00", answers: baiLamDung },
];
let resultT9b = gradeExam(studentsT9b, answerKey, submissionsT9b);
console.log([...WrongAnswerIterator(resultT9b[0])]); 
// ----- test case 10 -----
console.log("\ntest case 10");
let resultT10 = gradeExam([], [], []);
console.log(resultT10); 
