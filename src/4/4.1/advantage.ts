// <타입 확장의 장점>

/**
 * 메뉴 요소 타입
 * 메뉴 이름, 이미지, 할인율, 재고 정보를 담고 있다
 * */
interface BaseMenuItem {
  itemName: string | null;
  itemImageUrl: string | null;
  itemDiscountAmount: number;
  stock: number | null;
}

/**
 * 장바구니 요소 타입
 * 메뉴 타입에 수량 정보가 추가되었다
 */
interface BaseCartItem extends BaseMenuItem {
  // BaseMenuItem의 모든 타입을 가지면서, quantity 타입을 추가함.
  quantity: number;
}

/**
 * 수정할 수 있는 장바구니 요소 타입
 * 품절 여부, 수정할 수 있는 옵션 배열 정보가 추가되었다
 */
interface EditableCartItem extends BaseCartItem {
  isSoldOut: boolean;
  optionGroups: SelectableOptionGroup[];
}

/**
 * 이벤트 장바구니 요소 타입
 * 주문 가능 여부에 대한 정보가 추가되었다
 */
interface EventCartItem extends BaseCartItem {
  orderable: boolean;
}
