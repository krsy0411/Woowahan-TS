// UnionType(합집합) : OR 타입 : A or B
type Adult = "20세 이상";
type Child = "19세 이하";

type isAdult = Adult | Child;
const check: isAdult = "20세 이상";

// 주의사항
type CardItem = {
  id: number;
  name: string;
  type: string;
};
type ProductItem = {
  id: number;
  name: string;
  type: string;
  quantity: number;
};

type InSaleItemsType = CardItem | ProductItem;

// 주의사항 : 합집합 -> 공통집합(교집합) 부분만 속성으로 접근 가능
const printItem = (item: InSaleItemsType) => {
  console.log(item.name);
  // if (typeof item == ProductItem) {
  //   console.log(item.quantity);
  // }
};
