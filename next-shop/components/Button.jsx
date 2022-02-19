import React from "react";

export default function Button({ type, children }) {
  return (
    <button
      className="bg-green-800 text-gray-200 rounded px-4 py-2 hover:bg-green-700 my-2"
      type={type}
    >
      {children}
    </button>
  );
}
