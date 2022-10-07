/** @format */

import React from "react";

const Container = ({ children }) => {
  return (
    <div className="xl:max-w-7xl justify-center w-full px-10 space-x-5">
      {children}
    </div>
  );
};

export default Container;
