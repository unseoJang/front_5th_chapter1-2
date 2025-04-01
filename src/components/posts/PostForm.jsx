/** @jsx createVNode */
import { createVNode } from "../../lib";

function addPost(contents) {
  const post = {
    id: 1,
    author: "",
    time: Date.now() - 5 * "분",
    content: "오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!",
    likeUsers: [],
  };
}

export const PostForm = () => {
  const handleSendPost = (e) => {
    e.preventDefault();
    const postContents = document.getElementById("post-content").value || "";
    if (postContents) {
      addPost(postContents);
    }
  };
  return (
    <div className="mb-4 bg-white rounded-lg shadow p-4">
      <textarea
        id="post-content"
        placeholder="무슨 생각을 하고 계신가요?"
        className="w-full p-2 border rounded"
        key
      />
      <button
        id="post-submit"
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={(e) => handleSendPost(e)}
      >
        게시
      </button>
    </div>
  );
};
