// const btnEL = document.getElementById("btn-open");
// // console.log(btnEL);
// console.log(document);
// HTMLDDocument.prototype.abc = "abc";
// console.log(document.abc);

const btnEL = document.getElementById("btn-open");
const btnELs = document.getElementsByClassName("btn");
// console.log(btnEL);
console.log([...btnELs].forEach(btnEl => {console.log(btnEl)}));