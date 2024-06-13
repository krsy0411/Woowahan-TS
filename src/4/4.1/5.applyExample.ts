/**
 * 기존에 존재하는 타입이 있을때
 * 만약 새로운 요구사항이 들어와서, 기존 타입에 추가적으로 붙어야할 속성들이 생겼다면 어떻게 해야할까?
 */

interface Menu {
    name: string;
    image: string;
}

/**
 * 1. gif 파일이 재생되는 객체 필요
 * 2. 이미지 대신 별도의 텍스트를 보여주는 객체 필요
 * 
 * 해당 2가지에 대해서도 타입 선언을 해줘야하게 생겼다
 * 이럴때, 방법은 2가지
 * 
 * 1. 기존 타입에 속성을 추가
 * 2. 타입 확장 활용
 */

// 1. 기존 타입에 속성을 추가하는 경우
interface MenuVersion1 {
    name: string;
    image: string;
    gif?: string;
    text?: string;
}

// 2. 타입 확장 활용
interface SpecialMenu extends Menu {
    gif: string;
}
interface PackageMenu extends Menu {
    text: string;
}

// 여기까지 "선언부"
/////////////////////////////////////////////
// 여기부턴 "구현부"

// 방법1 : 하나의 타입에 여러 속성을 계속 추가
const menuListList: MenuVersion1[] = [
    {
        name: "찜",
        image: "찜.png"
    },
    {
        name: "찌개",
        image: "찌개.png"
    },
    {
        name: "회",
        image: "회.png"
    }
];
const specialMenuList: MenuVersion1[] = [
    {
        name: "돈까스",
        image: "돈까스.png",
        gif: "돈까스.gif"
    },
    {
        name: "피자",
        image: "피자.png",
        gif: "피자.gif"
    }
];
const PackageMenuList: MenuVersion1[] = [
    {
        name: "1인분",
        image: "1인분.png",
        text: "1인 가구 맞춤형"
    },    
    {
        name: "족발",
        image: "족발.png",
        text: "오늘은 족발로 결정"
    }
];

// 근데 각 객체에 타입할당까진 잘 해줘도, 방법1의 경우에서 문제가 생기는 부분은 다음과 같다
specialMenuList.map(menu => menu.text); // 컴파일 결과는 string | undefined : 실제로 text라는 속성은 없음 -> 런타임 에러 발생