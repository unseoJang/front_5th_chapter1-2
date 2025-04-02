import { addEvent, removeEvent } from "./eventManager";
// import { removeEvent } from "./eventManager";
import { createElement } from "./createElement.js";

/**
 * 실제 DOM 요소(`target`)의 속성(attribute)을 업데이트한다.
 *
 * 주어진 새로운 속성(`originNewProps`)과 이전 속성(`originOldProps`)을 비교하여,
 * 변경되었거나 새로 추가된 속성은 DOM에 반영하고,
 * 더 이상 존재하지 않는 속성은 DOM에서 제거한다.
 *
 * 또한 JSX 호환을 위해 `className` 속성은 `class`로 변환 처리한다.
 * @param {HTMLElement} target - 업데이트 대상이 되는 실제 DOM 요소
 * @param {*} originNewProps - 새롭게 반영할 속성(props) 객체
 * @param {*} originOldProps - 이전 렌더링 시점의 속성(props) 객체
 */
function updateAttributes(target, originNewProps, originOldProps) {
  if (!target || target.nodeType !== 1) return; // ✅ 방어 코드 추가! 요소 노드가 아닐 경우 바로 리턴
  // 코드 내부에서 null, undefined로 처리 되지 않게 안전하게 처리
  const newProps = originNewProps || {};
  const oldProps = originOldProps || {};

  // ✅ JSX 호환: className → class 변환
  if ("className" in newProps) {
    newProps.class = newProps.className;
    delete newProps.className;
  }

  if (newProps.class !== oldProps.class) {
    target.className = newProps.class; // className 갱신
  }

  // 1️⃣ 새로운 props 순회: 추가되었거나 변경된 것 반영
  for (const [key, value] of Object.entries(newProps)) {
    if (value !== oldProps[key]) {
      if (key.startsWith("on")) {
        const eventType = key.toLowerCase().slice(2);
        addEvent(target, eventType, value); // 새로운 핸들러 등록
      } else {
        target.setAttribute(key, value); // setAttribute는 오직 노드 요소에만 적용 가능
        return;
      }
    }
  }

  // 2️⃣ 기존에 있었는데 새로운 데는 없는 것 제거
  for (const key of Object.keys(oldProps)) {
    if (!(key in newProps)) {
      if (key.startsWith("on")) {
        const eventType = key.toLowerCase().slice(2);
        removeEvent(target, eventType, oldProps[key]); // 업데이트 시에 해당 핸들러가 removeEvent()를 통해 제거
      } else {
        target.removeAttribute(key);
        return;
      }
    }
    return;
  }
}

/**
 * Virtual DOM diff 알고리즘의 핵심
 *
 * 가상 DOM(VNode)의 변경 사항을 실제 DOM에 반영하는 함수.
 *
 * 새로운 VNode(`newNode`)와 이전 VNode(`oldNode`)를 비교해서,
 * 실제 DOM(`parentElement`)을 효율적으로 업데이트 한다.
 *
 * 변경된 부분만 업데이트하고, 기존 DOM 노드를 최대한 재사용 하여 성능을 최적화 한다.
 * @param {HTMLElement} parentElement - 업데이트 대상이 되는 부모 DOM 요소
 * @param {Object|string|number} newNode - 새롭게 렌더링할 VNode (또는 문자열/숫자)
 * @param {Object|string|number} oldNode - 이전에 렌더링된 VNode (또는 문자열/숫자)
 * @param {number} [index=0] - 부모의 자식 중 몇 번쨰 노드인지 나타내는 인덱스 (재귀에서 사용됨)
 * @returns {void}
 */
export function updateElement(parentElement, newNode, oldNode, index = 0) {
  if (!parentElement) return; // ✅ 방어 코드 추가
  // 1️⃣ 부모 요소에서 현재 index 번째 자식 노드를 가져온다
  const existingElement = parentElement.childNodes[index];

  // 2️⃣ oldNode가 없으면 → 새 노드 추가
  if (!oldNode) {
    // 기존 노드와 동일한 경우는 추가하지 않도록 방어 코드 추가
    if (existingElement && newNode === oldNode) {
      return; // 기존과 동일한 노드는 추가하지 않는다
    }
    parentElement.appendChild(createElement(newNode));
    return;
  }

  // 3️⃣ newNode가 없으면 → 기존 노드 제거
  if (!newNode) {
    // console.log("bbbbbb");
    // ✅ 이 시점에서 이벤트도 제거
    if (existingElement) {
      parentElement.removeChild(existingElement);
      return;
    }
    return;
  }

  // 4️⃣ 태그 이름이 다르면 → 새로 교체
  if (newNode.type !== oldNode?.type) {
    parentElement.replaceChild(createElement(newNode), existingElement);
    return;
  }

  // 5️⃣ 텍스트 노드일 경우 → 내용 비교
  if (typeof newNode === "string" || typeof newNode === "number") {
    if (newNode !== oldNode) {
      existingElement.textContent = String(newNode);
    }

    return;
  }

  // 6️⃣ props가 달라졌는지 확인하고 DOM 속성 업데이트
  if (existingElement instanceof HTMLElement) {
    // 새로운 props와 이전 props를 비교하여 변경되었는지 확인
    // const arePropsDifferent = Object.entries(newProps).some(
    //   ([key, value]) => value !== oldProps[key],
    // );
    // console.log("arePropsDifferent==>", arePropsDifferent);

    updateAttributes(existingElement, newNode.props, oldNode.props);
  }

  // 7️⃣ 자식 노드 비교 (재귀 호출)
  const newChildren = newNode.children || [];
  const oldChildren = oldNode.children || [];
  const maxLength = Math.max(newChildren.length, oldChildren.length);

  // newChildren, oldChildren 의 갯수가 끝날떄까지 for문 처리
  for (let i = 0; i < maxLength; i++) {
    if (existingElement instanceof HTMLElement) {
      updateElement(existingElement, newChildren[i], oldChildren[i], i);
    }
  }
}
