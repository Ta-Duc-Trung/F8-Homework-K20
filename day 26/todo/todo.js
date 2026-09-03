let todos = [];

let nextTodoId = 1;

let currentFilter = "all";

let editingTodoId = null;

const todoInput = document.getElementById("todoInput");
const todoAddBtn = document.getElementById("todoAddBtn");
const todoAddError = document.getElementById("todoAddError");
const todoListEl = document.getElementById("todoList");
const todoFiltersEl = document.getElementById("todoFilters");
const todoCountEl = document.getElementById("todoCount");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

function saveTodosToStorage() {
    const dataToSave = [];
    for (let i = 0; i < todos.length; i++) {
        const t = todos[i];
        if (t.removing === false) {
            dataToSave.push({ id: t.id, text: t.text, completed: t.completed });
        }
    }
    localStorage.setItem("todo-app-data", JSON.stringify(dataToSave));
}

function loadTodosFromStorage() {
    const raw = localStorage.getItem("todo-app-data");

    if (!raw) {
        return [
            {
                id: 1,
                text: "Học Event Delegation",
                completed: true,
                removing: false,
            },
            { id: 2, text: "Làm bài Tabs", completed: false, removing: false },
            {
                id: 3,
                text: "Làm bài Slideshow",
                completed: false,
                removing: false,
            },
        ];
    }

    const saved = JSON.parse(raw);
    const result = [];
    for (let i = 0; i < saved.length; i++) {
        result.push({
            id: saved[i].id,
            text: saved[i].text,
            completed: saved[i].completed,
            removing: false,
        });
    }
    return result;
}

function addTodo() {
    const value = todoInput.value.trim();

    if (value === "") {
        todoAddError.textContent = "Vui lòng nhập nội dung todo!";
        return;
    }

    todoAddError.textContent = "";

    todos.push({
        id: nextTodoId,
        text: value,
        completed: false,
        removing: false,
    });
    nextTodoId = nextTodoId + 1;

    todoInput.value = "";
    todoInput.focus();

    renderTodos();
}

function findTodoById(id) {
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
            return todos[i];
        }
    }
    return null;
}

function removeTodoFromArray(id) {
    const newTodos = [];
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id !== id) {
            newTodos.push(todos[i]);
        }
    }
    todos = newTodos;
}

function renderTodos() {
    todoListEl.innerHTML = "";

    const visibleTodos = [];
    for (let i = 0; i < todos.length; i++) {
        const t = todos[i];
        if (currentFilter === "active" && t.completed === true) continue;
        if (currentFilter === "completed" && t.completed === false) continue;
        visibleTodos.push(t);
    }

    if (visibleTodos.length === 0) {
        const emptyLi = document.createElement("li");
        emptyLi.className = "text-slate-400 text-sm text-center py-7";
        emptyLi.textContent = "Không có todo nào";
        todoListEl.appendChild(emptyLi);
    }

    for (let i = 0; i < visibleTodos.length; i++) {
        const todo = visibleTodos[i];
        const li = createTodoElement(todo);
        todoListEl.appendChild(li);
    }

    updateTodoCount();
    saveTodosToStorage();
}

function createTodoElement(todo) {
    const li = document.createElement("li");
    li.dataset.id = todo.id;

    let classes =
        "todo-item flex items-center gap-3 px-2.5 py-3 rounded-md hover:bg-surface2";
    if (todo.completed === true) classes += " completed";
    if (todo.removing === true) classes += " removing";
    li.className = classes;

    if (editingTodoId === todo.id) {
        li.innerHTML =
            '<span class="w-[18px] flex-shrink-0"></span>' +
            '<div class="flex-1">' +
            '  <input type="text" class="todo-edit-input w-full bg-surface2 border border-line rounded-md px-3 py-2 text-sm text-slate-100 outline-none focus:border-accent" value="' +
            escapeHtml(todo.text) +
            '">' +
            '  <div class="edit-error text-red-400 text-xs mt-1.5 min-h-[1.1em]"></div>' +
            "</div>";

        const editInput = li.querySelector(".todo-edit-input");
        const editErrorEl = li.querySelector(".edit-error");

        setTimeout(function () {
            editInput.focus();
            editInput.select();
        }, 0);

        editInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                saveEditedTodo(todo, editInput.value, editErrorEl);
            } else if (e.key === "Escape") {
                editingTodoId = null;
                renderTodos();
            }
        });

        editInput.addEventListener("blur", function () {
            if (editingTodoId === todo.id) {
                saveEditedTodo(todo, editInput.value, editErrorEl);
            }
        });

        return li;
    }

    li.innerHTML =
        '<input type="checkbox" class="w-[18px] h-[18px] accent-emerald-400 flex-shrink-0"' +
        (todo.completed ? " checked" : "") +
        ">" +
        '<span class="todo-text flex-1 text-sm cursor-text">' +
        escapeHtml(todo.text) +
        "</span>" +
        '<button class="todo-delete-btn text-xs font-semibold text-slate-400 px-2.5 py-1 rounded-md hover:text-red-400 hover:bg-red-400/10">Xoá</button>';

    return li;
}

