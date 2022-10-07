/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "../actions/posts";
import Form from "../components/Form/Form";
import Posts from "../components/Posts/Posts";
import { Toaster } from "react-hot-toast";

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return (
    <div className="mt-10 flex w-full  mb-40">
      <Toaster />
      <div className="flex lg:flex-row flex-col-reverse lg:justify-between lg:space-x-4">
        <div className="flex justify-between items-center ">
          <Posts setCurrentId={setCurrentId} />
        </div>
        <div className="lg:w-[30%]">
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </div>
      </div>
    </div>
  );
};

export default Home;
