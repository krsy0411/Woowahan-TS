/**
 * 타입확장 방법 2 : 교차타입
 * 기존 타입을 합쳐, 필요한 모든 기능을 가진 하나의 타입을 만드는 것
 *
 * 유니온 타입과 다른점 : 모든 타입 속성을 갖는 "하나의 타입(단일 타입)"을 생성
 */

interface CookingStep {
  orderId: string;
  time: number;
  price: number; // DeliveryStep에는 포함되지 않는 속성
}

interface DeliveryStep {
  orderId: string;
  time: number;
  distance: string; // CookingStep에는 포함되지 않는 속성
}

type BaedalProgress = CookingStep & DeliveryStep;

function logBaedalInfo(progress: BaedalProgress) {
  console.log(`주문 금액: ${progress.price}`);
  console.log(`배달 거리: ${progress.distance}`);
  /**
   * 오히려 교차타입이 유니온 타입에 비해, 수학적 개념으로 보면 합집합에 가깝다.
   * ts의 관점으로 보자면, "특정 속성을 모두 만족하는 타입"이라고 봐야 맞다.
   */
}

// // 그럼 유니온 타입으로 비교해봅시다
type BaedalProcessUnion = CookingStep | DeliveryStep;

function logBaedalInfoUnion(progress: BaedalProcessUnion) {
  /**
   * Q) 과연 progress.distance는 정상적으로 컴파일이 될까요?
   */
  
  // console.log(`배달 거리: ${progress.distance}`);
}

////////////////////////////////////////////////////////////////////
// 다른 예시를 봅시다

/* 배달 팁 */
interface DeliveryTip {
  tip: string;
  }
/* 별점 */
interface StarRating {
  rate: number;
}
/* 주문 필터 */
type Filter = DeliveryTip & StarRating;

/**
 * 교차타입 ; 교집합 : 공통된 속성이 없음에도 가능한 이유이다.
 * 즉, TS에서의 교집합은, "값의 집합"으로 해석해야하며, "특정 속성을 모두 만족하는 타입"이라고 봐야한다
 */
const filter: Filter = {
  tip: "1000원 이하",
  rate: 4,
};