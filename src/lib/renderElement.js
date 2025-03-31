import { setupEventListeners } from "./eventManager";
import { createElement } from "./createElement";
import { normalizeVNode } from "./normalizeVNode";
// import { updateElement } from "./updateElement";

/**
 * @param {any} vNode
 * @param {{ innerHTML: string; appendChild: (arg0: any) => void; _hasEventSetup: boolean; }} container
 */
export function renderElement(vNode, container) {
  // console.log("vNode=>", vNode);
  // console.log("container=>", container);
  // 최초 렌더링시에는 createElement로 DOM을 생성하고
  // 이후에는 updateElement로 기존 DOM을 업데이트한다.
  // 렌더링이 완료되면 container에 이벤트를 등록한다.

  // console.log("vNode typeOf=>", typeof vNode);

  // 1. JSX → 정규화된 VNode로 변환
  const normalized = normalizeVNode(vNode);

  // 2. 정규화된 VNode → 실제 DOM 엘리먼트로 변환
  const dom = createElement(normalized);

  // 3. 기존 콘텐츠 제거 후 새로 렌더링
  container.innerHTML = "";
  container.appendChild(dom);

  // 4. 이벤트 위임 설정 (최초 1회)
  if (!container._hasEventSetup) {
    setupEventListeners(container);
    container._hasEventSetup = true;
  }
}
