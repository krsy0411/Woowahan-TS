// 인덱스 시그니처 : 어떤 특정 타입의 속성 이름은 몰라도, 속성값의 타입은 알때
// interface 내부에 [Key: K]: T 형태로 타입을 명시 : 해당하는 타입의 속성키는 모두 K 타입이며, 속성값은 모두 T타입임을 명시
interface IndexSignatureEx {
  [key: string]: number | boolean;
}

// 인덱스 시그니처를 선언한 타입에게는 추가로 다른 속성을 명시 가능하지만,
// 이렇게 인덱스 시그니처에 포함되지 않는 타입에 대해서는 에러 발생
interface IndexSignatureEx2 extends IndexSignatureEx {
  length: number;
  isValid: boolean;
  // name: string;
}

// 이렇게 굳이 명시적으로 더 속성을 적을거면, 왜 인덱스 시그니처를 사용할까?
// 답 : 특정 타입의 속성 이름을 모르니까!
const someThing2: IndexSignatureEx2 = {
  id: 3,
  isOkay: true,
  age: 5,
  name: 12314,
  // 아래 두 속성의 경우, 무조건 존재해야함
  length: 2000,
  isValid: true,
};
const someThing3: IndexSignatureEx2 = {
  age: 7,
  // 아래 두 속성의 경우, 무조건 존재해야함
  length: 3000,
  isValid: false,
};

// 또는 이렇게도 동적으로 속성 키가 결정되는 경우에도 유용
type User = {
  name: string;
  age: number;
};
interface UserDictionary {
  [key: string]: User;
}

// 변수에 동적으로 데이터 생성할때
const userDictionary: UserDictionary = {
  lsy: {
    name: "LEE SIYOUNG",
    age: 25,
  },
  kjy: {
    name: "KIM JIYOUNG",
    age: 29,
  },
  // 아래에 동적으로 추가 가능
};
