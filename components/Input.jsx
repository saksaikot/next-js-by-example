import React, { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  return (
    <input className="border rounded px-2 py-1 w-80" {...props} ref={ref} />
  );
});

export default Input;
