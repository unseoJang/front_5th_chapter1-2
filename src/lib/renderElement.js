import { setupEventListeners } from "./eventManager";
import { createElement } from "./createElement";
import { normalizeVNode } from "./normalizeVNode";
import { updateElement } from "./updateElement";

// 가상 DOM을 실제 DOM으로 렌더링
export function renderElement(vNode, container) {
  /**
   *  최초 렌더링시에는 createElement로 DOM을 생성하고
   * 이후에는 updateElement로 기존 DOM을 업데이트한다.
   * 렌더링이 완료되면 container에 이벤트를 등록한다.
   */

  // 가상 DOM 정규화
  const normalizedVNode = normalizeVNode(vNode);
  const oldVNode = container._vNode;

  if (!oldVNode) {
    // 최초 렌더링
    const $el = createElement(normalizedVNode);
    container.appendChild($el);
    setupEventListeners(container);
  } else {
    // 업데이트 렌더링
    updateElement(container, normalizedVNode, oldVNode);
  }

  // 현재 상태 저장
  container._vNode = normalizedVNode;
}
