/** @format */

import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import { BsFillHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.sub || user?.result?._id)
      ) ? (
        <div className="flex space-x-2 items-center">
          <BsFillHandThumbsUpFill fontSize="medium" />
          <div>
            {post.likes.length > 2
              ? `You and ${post.likes.length - 1} others`
              : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
          </div>
        </div>
      ) : (
        <div className="flex space-x-2 items-center">
          <BsHandThumbsUp fontSize="medium" />
          <div>
            {" "}
            {post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
          </div>
        </div>
      );
    }

    return (
      <div className="flex space-x-2 items-center">
        <BsHandThumbsUp fontSize="medium" />
        <div>Like</div>
      </div>
    );
  };
  return (
    <div className="">
      <div className="shadow-2xl rounded-t-xl rounded-b-xl ">
        <div className="relative bg-black opacity-90 ">
          <img src={post.selectedFile} alt={post.title} />
          <div className="absolute top-2 left-4 text-white z-10">
            <h5 className="text-base">{post.name}</h5>
            <p>{moment(post.createdAt).fromNow()}</p>
          </div>
          <div className="absolute right-4 top-2 text-2xl font-extrabold">
            {(user?.result?.name === post?.name ||
              user?.result?.name === post?.name) && (
              <button
                className="text-white"
                onClick={() => setCurrentId(post._id)}
              >
                ...
              </button>
            )}
          </div>
        </div>
        <div className="px-4 pb-4 mt-2 rounded-b-2xl">
          <div>
            <h2 className="text-xs text-gray-700">
              {post.tags.map((tag) => `#${tag}`)}
            </h2>
          </div>
          <h1 className="text-xl">{post.title}</h1>

          <div>
            <p>{post.message}</p>
          </div>
          <div className="flex justify-between mt-4 text-blue-900 uppercase">
            <button
              className=""
              disabled={!user?.result}
              onClick={() => dispatch(likePost(post._id))}
            >
              <Likes />
            </button>
            {(user?.result?.name === post?.name ||
              user?.result?.name === post?.name) && (
              <div className="flex space-x-2 items-center">
                <BiTrash fontSize="medium" />
                <button onClick={() => dispatch(deletePost(post._id))}>
                  DELETE
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
