// 객체 반환
export function createVNode(type, props, ...children) {
  // console.log("type", type);
  // console.log("props", props);
  // console.log("children", children);
  return {
    type,
    props,
    children,
  };
}
