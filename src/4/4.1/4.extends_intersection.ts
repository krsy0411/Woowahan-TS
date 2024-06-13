/**
 * 타입확장 방법 3 : extends
 * extends를 통한 타입 확장과, & 통한 타입 확장은, 같은 의미를 지닌다 : 둘 다 "교차타입"!!
 * 그러니 타입확장은, "유니온 타입" or "교차 타입(&)" or "확장 및 상속(extends 키워드)"
 * */ 

// extends 키워드를 통한 타입 확장은 다음과 같이 작성 : interface
interface BaseMenuItem {
    itemName: string | null;
    itemImageUrl: string | null;
    itemDiscountAmount: number;
    stock: number | null;
}
  
interface BaseCartItem extends BaseMenuItem {
    quantity: number;
}

// 유니온 타입과 교차타입 : type 키워드를 사용해서 타입 확장(interface 키워드는 X)
type BaseMenuItem2 = {
    itemName: string | null;
    itemImageUrl: string | null;
    itemDiscountAmount: number;
    stock: number | null;
};
  
type BaseCartItem2 = {
    quantity: number;
} & BaseMenuItem;
  
const baseCartItem: BaseCartItem2 = {
    itemName: "지은이네 떡볶이",
    itemImageUrl: "https://www.woowahan.com/images/jieun-tteokbokkio.png",
    itemDiscountAmount: 2000,
    stock: 100,
    quantity: 2,
};

/**
 * Q) 그렇다면, extends키워드와 &연산자를 통한 타입확장은, 어떤 차이가 있을까요?
 * 
 */

///////////////////////////////////////////////////////////////////////////

/**
 * 주의할 점 : extends 키워드를 사용한 타입이, 교차 타입과 100% 호환(상응)되는 건 아니다
 */

// extends키워드를 사용한 예
interface DeliveryTip2 {
  tip: number;
}

interface Filter2 extends DeliveryTip2 {
    /**
     * extends키워드를 통한 확장은, 의미 그대로, DeliveryTip2 type으로부터 상속된 부분집합이다보니, 이미 DeliverTip2의 속성은 tip에 대한 속성을 알고 있음
     * 그래서 서로 충돌이 발생함
     */
//   tip: string;
}

// 교차타입으로 작성한 예
type DeliveryTip3 = {
    tip: number;
};
  
type Filter3 = DeliveryTip3 & {
    tip: string;
};

// const exampleFilter3: Filter3 = {
//     /**
//      * 결과는? "never"
//      * 이게 의미하는 바는? : 확장 과정에서 중복되는 속성값이 있음에도, 에러가 나지는 않음
//      * 이유는 : 새롭게 추가되는 속성에 대해 컴파일러는 미리 알고 있지 못 함(상속처럼)
//      */

//     tip: ""
// }