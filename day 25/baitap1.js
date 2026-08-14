//Lấy các phần tử HTML
const input = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add-btn");
const todoList = document.querySelector("#todo-list");
const todoCount = document.querySelector("#todo-count");
//cập nhật số việc chưa xong
function updateCount() {
    const allTasks = todoList.querySelectorAll("li");
    let count = 0;
    for (const task of allTasks) {
        if (!task.classList.contains("done")) {
            count++;
        }
    }
    todoCount.textContent = `Còn ${count} việc chưa xong`;
}
//thêm công việc
function addTask() {
    // Lấy chữ người dùng nhập
    const text = input.value.trim();
    // Nếu rỗng thì dừng
    if (text === "") {
        return;
    }
    //Kiểm tra xem công việc đã tồn tại chưa
    const allTaskTexts = todoList.querySelectorAll("span");
    for (const taskText of allTaskTexts) {
        if (taskText.textContent === text) {
            // Báo trùng bằng viền đỏ
            input.style.border = "2px solid red";
            return;
        }
    }
    //Tạo thẻ li
    const li = document.createElement("li");
    // Tạo span chứa chữ
    const span = document.createElement("span");
    span.textContent = text;
    //Tạo nút Xóa
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Xóa";
    //Click vào chữ
    span.addEventListener("click", function () {
        // Nếu chưa xong
        if (!li.classList.contains("done")) {
            li.classList.add("done");
            span.style.textDecoration = "line-through";
            span.style.color = "gray";
        } else {
            // Nếu đã xong thì bỏ trạng thái done
            li.classList.remove("done");
            span.style.textDecoration = "none";
            span.style.color = "black";
        }
        updateCount();
    });
    //Click nút Xóa
    deleteBtn.addEventListener("click", function () {
        li.remove();
        updateCount();
    });
    //Đưa span và button vào li
    li.appendChild(span);
    li.appendChild(deleteBtn);
    //Đưa li vào ul
    todoList.appendChild(li);
    //Xóa chữ trong input
    input.value = "";
    // Cập nhật số lượng
    updateCount();
}
//Click nút Thêm
addBtn.addEventListener("click", function () {
    addTask();
});
//Enter
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
