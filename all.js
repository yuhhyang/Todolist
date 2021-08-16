let section = document.querySelector('section');
let add = document.querySelector('form button');
add.addEventListener('click',e =>{
    e.preventDefault();
    //取得輸入的value
    //console.log(e.target);//<button>Add into list</button>
    //console.log(e.target.parentElement);//<form>
    let form = e.target.parentElement;
    let todoText = form.children[0].value;
    let todoMonth = form.children[1].value;
    let todoDate = form.children[2].value;
    //console.log(todoText,todoMonth,todoDate)
    if(todoText === ""||todoMonth === ""||todoDate ===""){
        alert("任一欄位不得為空!");
        return;
    }
    //新增todo
    let todo = document.createElement('div');
    todo.classList.add("todo");
    let text = document.createElement('p');
    text.classList.add("todo_text");
    text.innerText = todoText;
    let time = document.createElement('p');
    time.classList.add("todo_time");
    time.innerText = todoMonth + "/" + todoDate;
    todo.appendChild(text);
    todo.appendChild(time);
    //新增勾勾和垃圾桶
    let doneButton = document.createElement('button');
    doneButton.classList.add('done');
    doneButton.innerHTML = `<i class="fas fa-check"></i>`;
    //點選勾勾時新增class讓背景變透明並增加刪除線，且讓點選鍵可逆
    doneButton.addEventListener('click',e => {
        //console.log(e.target.parentElement)
        let doneItem = e.target.parentElement;
        doneItem.classList.toggle("havedone");
    })
    let trashButton = document.createElement('button');
    trashButton.classList.add('trash');
    trashButton.innerHTML = `<i class="fas fa-trash-alt"></i>`;
    //點選垃圾桶時刪除事項
    trashButton.addEventListener('click',e => {
        //console.log(e.target.parentElement)
        let deletItem = e.target.parentElement;
        //動畫結束時移除代辦事項
        deletItem.addEventListener('animationend',e=>{
            //刪除localstorage內的資料
            let deleteText = deletItem.children[0].innerText;
            let deleteArray = JSON.parse(localStorage.getItem("todolist"));
            deleteArray.forEach((item, index)=>{
                if(item.todoText == deleteText){
                    deleteArray.splice(index,1);
                    localStorage.setItem("todolist", JSON.stringify(deleteArray));
                }
            })
            deletItem.remove();
        })
        deletItem.style.animation = "scaleDown 0.3s forwards";
    })
    todo.appendChild(doneButton);
    todo.appendChild(trashButton);
    //點擊新增事項後的效果
    todo.style.animation = "scaleUp 0.3s forwards";
    //新增object
    let todoItems={
        todoText:todoText,
        todoMonth:todoMonth,
        todoDate:todoDate
    };
    //存到LocalStorage
    let listData = localStorage.getItem("todolist");
    if(listData == null){
        localStorage.setItem("todolist",JSON.stringify([todoItems]));
    }else{
        let getData = JSON.parse(listData);
        getData.push(todoItems);
        localStorage.setItem("todolist",JSON.stringify(getData));
    }
    console.log(JSON.parse(localStorage.getItem("todolist")));
    //新增事項後清空欄位
    form.children[0].value = "";
    form.children[1].value = "";
    form.children[2].value = "";

    section.appendChild(todo);
})


//渲染畫面
let listData = localStorage.getItem("todolist");
if(listData !== null){
    let getData = JSON.parse(listData);
    getData.forEach(item => {
        //新增todo
        let todo = document.createElement('div');
        todo.classList.add("todo");
        let text = document.createElement('p');
        text.classList.add("todo_text");
        text.innerText = item.todoText;
        let time = document.createElement('p');
        time.classList.add("todo_time");
        time.innerText = item.todoMonth + "/" + item.todoDate;
        todo.appendChild(text);
        todo.appendChild(time);
        //新增勾勾和垃圾桶
        let doneButton = document.createElement('button');
        doneButton.classList.add('done');
        doneButton.innerHTML = `<i class="fas fa-check"></i>`;
        //點選勾勾時新增class讓背景變透明並增加刪除線，且讓點選鍵可逆
        doneButton.addEventListener('click',e => {
            //console.log(e.target.parentElement)
            let doneItem = e.target.parentElement;
            doneItem.classList.toggle("havedone");
        })
        let trashButton = document.createElement('button');
        trashButton.classList.add('trash');
        trashButton.innerHTML = `<i class="fas fa-trash-alt"></i>`;
        //點選垃圾桶時刪除事項
        trashButton.addEventListener('click',e => {
            //console.log(e.target.parentElement)
            let deletItem = e.target.parentElement;
            //動畫結束時移除代辦事項
            deletItem.addEventListener('animationend',e=>{
                //刪除localstorage內的資料
                let deleteText = deletItem.children[0].innerText;
                let deleteArray = JSON.parse(localStorage.getItem("todolist"));
                deleteArray.forEach((item, index)=>{
                    if(item.todoText == deleteText){
                        deleteArray.splice(index,1);
                        localStorage.setItem("todolist", JSON.stringify(deleteArray));
                    }
                })
                deletItem.remove();
            })
            deletItem.style.animation = "scaleDown 0.3s forwards";
        })
        todo.appendChild(doneButton);
        todo.appendChild(trashButton);
        section.appendChild(todo);
    })
}