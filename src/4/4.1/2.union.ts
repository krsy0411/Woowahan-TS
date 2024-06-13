// 타입확장 방법1 : <유니온 타입>

/**
 * 합집합 : 수학적인 접근 : A와 B의 내용을 모두 만족하는 집합
 * 그러나, 타입스크립트 관점 : A와 B 내용이 모두 될 수 있는 타입(집합)이다(= 여러 타입 중 하나). 라고 보는게 합리적이다
 * Q1)) 그렇다면 A|B는, 과연 A타입과 B타입 모두를 보유한 타입일까? 아니면 A타입이거나 B타입이거나 일까?
 */

interface CookingStep {
  orderId: string;
  price: number;
}

interface DeliveryStep {
  orderId: string;
  time: number;
  distance: string;
}

function getDeliveryDistance(step: CookingStep | DeliveryStep) {
  // return step.distance;

  /**
   * Q2)) 왜 안될까요?
   */
}