/** @jsx createVNode */
import { createVNode } from "../../lib";
import { toTimeFormat } from "../../utils/index.js";
import { globalStore } from "../../stores";

const LikeButton = ({ onClick, children, likeUsers, activationLike }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick?.();
    const { loggedIn } = globalStore.getState();
    if (loggedIn) {
      console.log("좋아요 +1");
    } else {
      alert("로그인 후 이용해주세요");
    }
  };
  return (
    <span
      onClick={(e) => {
        e.preventDefault();
        handleClick(e);
      }}
      className={`like-button cursor-pointer${activationLike ? " text-blue-500" : ""}`}
    >
      좋아요 {likeUsers.length}
    </span>
  );
};

export const Post = ({
  author,
  time,
  content,
  likeUsers,
  activationLike = false,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex items-center mb-2">
        <div>
          <div className="font-bold">{author}</div>
          <div className="text-gray-500 text-sm">{toTimeFormat(time)}</div>
        </div>
      </div>
      <p>{content}</p>
      <div className="mt-2 flex justify-between text-gray-500">
        <LikeButton likeUsers={likeUsers} activationLike={activationLike}>
          좋아요
        </LikeButton>
        <span>댓글</span>
        <span>공유</span>
      </div>
    </div>
  );
};
