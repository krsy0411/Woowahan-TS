type Generative = {
  one: string;
  two: number;
  three: string;
};

const someThing: Generative = {
  one: "Lee",
  two: 25,
  three: "SiYoung",
};

// ts의 컴파일타임일 때의 typeof 연산자
const version2: typeof someThing = {
  one: "Kim",
  two: 26,
  three: "JiYoung",
};

// js의 런타임일 때의 typeof 연산자
console.log(typeof someThing);
