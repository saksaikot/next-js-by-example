import React, { useState } from "react";
import DarkTheme from "./DarkTheme";
function loadDarkMode() {
  const darkMode = localStorage.getItem("darkTheme");
  return darkMode ? JSON.parse(darkMode) : false;
}
export default function ThemeSwitch() {
  const [darkTheme, setDarkTheme] = useState(loadDarkMode);

  const buttonText = darkTheme ? "Dark Theme" : "Light Theme";

  const handleButtonClick = () => {
    localStorage.setItem("darkTheme", JSON.stringify(!darkTheme));
    setDarkTheme(!darkTheme);
  };
  return (
    <>
      <button onClick={handleButtonClick}>{buttonText}</button>
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
