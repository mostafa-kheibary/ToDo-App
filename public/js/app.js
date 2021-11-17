// our constant
const AddBot = document.querySelector(".add-bott");
const Container2 = document.querySelector(".container-2");
const Close = document.querySelector(".close");
const Submit = document.getElementById("submit");
const Menu = document.querySelector(".menu");
const Topic = document.getElementById("topic");
const ExContent = document.getElementById("content");
const CloseLi = document.querySelector(".closeli");
const form = document.querySelector("form")


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

// click event for button
Submit.addEventListener("click", function () {

    Container2.classList.remove("show-cont2")
    if (Topic.value != `` | ExContent.value != ``) {
        Menu.innerHTML += `<li><div><h4>${Topic.value}</h4><p>${ExContent.value}<p></div><div><i class="fas fa-times closeli"></i></div></li>`;
        Topic.value = "";
        ExContent.value = "";
    }
    const lis = Menu.children;
    for (const li of lis) {
        li.addEventListener("click", function (e) {
            if (e.target.tagName == "I") {
                li.classList.add("li-detroy");
                li.style = 'height: 0px;margin: 0px;padding:0px;'
                setTimeout(function(){
                    li.remove();
                    li.classList.remove("li-detroy");
                },1000);
            }
        });
    }

});


