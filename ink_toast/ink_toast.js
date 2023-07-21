
// 토스트 설정
let toast_transform = 'top';
let toast_index_array = [];

// 값을 입력하여 위치값 조정(left, top, right, bottom)
function i_toast_setting(string) {
  return toast_transform = string;
}

// 토스트 위치 설정(초기화)
i_toast_setting('right');

function i_toast(msg, type = 'msg', transform = toast_transform) {
  f_toast(msg, type, transform);
}

// 토스트 컴포넌트 출력
function f_toast(msg, type = 'msg', transform = toast_transform) {
  const toast_msg_box = document.createElement('div');
  const transform_top = '20px';
  let before_toast_height = 0;
  let toast_margin = 12;

  // 토스트 컴포넌트 생성
  toast_msg_box.classList.add('toast_msg_box');
  toast_msg_box.classList.add('appear');
  toast_msg_box.innerHTML += '<p class="toast_msg">' + msg + '</p>';

  // 토스트 타입 설정
  switch (type) {
    case 'success':
      toast_msg_box.classList.add('success');
      break;
    case 'error':
      toast_msg_box.classList.add('error');
      break;
    case 'info':
      toast_msg_box.classList.add('info');
      break;
    case 'warning':
      toast_msg_box.classList.add('warning');
      break;
    default:
      // 기본은 MSG 취급
  }

  // 위치 값 설정
  toast_msg_box.style.position = 'fixed';
  toast_msg_box.style.zIndex = '99999';

  // 측면 출력 위치 값 판단
  switch (transform) {
    case 'left': // 좌측
      toast_msg_box.style.left = '20px';
      toast_msg_box.style.top = transform_top;
      break;
    case 'right': // 우측
      toast_msg_box.style.right = '20px';
      toast_msg_box.style.top = transform_top;
      break;
    case 'top': // 상단
      toast_msg_box.style.left = '50%';
      toast_msg_box.style.top = transform_top;
      toast_msg_box.style.transform = 'translate(-50%,0)';
      break;
    case 'bottom': // 하단
      toast_msg_box.style.left = '50%';
      toast_msg_box.style.bottom = transform_top;
      toast_msg_box.style.transform = 'translate(-50%,0)';
      break;
    default:
      // 기본은 top
      toast_msg_box.style.left = '50%';
      toast_msg_box.style.top = transform_top;
      toast_msg_box.style.transform = 'translate(-50%,0)';
      break;
  }

  // 출력 한 토스트를 배열에 입력
  toast_index_array.push(toast_msg_box);

  if (toast_index_array.indexOf(toast_msg_box) > 0) {
    // 선행 출력된 토스트의 배열 인덱스 값
    let before_toast_index = toast_index_array.indexOf(toast_msg_box) - 1;
    // 선행 출력된 토스트 상단 좌표 값 = top
    let before_toast_top = toast_index_array[before_toast_index].style.top;
    let before_toast_top_n = Number(before_toast_top.substr(0, before_toast_top.length - 2));
    // 선행 출력된 토스트 높이 값
    before_toast_height = toast_index_array[before_toast_index].offsetHeight;
    // 출력될 토스트의 좌표 값 입력
    toast_msg_box.style.top = before_toast_top_n + before_toast_height + toast_margin + 'px';
  }

  // 일정 시간 후에 사라지는 애니메이션
  setTimeout(function() {
    toast_msg_box.classList.add('disappear');
  }, 4800);

  // 일정 시간 후에 삭제
  setTimeout(function() {
    // 입력된 배열의 토스트를 삭제
    toast_index_array.splice(toast_index_array.indexOf(toast_msg_box), 1);

    // 토스트 재정렬
    toast_re_sort(before_toast_height, toast_margin);

    // 토스트 삭제
    toast_msg_box.remove();
  }, 5000);

  // 생성(출력)
  return document.querySelector('body').appendChild(toast_msg_box);
}

// 토스트 재정렬
function toast_re_sort(del_toast_height, toast_margin) {
  let toast_list = document.querySelectorAll('.toast_msg_box');

  // 전체 토스트 재정렬(top)
  for (var i = 0; i < toast_list.length; i++) {
    let toast_top = toast_list[i].style.top;

    // 샘플/테스트 제외
    if (!toast_list[i].classList.contains('test')) {
      if (del_toast_height == 0) {
        // 두 번째 토스트 올리기(첫 번째는 컴포넌트 생성 전, 높이 값을 불러오지 못함)
        toast_list[i].style.top = Number(toast_top.substr(0, toast_top.length - 2)) - toast_list[i].offsetHeight + 'px';
      } else {
        // 올리기
        toast_list[i].style.top = Number(toast_top.substr(0, toast_top.length - 2)) - Number(del_toast_height) - toast_margin + 'px';
      }
    }
  }
}

