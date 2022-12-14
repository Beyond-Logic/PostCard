/** @format */

import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { RotatingSquare } from "react-loader-spinner";

const Posts = ({ currentId, setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  console.log(posts);
  return !posts.length ? (
    <div className="flex w-full">
      <RotatingSquare
        height="100"
        width="100"
        color="#4285f4"
        ariaLabel="rotating-square-loading"
        strokeWidth="4"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  ) : (
    <div className=" flex space-x-2 md:flex-row flex-col flex-wrap">
      {posts.map((post) => (
        <div key={post._id} className="md:w-[48%] mb-10">
          <Post post={post} setCurrentId={setCurrentId} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
