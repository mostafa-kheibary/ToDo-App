// our var
const search = document.getElementById("search");
const AddBot = document.querySelector(".add-bott");
const Container2 = document.querySelector(".container-2");
const Close = document.querySelector(".close i");
const Submit = document.getElementById("submit");
const Menu = document.querySelector(".menu");
const Topic = document.getElementById("topic");
const CloseLi = document.querySelector(".closeli");
const form = document.querySelector("form")
const body = document.querySelector('html');
const ErrorBox = document.querySelector('.error');
const ErrorMessage = document.querySelector('.message');
const Todos = [];
let html = '';
// page Navigation 
AddBot.addEventListener("click", () => {
    Container2.classList.add("show-cont2")
});
Close.addEventListener("click", function () {
    Container2.classList.remove("show-cont2")
});


// prevent to reload page when form submit
form.addEventListener("submit", function (e) {
    e.preventDefault();
});
// click event for submit button 
Submit.addEventListener("click", function () {
    Container2.classList.remove("show-cont2");
    if (Topic.value.trim() != ``) {
        // TODOS array
        Todos.push(Topic.value);
        let html = '';
        // for get all item from todos arrey
        for (const todo of Todos) {
            html += `<li><div><h4>${todo}</h4></div><div class= "split"><i class="fas fa-times" id="closeli"></i><i class="fas fa-check" id="done"></i></div></li>`;
        }
        console.log(Todos);
        Menu.innerHTML = html;
    }
    else {
        ErrorMessage.classList.add('toast-animation');
        setTimeout(() => ErrorMessage.classList.remove('toast-animation'), 3000);
    }
    // clean the input value
    Topic.value = '';

    // deliting li part
    const lis = Menu.children;
    for (const li of lis) {
        li.addEventListener("click", function (e) {
            if (e.target.id == "closeli") {
                // find index of li to remove it
                const x = Todos.findIndex((n) => n == li.innerText);
                // splice it from arrey and remove
                Todos.splice(x, 1);
                console.log(Todos);
                //  (delete li) animataion
                li.classList.add("li-detroy");
                li.style = 'height: 0px;margin: 0px;padding:0px;'
                setTimeout(function () {
                    li.remove();
                    li.classList.remove("li-detroy");
                }, 700);
            }
            if(e.target.id == "done"){
                li.classList.toggle('todo-done');
            }
        });
    }
});
// when start wrinthing toast will be disappre
Topic.addEventListener('keydown', () => ErrorMessage.classList.remove('toast-animation'));
ErrorMessage.addEventListener('click', () => ErrorMessage.classList.remove('toast-animation'));
// search option
const lis = Menu.children;
search.addEventListener("keyup", function () {
    const searchVall = search.value.trim();
    for (const li of lis) {
        if (li.innerText.includes(searchVall)) {
            li.style.display = "flex";
        }
        else {
            li.style.display = "none";
        }
    }
});