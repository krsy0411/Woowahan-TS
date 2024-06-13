// 문자열 리터럴 타입 선언

type Stage = "init" | "select-image" | "edit-image";

type StageNames = `${Stage}-stage`;
// 'init-stage' | 'select-stage' | 'edit-stage'

// --------------------------------------------------------

// 의문 : 그럼 여러 개의 UnionType을 활용하는 경우는?
type ExtraStage = "decorate-card" | "capture-image" | "upload-image";

type ExtraStageNames = `${Stage}-With-${ExtraStage}-stage`;
// 'init-With-decorate-card-stage' | 'init-With-capture-image-stage' | ... -> 총 9가지 경우의 타입들이 완성

// --------------------------------------------------------

// 추가 예시
// https://toss.tech/article/template-literal-types
type EventNames = "click" | "doubleClick" | "mouseDown" | "mouseUp";

type MyElement = {
  addEventListener(eventName: EventNames, handler: (e: Event) => void): void;

  // 문제점 : onEvent() 도 하나씩 추가해줘야 한다
  onClick(e: Event): void;
  onDoubleClick(e: Event): void;
  onMouseDown(e: Event): void;
  onMouseUp(e: Event): void;
  // 나머지들을 내가 이벤트가 생길때마다 일일이 작성해야함 : on"..."형태로
};

// 개선해볼만한 점 : template-literal과 index-signature를 이용해서 EventNames에 타입만 하나 더 추가해주면 알아서 두 가지 방식의 eventhandler 처리 가능

// 두 가지 방법 모두 사용할 수 있는 경우를 말하는 겁니다
// element.addEventListener('click', () => alert('I am clicked!'));
// element.onClick = () => alert('I am clicked!');

// 내장된 String Manipulation Types : https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html
// 'Click' | 'DoubleClick' | ...;
type CapitalizedEventNames = Capitalize<EventNames>;

// 'onClick' | 'onDoubleClick' | 'onMouseDown' | 'onMouseUp';
type HandlerNames = `on${CapitalizedEventNames}`;

type Handlers = {
  [H in HandlerNames]: (event: Event) => void;
};

// 원래 MyElement 그대로 작동! : 좀 더 개선된 버전
type MyElementUpgradeVersion = Handlers & {
  addEventListener: (
    eventName: EventNames,
    handler: (event: Event) => void,
  ) => void;
};
