const eventStore = new Map(); // 내부 이벤트 저장소 만들기 구조: element → { click: [handler1, handler2], input: [...] }

/**
 * 이벤트 리스너 설정
 * @param {*} root // 루트 엘리먼트
 * @description 이벤트 위임을 사용하여 루트 엘리먼트에 클릭 이벤트 리스너를 설정합니다.
 * 이벤트가 발생하면 가장 가까운 상위 요소에서 해당 이벤트를 찾아 실행합니다.
 **/
export function setupEventListeners(root) {
  root.addEventListener("click", (e) => {
    let target = e.target;

    while (target && target !== root) {
      const events = eventStore.get(target);
      const handlers = events?.["click"];

      if (handlers) {
        handlers.forEach((fn) => fn(e));
        break; // 가장 가까운 한 요소만 실행 (React 스타일)
      }

      target = target.parentNode;
    }
  });
}

export function addEvent(element, eventType, handler) {
  if (!eventStore.has(element)) {
    eventStore.set(element, {});
  }

  const events = eventStore.get(element);

  if (!events[eventType]) {
    events[eventType] = [];
  }

  events[eventType].push(handler);
}

/**
 * 이벤트 리스너 제거
 * @param {*} element // 이벤트를 제거할 엘리먼트
 * @param {*} eventType // 제거할 이벤트 타입 (예: 'click', 'input')
 * @param {*} handler // 제거할 핸들러 함수
 * @returns
 */
export function removeEvent(element, eventType, handler) {
  const events = eventStore.get(element);
  if (!events || !events[eventType]) return;

  // 해당 핸들러만 필터링
  events[eventType] = events[eventType].filter((fn) => fn !== handler);

  // 더 이상 등록된 핸들러가 없다면 정리
  if (events[eventType].length === 0) {
    delete events[eventType];
  }

  // 해당 element에 어떤 이벤트도 없다면 전체 제거
  if (Object.keys(events).length === 0) {
    eventStore.delete(element);
  }
}
