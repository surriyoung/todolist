let todos = {};
// 할일 추가하기

function addTodo(txt) {
  let todos = JSON.parse(localStorage.getItem("todos")); //데이터 불러오기

  let todo = {
    content: txt,
  };

  if (todos == null) {
    //todolist가 없을때
    todo.id = 0;
    todos = { todo: [] }; //todos.todo[0].id
    todos.todo.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  } else {
    todo.id = todos.todo.length;
    todos.todo.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  //글 한개 추가
  var reusltHtml =
    `
                    <li class="list">
                    <input type="checkbox" class="check" id="chk" name="ck"/>
                    <p class="cont">` +
    txt +
    `</p>
                    <button type='button' class="delete"  id="delete"><span></span><span></span></button>
                    </li>
                `;
  $(".list:last-child").after(reusltHtml);
}

//엔터키 눌렀을 때 추가
function enterClick() {
  var code = window.event.keyCode;
  txt = document.getElementById("todoInput").value;

  if (code == 13 && txt != "") {
    addTodo(txt);
  }
}

//버튼 눌렀을 때 추가
function addBtnClick() {
  txt = document.getElementById("todoInput").value;
  console.log("텍스트 입력값 : ", txt);
  if (txt != "") {
    addTodo(txt);
  }
}

// 전체 todo가져오기
function getTodosListAll() {
  todos = JSON.parse(localStorage.getItem("todos"));
  if (todos == null) {
    todos = { todo: [] };
  }
  for (var i = 0; i < todos.todo.length; i++) {
    reusltHtml =
      `
                        <li class="list">
                        <input type="checkbox" class="check" id="chk" name="ck"/>
                        <p class="cont">` +
      todos.todo[i].content +
      `</p>
                        <button type='button' class="delete"  id="delete"><span></span><span></span></button>
                        </li>
                    `;
    $(".list:last-child").after(reusltHtml);
  }
}

$(document).ready(function () {
  getTodosListAll();
});