function saveEditedTodo(todo, newValue, errorEl) {
    const value = newValue.trim();
    if (value === "") {
        errorEl.textContent = "Vui lòng nhập nội dung todo!";
        return;
    }
    todo.text = value;
    editingTodoId = null;
    renderTodos();
}

function updateTodoCount() {
    let total = 0;
    let done = 0;
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].removing === true) continue;
        total = total + 1;
        if (todos[i].completed === true) done = done + 1;
    }
    todoCountEl.textContent = done + "/" + total + " mục đã hoàn thành";

    if (done > 0) {
        clearCompletedBtn.classList.remove("hidden");
    } else {
        clearCompletedBtn.classList.add("hidden");
    }
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

todoAddBtn.addEventListener("click", function () {
    addTodo();
});

todoInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addTodo();
    }
});

todoInput.addEventListener("input", function () {
    todoAddError.textContent = "";
});

todoFiltersEl.addEventListener("click", function (e) {
    const clickedBtn = e.target.closest(".filter-btn");
    if (!clickedBtn) return;

    currentFilter = clickedBtn.dataset.filter;

    const allFilterBtns = todoFiltersEl.querySelectorAll(".filter-btn");
    for (let i = 0; i < allFilterBtns.length; i++) {
        if (allFilterBtns[i] === clickedBtn) {
            allFilterBtns[i].classList.add("is-active");
        } else {
            allFilterBtns[i].classList.remove("is-active");
        }
    }

    renderTodos();
});

todoListEl.addEventListener("change", function (e) {
    if (e.target.matches('input[type="checkbox"]')) {
        const li = e.target.closest(".todo-item");
        const id = Number(li.dataset.id);
        const todo = findTodoById(id);
        if (todo) {
            todo.completed = e.target.checked;
        }
        renderTodos();
    }
});

todoListEl.addEventListener("click", function (e) {
    const deleteBtn = e.target.closest(".todo-delete-btn");
    if (!deleteBtn) return;

    const li = deleteBtn.closest(".todo-item");
    const id = Number(li.dataset.id);
    const todo = findTodoById(id);
    if (!todo) return;

    const confirmed = confirm('Xoá todo "' + todo.text + '"?');
    if (!confirmed) return;

    todo.removing = true;
    renderTodos();

    setTimeout(function () {
        removeTodoFromArray(id);
        renderTodos();
    }, 300);
});

todoListEl.addEventListener("dblclick", function (e) {
    const textEl = e.target.closest(".todo-text");
    if (!textEl) return;

    const li = textEl.closest(".todo-item");
    editingTodoId = Number(li.dataset.id);
    renderTodos();
});

clearCompletedBtn.addEventListener("click", function () {
    const completedIds = [];
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].completed === true) {
            completedIds.push(todos[i].id);
        }
    }
    if (completedIds.length === 0) return;

    const confirmed = confirm(
        "Xoá " + completedIds.length + " todo đã hoàn thành?",
    );
    if (!confirmed) return;

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].completed === true) {
            todos[i].removing = true;
        }
    }
    renderTodos();

    setTimeout(function () {
        const remaining = [];
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].completed === false) {
                remaining.push(todos[i]);
            }
        }
        todos = remaining;
        renderTodos();
    }, 300);
});

todos = loadTodosFromStorage();
let maxId = 0;
for (let i = 0; i < todos.length; i++) {
    if (todos[i].id > maxId) maxId = todos[i].id;
}
nextTodoId = maxId + 1;
renderTodos();
