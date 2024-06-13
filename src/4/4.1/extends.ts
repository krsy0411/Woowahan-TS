/**
 * 타입확장 방법 2 : 교차타입
 * 기존 타입을 합쳐, 필요한 모든 기능을 가진 하나의 타입을 만드는 것
 *
 * 유니온 타입과 다른점 : 모든 타입 속성을 갖는 "하나의 타입(단일 타입)"을 생성
 */

interface CookingStep {
  orderId: string;
  time: number;
  price: number;
}

interface DeliveryStep {
  orderId: string;
  time: number;
  distance: string;
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
// interface BaedalProcessUnion = CookingStep | DeliveryStep;

// function logBaedalInfoUnion(progress: BaedalProcessUnion) {
//   console.log(`배달 거리: ${progress.distance}`);
// }
