import { setupEventListeners } from "./eventManager";
import { createElement } from "./createElement";
import { normalizeVNode } from "./normalizeVNode";
import { updateElement } from "./updateElement";

/**
 * @param {any} vNode
 * @param {{ innerHTML: string; appendChild: (arg0: any) => void; _hasEventSetup: boolean; }} container
 * **"diff 알고리즘"**은 자바스크립트 프레임워크에서 DOM 업데이트를 최소화하기 위해 사용하는 핵심 기술이에요. 특히 React 같은 가상 DOM 기반 프레임워크에서 자주 등장해요.
 * DOM 조작은 비용이 매우 큰 작업이에요.
 * 페이지가 크거나, DOM 변경이 잦으면 성능 저하가 생겨요.
 * 그래서 React, Vue 같은 라이브러리들은 다음과 같이 처리하죠:
 * 변경 전 UI 구조를 가상 DOM(Virtual DOM) 으로 기억하고 있다가
 * 변경 후 UI와 비교(diff)
 * 실제 DOM에 차이점만 적용
 */
export function renderElement(vNode, container) {
  // console.log("vNode=>", vNode);
  // console.log("container=>", container?._vnode);
  // 최초 렌더링시에는 createElement로 DOM을 생성하고
  // 이후에는 updateElement로 기존 DOM을 업데이트한다.
  // 렌더링이 완료되면 container에 이벤트를 등록한다.

  // console.log("vNode typeOf=>", typeof vNode);
  // console.log("container=>", container);

  // 1. JSX → 정규화된 VNode로 변환
  const normalized = normalizeVNode(vNode);

  // 업데이트할 container 가 있을 때
  if (container?._vnode) {
    // console.log("container=>", container?._vnode);
    updateElement(container, normalized, container._vnode);
  } else {
    // 2. 정규화된 VNode → 실제 DOM 엘리먼트로 변환
    // const dom = createElement(normalized);
    // 3. 기존 콘텐츠 제거 후 새로 렌더링
    // container.innerHTML = "";
    // container.appendChild(dom);
    container.appendChild(createElement(normalized));
  }

  container._vnode = normalized;

  // 4. 이벤트 위임 설정 (최초 1회)
  if (!container._hasEventSetup) {
    setupEventListeners(container);
    container._hasEventSetup = true;
  }
}
