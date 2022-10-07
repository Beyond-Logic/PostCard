/** @format */

import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    }
    clear();
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
    window.location = "/";
  };

  return (
    <div className="shadow-xl px-10 py-5 mb-20">
      {!user?.result?.name ? (
        <div className="">
          <h3 className="">
            Please sign in to create your own post card and like other's post
            card
          </h3>
        </div>
      ) : (
        <div>
          <h5 className="text-center text-xl text-gray-800 mb-4">
            {currentId ? "Editing" : "Creating "} a PostCard
          </h5>
          <div className="flex flex-col space-y-4 mb-4">
            <input
              name="title"
              value={postData.title}
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
              placeholder="title"
              className="border py-1.5 pl-4 rounded-md"
            />
            <input
              name="message"
              value={postData.message}
              onChange={(e) =>
                setPostData({ ...postData, message: e.target.value })
              }
              placeholder="message"
              className="border py-1.5 pl-4 rounded-md"
            />

            <input
              name="tags"
              value={postData.tags}
              onChange={(e) =>
                setPostData({ ...postData, tags: e.target.value.split(",") })
              }
              placeholder="tags"
              className="border py-1.5 pl-4 rounded-md"
            />
          </div>
          <div>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>
          <div className="flex flex-col text-white space-y-3 mt-4">
            <button
              onClick={handleSubmit}
              className={`text-lg py-2 ${
                !postData.message ||
                !postData.title ||
                !postData.tags ||
                !postData.selectedFile
                  ? "bg-blue-500"
                  : "bg-blue-700"
              } rounded-md`}
              type="submit"
              disabled={
                !postData.message &&
                !postData.title &&
                !postData.tags &&
                !postData.selectedFile
              }
            >
              {currentId ? "Update" : "Publish"}
            </button>
            <button
              className="text-lg py-2 bg-pink-700 rounded-md"
              onClick={clear}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
