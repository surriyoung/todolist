// 화살표 함수로 변경
$(document).ready(() => {
  getTodosListAll();
});

// 전체 todo가져오기
function getTodosListAll() {
  todos = JSON.parse(localStorage.getItem("todos"));
  if (todos == null) {
    todos = { todo: [] };
  }
  for (var i = 0; i < todos.todo.length; i++) {
    if (todos.todo[i].checked == 0) {
      console.log("???" + todos.todo[i].checked);
      reusltHtml =
        `
                        <li class="list">
                        <div class="check" id="chk" name="ck" onclick="checkClick(` +
        todos.todo[i].id +
        `)"></div>
                        <p class="cont">` +
        todos.todo[i].content +
        `</p>
                        <button type='button' class="delete"  id="delete" onclick="deleteClick(` +
        todos.todo[i].id +
        `)"><span></span><span></span></button>
                        </li>
                    `;
    } else {
      reusltHtml =
        `
                        <li class="list">
                        <div class="check checked" id="chk" name="ck" onclick="checkClick(` +
        todos.todo[i].id +
        `)"></div>
                        <p class="cont">` +
        todos.todo[i].content +
        `</p>
                        <button type='button' class="delete"  id="delete" onclick="deleteClick(` +
        todos.todo[i].id +
        `)"><span></span><span></span></button>
                        </li>
                    `;
    }
    $(".list:last-child").after(reusltHtml);
  }
}

let todos = {};
let checkBox;

function addTodo(txt) {
  let todos = JSON.parse(localStorage.getItem("todos")); //데이터 불러오기

  //시간으로 추가
  let todo = {
    id: Date.now(), // 현재시간 기준으로 저장
    checked: 0, // 0: false , 1: true
    content: txt,
  };

  if (todos == null) {
    //todolist가 없을때
    todos = { todo: [] }; //todos.todo[0].id
    todos.todo.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  } else {
    //todo.id = todos.todo.length;
    todos.todo.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  //글 한개 추가
  var reusltHtml =
    `
                    <li class="list">
                    <div class="check" id="chk" name="ck" onClick="checkClick(` +
    todo.id +
    `)"></div>
                    <p class="cont">` +
    txt +
    `</p>
                    <button type='button' class="delete"  id="delete" onclick="deleteClick(` +
    todo.id +
    `)"><span></span><span></span></button>
                    </li>
                `;
  $(".list:last-child").after(reusltHtml);
}

function enterClick() {
  var code = window.event.keyCode;
  txt = document.getElementById("todoInput").value;

  if (code == 13 && txt != "") {
    addTodo(txt);
  }
}
function addBtnClick() {
  txt = document.getElementById("todoInput").value;
  console.log("텍스트 입력값 : ", txt);
  if (txt != "") {
    addTodo(txt);
  }
}

function deleteClick(num) {
  let todos = JSON.parse(localStorage.getItem("todos"));
  let lastNum = todos.todo.length;
  if (num + 1 == lastNum) {
    deleteTodoLastOne();
    console.log("마지막투두삭제");
  } else {
    deleteTodoById(num); // 선택된 todo 삭제
    console.log("마지막아닌거 삭제" + num);
  }

  //location.reload(); // 다른방법 뭐지.. 답변) 1.전체 dom 삭제 후 전체 리스트를  다시 그린다 ( 삭제가 완료되었을때)
  // 2. 해당하는 dom만삭제를 한다.  dom선택자로 id값에 해당하는 dom을 찾아서 remove
  $(".list:not(:first-child)").remove();
  getTodosListAll();
}
function deleteTodoById(selectedId) {
  // 선택된 아이디
  let todos = JSON.parse(localStorage.getItem("todos")); //데이터 불러오기
  // searchId = -1;

  for (let i = 0; i < todos.todo.length; i++) {
    // 전체 Todos 반복 돌면서
    if (selectedId === todos.todo[i].id) {
      // 찾으려는 아이디와 같다면 삭제
      todos.todo.splice(i, 1); // 1개 항목을 삭제
    }
  }
  localStorage.setItem("todos", JSON.stringify(todos)); //데이터 불러오기
}
function deleteTodoLastOne() {
  let todos = JSON.parse(localStorage.getItem("todos")); //데이터 불러오기
  todos.todo.splice(todos.todo.length - 1, 1);

  localStorage.setItem("todos", JSON.stringify(todos));
}

function checkClick(selectedId) {
  let todos = JSON.parse(localStorage.getItem("todos"));
  console.log("체크클릭");

  //=========================수정 ======================
  //선택된 todo를 찾기위해 전체 todos를 반복한다.
  for (let i = 0; i < todos.todo.length; i++) {
    if (todos.todo[i].id === selectedId) {
      console.log("클릭한투두찾기" + todos.todo[i].checked);
      if (todos.todo[i].checked == 0) {
        todos.todo[i].checked = 1;
        console.log("체크하기" + todos.todo[i].checked);
      } else {
        todos.todo[i].checked = 0;
        console.log("체크해제" + todos.todo[i].checked);
      }
      localStorage.setItem("todos", JSON.stringify(todos));

      break; // 해당하는 값 찾았으니 반복문 종료
    }
  }

  $(".list:not(:first-child)").remove();
  getTodosListAll();
}
