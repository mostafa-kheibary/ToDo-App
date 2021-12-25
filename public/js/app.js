// constant and varible :
const TodoInput = document.querySelector(".todo-input");
const Todoslist = document.querySelector(".todo-list");
const CreateButton = document.querySelector(".submit");
const Page = document.querySelector(".container-2");
const OpenPage = document.querySelector(".add-botton");
const ClosePage = document.querySelector(".close-page");
const toast = document.querySelector(".message");
const RemoveAllButton = document.querySelector(".remove-all");
const SearchInput = document.querySelector(".search-input");
const SortButtons = document.querySelectorAll(".sort");
const pre = document.querySelector(".pre");

// event :
OpenPage.addEventListener("click", Open);
ClosePage.addEventListener("click", Close)
CreateButton.addEventListener("click", () => {
    if (TodoInput.value.trim() !== "") {
        Close();
    }
    AddTodo();
});
Todoslist.addEventListener("click", RemoveTodo);
toast.addEventListener("click", ToastRemove);
TodoInput.addEventListener("keydown", ToastRemove);
RemoveAllButton.addEventListener("click", RemoveAll);
SearchInput.addEventListener("keyup", SearchTodo);
for (const button of SortButtons) {
    const key = button.innerText;
    button.addEventListener("click", function () {
        Sort(key)
    })
}

// function :
function Open() {
    Page.classList.add("show-cont2");
}
function Close() {
    Page.classList.remove("show-cont2");
}
// adding todo 
function AddTodo() {
    event.preventDefault();
    SaveLocal(TodoInput.value);
    if (TodoInput.value.trim() !== "") {
        const TodoElement = `<li><div><h4>${TodoInput.value}</h4></div><div class= "split"><i class="far fa-trash-alt" id="closeli"></i><i class="fas fa-check" id="done"></i></div></li>`;
        Todoslist.innerHTML += TodoElement;
        // show delete all button when first todo was create
        RemoveAllButton.classList.add("show-remove-all");
        pre.style.display = "none";
    }
    else {
        ToastShow();
    }
    TodoInput.value = "";
}
// removing and check the todo
function RemoveTodo(e) {
    if (e.target.id === "closeli") {
        const myTodo = e.target.parentElement.parentElement;
        myTodo.classList.add("close-todo");
        DeleteTodo(myTodo);
        setTimeout(() => {
            myTodo.remove();
            // delete the button when we dont have any todo
            if (Todoslist.innerHTML == "") {
                RemoveAllButton.classList.remove("show-remove-all");
                pre.style.display = "block";
            }
        }, 500);
    }
    if (e.target.id === "done") {
        const myTodo = e.target.parentElement.parentElement;
        myTodo.classList.toggle("done-todo");
        let Todos;
        if (localStorage.getItem("Todos") == null) {
            Todos = [];
        }
        else {
            Todos = JSON.parse(localStorage.getItem("Todos"))
        }
        for (const todo of Todos) {
            if (todo.isdone == false) {
                todo.isdone = true;
            }
            else {
                todo.isdone = false;
            }
        }
        localStorage.setItem("Todos", JSON.stringify(Todos));
    }
}
// remove all todo 

function RemoveAll() {
    for (const todo of Todoslist.children) {
        DeleteTodo(todo.innerText)
        todo.classList.add("close-all-todo");
        setTimeout(() => todo.remove(), 500);
    }
    setTimeout(() => {
        // delete the button when we dont have any todo
        if (Todoslist.innerHTML == "") {
            RemoveAllButton.classList.remove("show-remove-all");
            pre.style.display = "block";
        }
    }, 500);
}
function SearchTodo() {
    const Todos = Todoslist.children;
    const value = SearchInput.value.trim();
    for (const todo of Todos) {
        if (todo.innerText.includes(value)) {
            todo.style.transform = "scale(1)";
            todo.style.height = "90px";
            todo.style.margin = "30px";
            todo.style.padding = "25px";
            setTimeout(() => todo.style.display = "flex", 300);
        }
        else {
            todo.style.transform = "scale(0)";
            todo.style.height = "0";
            todo.style.margin = "0";
            todo.style.padding = "0";
            setTimeout(() => todo.style.display = "none", 300);
        }
    }
}
// show the Error message
function ToastShow() {
    toast.classList.add("toast-animation");
    setTimeout(() => toast.classList.remove("toast-animation"), 3000);
}
function ToastRemove() {
    toast.classList.remove("toast-animation");
}
// sort todo
function Sort(cat) {

}
// local storage save
function SaveLocal(todo) {
    let Todos;
    if (localStorage.getItem("Todos") == null) {
        Todos = [];
    }
    else {
        Todos = JSON.parse(localStorage.getItem("Todos"))
    }
    if (todo.trim() !== "") {
        Todos.push({ title: todo.trim(), isdone: false });
        localStorage.setItem("Todos", JSON.stringify(Todos));
    }


}
function DeleteTodo(todo) {
    let Todos;
    if (localStorage.getItem("Todos") == null) {
        Todos = [];
    }
    else {
        Todos = JSON.parse(localStorage.getItem("Todos"))
    }
    const index = Todos.indexOf(todo.innerText);
    Todos.splice(index, 1);
    localStorage.setItem("Todos", JSON.stringify(Todos));
}
function GetTodo() {
    let Todos;
    if (localStorage.getItem("Todos") == null) {
        Todos = [];
    }
    else {
        Todos = JSON.parse(localStorage.getItem("Todos"))
    }
    for (const todo of Todos) {
        const TodoElement = `<li><div><h4>${todo.title}</h4></div><div class= "split"><i class="far fa-trash-alt" id="closeli"></i><i class="fas fa-check" id="done"></i></div></li>`;
        Todoslist.innerHTML += TodoElement;
        pre.style.display = "none";
    }
    if (Todoslist.innerHTML !== "") {
        RemoveAllButton.classList.add("show-remove-all");
    }
}
GetTodo();