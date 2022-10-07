/** @format */

import React from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Input = ({
  name,
  label,
  autoFocus,
  handleChange,
  type,
  half,
  handleShowPassword,
  pw,
}) => {
  return (
    <div className={`py-2 relative sm:${half ? "w-1/2" : "w-full"}`}>
      <input
        name={name}
        placeholder={label}
        onChange={handleChange}
        required
        className="w-full border py-1.5 pl-4 rounded-md h-10"
        autoFocus={autoFocus}
        type={type}
      />
      {name === "password" && (
        <p onClick={handleShowPassword} className="absolute right-3 top-5">
          {type === "password" ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </p>
      )}
    </div>
  );
};

export default Input;
