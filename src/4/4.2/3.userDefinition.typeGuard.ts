/**
 * 사용자 정의 타입 가드
 * 사용자가 직접 어떤 타입으로 값을 좁힐지를 직접 지정하는 방식
 */

interface Cat {
    type: "cat";
    meow: () => void;
}
  
interface Dog {
    type: "dog";
    bark: () => void;
}
  
interface Bird {
    type: "bird";
    fly: () => void;
}

// Union type : "식별할 수 있는 유니온"을 위해 판별자 사용 : Union type에 대한 타입 좁히기를 사용할 때
type Animal = Cat | Dog | Bird;
  
// 커스텀 타입 가드 정의
function isCat(animal: Animal): animal is Cat {
    return animal.type === "cat";
}
  
function isDog(animal: Animal): animal is Dog {
    return animal.type === "dog";
}
  
function isBird(animal: Animal): animal is Bird {
    return animal.type === "bird";
}
  
// Animal 타입을 받아서 특정 타입으로 좁히는 함수
function makeSound(animal: Animal) {
    if (isCat(animal)) {
        animal.meow();
    } else if (isDog(animal)) {
        animal.bark();
    } else if (isBird(animal)) {
        animal.fly();
    } else {
        // 모든 케이스가 처리되었는지 확인 (exhaustiveness 체크)
        const _exhaustiveCheck: never = animal;
        return _exhaustiveCheck;
    }
}
  
// 예제 동물 객체들
const myCat: Cat = { type: "cat", meow: () => console.log("Meow!") };
const myDog: Dog = { type: "dog", bark: () => console.log("Bark!") };
const myBird: Bird = { type: "bird", fly: () => console.log("Fly!") };
  
// 함수 호출
makeSound(myCat); // Meow!
makeSound(myDog); // Bark!
makeSound(myBird); // Fly!