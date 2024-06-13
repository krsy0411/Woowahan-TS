/**
 * 자바스크립트 연산자를 사용한 타입 가드
 * 
 * typeof, instanceof, in : "제어문"으로, 특정 타입 값을 가질 수 밖에 없는 상황을 유도
 * 사용 이유 : "런타임"에 유효한 타입 가드를 만들기 위해서 === 자바스크립트에서도 사용할 수 있는 문법
 */


/**
 * 방법1 : typeof 연산자 : 원시타입 추론용
 * 자바스크립트 동작방식으로 인한, null, 배열은 object 타입으로 나오는만큼, 약간씩 주의해야할 부분이 존재 -> 원시타입을 좁히는 용도로만 사용할 것을 권장
 * 원시타입이란? : 변경 불가능하며(pass by value) 값을 복사하여 전달하는 형태 : 원시 타입 변수를 수정하면 새로운 값이 할당되고, 기존 값은 변경되지 않습니다
 * js에서의 원시타입 종류는? : string, number, boolean, undefined, null, symbol
 */

console.log(typeof "hello"); // string
console.log(typeof 111); // number
console.log(typeof true); // boolean
console.log(typeof undefined); // undefined
console.log(
  typeof function () {
    return true;
  },
); // function
console.log(typeof [1,1,1]); // object
console.log(typeof null); // object
console.log(typeof {}); // object
console.log(typeof BigInt(9007199254740991)); // bigint
console.log(typeof Symbol("foo")); // symbol

// 예시
const replaceHyphen: (date: string | Date) => string | Date = (date) => {
    if (typeof date === "string") {
    // 이 분기에서는 date의 타입이 string으로 추론된다
    return date.replace(/-/g, "/");
    }

    return date;
};

///////////////////////////////////////////////////////////////////////////////////////////

/**
 * 방법2 : instanceof 연산자 : 인스턴스화된 객체 타입을 판별할때
 * 
 */
interface Range {
    start: Date;
    end: Date;
}

function convertToRange(selected?: Date | Range): Range | undefined {
    // 타입 단언 : 해당 값이 정확히 예상하는 타입을 만족한다고 확신할 때만 사용해야 한다
    return selected instanceof Date ? { start: selected, end: selected } as Range : selected;
}

///////////////////////////////////////////////////////////////////////////////////////////

/**
 * 방법3 : in 연산자 : 객체의 속성이 있는지 없는지 유무 판별할때
 */

interface BasicNoticeDialogProps {
    noticeTitle: string;
    noticeBody: string;
}
  
interface NoticeDialogWithCookieProps extends BasicNoticeDialogProps {
    cookieKey: string;
    noForADay?: boolean;
    neverAgain?: boolean;
}
  
export type NoticeDialogProps =
    | BasicNoticeDialogProps
    | NoticeDialogWithCookieProps;

// const NoticeDialog: React.FC<NoticeDialogProps> = (props) => {
//     if ("cookieKey" in props) return <NoticeDialogWithCookie {...props} />; // NoticeDialogWithCookieProps 타입
//     return <NoticeDialogBase {...props} />; // BasicNoticeDialogProps 타입
// };

/**
 * JS에서의 in 연산자 : 런타임의 "값"만을 검사
 * 하지만, TS에서의 in 연산자 : 객체 타입에 속성이 존재하는지를 검사
 * 또한, 여러 객체 타입을 Union 타입으로 가지고 있을때, in 연산자를 통해 속성의 유무에 따라 조건 분기를 할 수 있음
 */

interface Person {
    name: string;
    age: number;
}

interface Policeman extends Person {
    position?: string;
    year: number;
}

interface Student extends Person {
    major?: string;
    teacherName: string;
}

type UnionExample = Person | Policeman | Student;

// Student, Policeman은 집합 관계상, Person의 부분집합에 속하기 대문에, return타입이 Person이여도 오류X
function testExample(man: UnionExample): Person {
    if("major" in man) {
        delete man.major;
    } else if("position" in man) {
        delete man.position;
    }


    return man;
}