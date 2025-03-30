import { getTypes } from "../utils/getTypes";
import { addEvent } from "./eventManager";

export function createElement(vNode) {
  const vNodeType = getTypes(vNode);
  const invalidTypes = ["null", "undefined", "boolean"];

  if (invalidTypes.includes(vNodeType)) {
    return document.createTextNode("");
  }

  const textNodeTypes = ["string", "number"];

  if (textNodeTypes.includes(vNodeType)) {
    // 문자열이나 숫자 타입인 경우
    return document.createTextNode(vNode);
  }

  // 배열 입력에 대해 DocumentFragment를 생성해야 한다, 먼저 배열 체크
  if (Array.isArray(vNode)) {
    const flagment = document.createDocumentFragment();
    flagment.append(...vNode.map(createElement));
    return flagment;
  }

  // 컴포넌트를 정규화한 다음에 createElement로 생성할 수 있다.
  const el = document.createElement(vNode.type);
  updateAttributes(el, vNode.props);

  // 자식 노드 처리
  if (vNode.children && Array.isArray(vNode.children)) {
    vNode.children.forEach((child) => {
      el.appendChild(createElement(child));
    });
  }

  return el;
}

/**
 * 속성 업데이트
 * 이 함수는 **가상 DOM 노드의 속성(props)**을 받아서
 * 실제 DOM 엘리먼트($el)에 속성을 적용해주는 함수
 * @param { } $el
 * @param {*} props
 */
function updateAttributes($el, props) {
  if (props) {
    Object.entries(props).forEach(([key, value]) => {
      if (key.startsWith("on")) {
        // 🔸 key가 "onClick", "onInput" 같은 이벤트면
        const eventName = key.slice(2).toLowerCase(); // "Click" → "click"
        addEvent($el, eventName, value); // 이벤트 등록
      } else if (key === "className") {
        // 🔸 React/JSX에서의 className → 실제 DOM에선 class
        $el.setAttribute("class", value);
      } else {
        // 🔸 나머지는 그대로 DOM 속성으로 적용
        $el.setAttribute(key, value);
      }
    });
  }
}
