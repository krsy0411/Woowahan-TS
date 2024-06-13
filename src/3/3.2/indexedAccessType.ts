// T[K] 형식을 사용하여, 타입 T에서 키 K의 타입을 추출

// 1. 다른 타입의 특정 속성이 갖는 타입을 조회하기 위해
type Example = {
  a: number;
  b: string;
  c: boolean;
};

// 이런 식으로, 다른 타입의 특정 속성이 지닌 타입을 조회
type IndexAccess1 = Example["a"]; // number
type IndexAccess2 = Example["b"]; // string
type IndexAccess2_5 = Example["a" | "b"]; // number | string

// keyof 연산자 : "객체 타입"의 key(속성)들을 "유니언 타입"으로 반환
// 이 경우엔 -> keyof Example = "a" | "b" | "c"
type IndexAccess3 = Example[keyof Example];
type IndexAccess3_5 = Example["a" | "b" | "c"];

// ------------------------------------------------------------

// 2. 배열의 요소 타입을 조회하기 위해
const PromotionList = [
  {
    type: "product",
    name: "chicken",
  },
  {
    type: "product",
    name: "pizza",
    age: 1
  },
  {
    type: "card",
    name: "cheer-up",
  },
];

type PromotionListValueType = (typeof PromotionList)[number];