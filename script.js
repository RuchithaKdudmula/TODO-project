let input = document.querySelector('.input');
let btn = document.querySelector('.button');
let empty = document.querySelector('.empty-text')
let list = document.querySelector('.list')

let editingSpan = null
btn.addEventListener('click', (e) => {
    let todoList = input.value
    if (todoList === "") {
        alert("no task yet");
        return;
    }
    if (editingSpan) {
        editingSpan.innerText = input.value;
        editingSpan = null;
        btn.innerText = "ADD";
        input.value = "";
        btn.classList.remove("update-btn");

        return;
    }
    let li = document.createElement('li');
    let span = document.createElement('span');
    span.innerText = todoList;
    li.appendChild(span)

    let edit = document.createElement('button');
    edit.innerText = 'Edit'
    edit.classList.add("edit-btn");
    li.appendChild(edit);
    edit.addEventListener('click', () => {
        input.value = span.innerText;
        input.focus();
        editingSpan = span;
        btn.innerText = "Update";
        btn.classList.add("update-btn");
    })
    let dele = document.createElement('button')
    dele.innerText = 'Delete';
    li.appendChild(dele);
    dele.addEventListener('click', () => {
        li.remove()
    })
    list.appendChild(li);
    empty.style.display = "none";
    input.value = "";



});
