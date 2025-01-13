// 화살표 함수로 변경
$(document).ready(() => {
  // 시작시 리스트의 모든 항목을 불러오는 함수 호출
  getTodosListAll();

  // input태그 엔터 이벤트 등록
  let input = $("#todoInput");
  input.keyup((event) => {
    // 브라우저에서 입력중 상태를 감지하는 조건
    if (event.isComposing || event.keyCode === 229) {
      // 한글 조합중일경우 이벤트를 발생하지 않고 반환
      return;
    }
    // enter 이벤트가 발생하거나 Input의 값이 존재할때 실행
    if (event.key === "Enter" && input.val()) {
      // addTodo 함수 호출
      addTodo(input.val());
      // input안의 값을 지움
      input.val("");
    }
  });
});

// todos 변수를 전역으로 선언
let todos;
/**
 * 투두 element 생성
 * @param {Object} todo
 */
const todoComponent = (todo) => {
  // li태그 생성
  let list = $("<li>", {
    class: "list",
    id: todo.id,
  });

  // 체크박스 생성
  let checkBox = $("<div>", {
    class: "check",
    id: "chk",
    name: "ck",
  });
  // 체크박스 이벤트 등록
  checkBox.click(() => checkClick(todo.id));

  //콘텐츠가 들어갈 p태그 생성
  let content = $("<p>", {
    class: "cont",
    text: todo.content,
  });

  // 버튼 생성
  let button = $("<button>", {
    type: "button",
    class: "delete",
    id: "delete",
  });
  // 버튼 이벤트 등록
  button.click(() => deleteClick(todo.id));

  // list에 각 항목을 순서대로 삽입
  list.append(checkBox);
  list.append(content);
  list.append(button);
  // 생성된 항목을 마지막 순서에 넣기
  $(".list:last-child").after(list);
};

// 전체 todo가져오기
function getTodosListAll() {
  // 로컬스토리지에 todos의 데이터를 가져오고 없으면 빈배열 할당
  todos = JSON.parse(localStorage.getItem("todos")) ?? [];

  // ul태그 선택
  let ul = $(".todo_list");
  // ul태그 안의 내용 전부 비우기
  ul.empty();
  // ul태그에 빈 li태그 넣기
  ul.append(
    $("<li>", {
      class: "list",
    })
  );
  // todos의 길이만큼 반복
  todos.forEach((item) => todoComponent(item));
}

function addTodo(txt) {
  console.log(txt);

  // 새로운 todo 항목 생성
  let todo = {
    id: Date.now(), // 현재시간 기준으로 저장
    checked: false, // 0: false , 1: true
    content: txt,
  };

  // todos에 새로만든 todo 저장
  todos.push(todo);
  // todos를 로컬스토리지에 저장
  localStorage.setItem("todos", JSON.stringify(todos));

  //글 불러오기
  getTodosListAll();
}

function addBtnClick() {
  console.log("call addBtnClick");
  let input = $("#todoInput");
  console.log("텍스트 입력값 : ", input.val());
  input.val() && addTodo(input.val());
  input.val("");
}

function deleteClick(num) {
  deleteTodoById(num); // 선택된 todo 삭제
  $(`#${num}`).remove(); // 선택된 id에 해당하는 태그 삭제
  getTodosListAll(); // 리스트 불러오기
}

function deleteTodoById(selectedId) {
  // 선택된 id를 제외한 모든 요소를 새로운 배열로 반환
  let newTodo = todos.filter((item) => item.id !== selectedId);

  // 반환된 배열을 로컬스토리지에 저장
  localStorage.setItem("todos", JSON.stringify(newTodo));
}

function checkClick(selectedId) {
  console.log("체크클릭");
  let checkedTodo = todos.find((item) => item.id === selectedId);
  checkedTodo.checked = !checkedTodo.checked;
  todos.sort((a, b) => a - b);

  localStorage.setItem("todos", JSON.stringify(todos));
  $(".list:not(:first-child)").remove();
  getTodosListAll();
}
