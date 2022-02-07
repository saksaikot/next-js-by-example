import React, { useState } from "react";

export default function ThemeSwitch() {
  const [darkTheme, setDarkTheme] = useState(false);

  const buttonText = darkTheme ? "Dark Theme" : "Light Theme";
  return (
    <>
      <button onClick={() => setDarkTheme(!darkTheme)}>{buttonText}</button>
      <style jsx>
        {`
          button {
            background: none;
            border: 0;
            cursor: pointer;
            font-weight: 900;
          }
        `}
      </style>
    </>
  );
}
