// map: 다른 타입을 기반으로 한 타입을 선언할때 사용 -> 보통 index-signature 문법과 함께 자주 사용되는듯?
// [key: K]: T 형식

interface Obj {
  prop1: string;
  prop2: string;
}

type ChangeType<T> = {
  [K in keyof T]: number;
};

type Result = ChangeType<Obj>;
/*
{ 
   prop1: number; 
   prop2: number; 
}
*/

// ------------------------------------------------------------

type ReadOnlyEx = {
  readonly a: number;
  readonly b: string;
};
type CreateMutable<T> = {
  // -readonly 명령어 : 읽기 전용 속성을 수정가능하도록 만들기
  -readonly [Property in keyof T]: T[Property];
};
// 이러면 이제 ResultType(객체 타입)은, ReaonlyEx 타입과 속성은 동일하지만, 더이상 읽기 전용 속성은 아님
type ResultType = CreateMutable<ReadOnlyEx>;

// { a: number; b: string }

type OptionalEx = {
  a?: number;
  b?: string;
  c: boolean;
};
type Concrete<T> = {
  [Property in keyof T]-?: T[Property];
};

// 옵셔널 수식어를 제거
type ResultType2 = Concrete<OptionalEx>;
// { a: number; b: string; c: boolean }

// ------------------------------------------------------------
