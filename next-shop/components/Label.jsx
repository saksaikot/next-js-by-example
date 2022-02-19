import React from "react";

export default function Label({ label, children }) {
  return (
    <label className="block my-2">
      <span className="block my-1 text-gray-700">{label}</span>
      {children}
    </label>
  );
}
