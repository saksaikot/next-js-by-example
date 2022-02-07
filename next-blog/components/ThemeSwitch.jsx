import React, { useState } from "react";
import DarkTheme from "./DarkTheme";

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
            color: inherit;
          }
        `}
      </style>
      {darkTheme && <DarkTheme />}
    </>
  );
}
