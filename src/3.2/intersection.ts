// 교집합(intersection) : 양쪽에 모두 할당할 수 있는 값만 남긴다
// https://fe-developers.kakaoent.com/2022/221124-typescript-tip/

// 1. 객체 타입일때의 교집합
// 두 타입의 속성을 모두 포함하는 새로운 타입을 생성 -> intersection 연산이긴 하지만, 합집합에 가까움
type ProductionItem = {
  id: number;
  name: string;
  type: string;
};
type ProductionItemWIthDiscount = ProductionItem & {
  discount: number;
};

const production1: ProductionItemWIthDiscount = {
  id: 1,
  name: "IPhone",
  type: "smartPhone",
  discount: 15,
};

// ------------------------------------------------------------
// 2. 리터럴 타입일때의 교집합
// 두 타입 모두에 할당할 수 있는 값을 찾음

// 유닛(Unit) type : 딱 하나의 원시값만 갖는 타입
type AdminType = "manager" | "enterprise";
type SlaveType = "employee" | "enterprise";

type EnterprisePeopleType = AdminType & SlaveType;
const enterpriseMember: EnterprisePeopleType = "enterprise";
