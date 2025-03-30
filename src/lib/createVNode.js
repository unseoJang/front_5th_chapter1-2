// 객체 반환
export function createVNode(type, props, ...children) {
  // console.log("type", type);
  // console.log("props", props);
  // console.log("children", children);
  return {
    type,
    props,
    children: children.flat(), // React나 가상 DOM 기반으로 뭔가를 렌더링할 때 children을 배열로 받아서 사용하는 경우가 많은데, 실수로 중첩된 배열이 들어가는 경우가 있어요.
  };
}
