import React from "react";

export default function Button({ type, className, children, ...props }) {
  return (
    <button
      className={`bg-green-800 text-gray-200 rounded px-4 py-2 hover:bg-green-700 m-2 ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
