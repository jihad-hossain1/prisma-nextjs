"use client";

import React from "react";

const Modal = ({ children, openModal, setOpenModal, title }) => {
  return (
    <div
      onClick={() => setOpenModal(false)}
      className={`fixed flex justify-center items-center z-[100] ${
        openModal ? "visible opacity-1" : "invisible opacity-0"
      } inset-0 w-full h-full backdrop-blur-sm bg-black/20 duration-100`}
    >
      <div
        onClick={(e_) => e_.stopPropagation()}
        className={`absolute w-full lg:w-[500px] bg-gray-900 border border-violet-500 drop-shadow-2xl rounded-lg ${
          openModal
            ? "opacity-1 duration-300 translate-y-0"
            : "-translate-y-20 opacity-0 duration-150"
        }`}
      >
        <svg
          onClick={() => setOpenModal(false)}
          className=" w-10 mx-auto mr-0 cursor-pointer text-gray-500"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"
              fill="lightblue"
            ></path>
          </g>
        </svg>
        <h1 className="backdrop-blur-sm text-xl text-center pb-8">{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default Modal;
