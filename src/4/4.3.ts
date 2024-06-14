/**
 * Discirmated Unions
 * Union 타입을 안전하게 좁히기 위한 방식
 */

// 에러 정의
type TextError = {
    errorCode: string;
    errorMessage: string;
};
type ToastError = {
    errorCode: string;
    errorMessage: string;
    toastShowDuration: number; // 토스트를 띄워줄 시간
};
type AlertError = {
    errorCode: string;
    errorMessage: string;
    onConfirm: () => void; // 얼럿 창의 확인 버튼을 누른 뒤 액션
};

// 구현부 : union type 활용
type ErrorFeedbackType = TextError | ToastError | AlertError;
const errorArr: ErrorFeedbackType[] = [
  { errorCode: "100", errorMessage: "텍스트 에러" },
  { errorCode: "200", errorMessage: "토스트 에러", toastShowDuration: 3000 },
  { errorCode: "300", errorMessage: "얼럿 에러", onConfirm: () => {} },
];
// 위처럼 형태따라 사용자가 잘 입력하면 몰라도, 사용자가 이상한 값을 넣어버리면 에러 발생해야함
// 그러나, JS의 덕 타이핑 언어 특성상, 임의로 추론해버려서 타입관련 에러가 안 나옴 -> 잠재적 위험 발생 확률 높아짐
const errorArr2: ErrorFeedbackType[] = [
    // ...
    {
        errorCode: "999",
        errorMessage: "잘못된 에러",
        toastShowDuration: 3000,
        onConfirm: () => {},
    }, // expected error
];

// 그래서 다음과 같이 "판별자"를 사용해서 유니온 타입을 확실하게 컴파일러가 식별할 수 있도록 만듦
// 다시 "선언부"
type TextError2 = {
    errorType: "TEXT";
    errorCode: string;
    errorMessage: string;
};
type ToastError2 = {
    errorType: "TOAST";
    errorCode: string;
    errorMessage: string;
    toastShowDuration: number;
}
type AlertError2 = {
    errorType: "ALERT";
    errorCode: string;
    errorMessage: string;
    onConfirm: () => void;
};

// "구현부"
type ErrorFeedbackType2 = TextError2 | ToastError2 | AlertError2;

const errorArr3: ErrorFeedbackType2[] = [
  { errorType: "TEXT", errorCode: "100", errorMessage: "텍스트 에러" },
  {
    errorType: "TOAST",
    errorCode: "200",
    errorMessage: "토스트 에러",
    toastShowDuration: 3000,
  },
  {
    errorType: "ALERT",
    errorCode: "300",
    errorMessage: "얼럿 에러",
    onConfirm: () => {},
  },
  {
    errorType: "TEXT",
    errorCode: "999",
    errorMessage: "잘못된 에러",
    // toastShowDuration: 3000,
    // onConfirm: () => {},
  },
  {
    errorType: "TOAST",
    errorCode: "210",
    errorMessage: "토스트 에러",
    toastShowDuration: 3000,
    // onConfirm: () => {},
  },
  {
    errorType: "ALERT",
    errorCode: "310",
    errorMessage: "얼럿 에러",
    onConfirm: () => {},
    // toastShowDuration: 5000,
  }
];


///////

// 예시
// 사용자 이벤트를 나타내는 인터페이스 정의
interface ClickEvent {
    type: "click";
    x: number;
    y: number;
}
interface KeyPressEvent {
    type: "keypress";
    key: string;
}
  
// 식별할 수 있는 유니온 타입 정의
type UserEvent = ClickEvent | KeyPressEvent;
// 유니온 타입을 사용하는 함수
function handleEvent(event: UserEvent) {
    switch (event.type) {
        case "click":
            console.log(`Click event at coordinates (${event.x}, ${event.y})`);
            break;
        case "keypress":
            console.log(`Key press event: key = ${event.key}`);
            break;
        default:
        // // 이 블록은 절대 실행되지 않음
        // const _exhaustiveCheck: never = event;
        // return _exhaustiveCheck;
    }
}
  
// 함수 호출 예시
handleEvent({ type: "click", x: 100, y: 200 });
handleEvent({ type: "keypress", key: "Enter" });
  