import React from "react";

export default function DarkTheme() {
  return (
    <style jsx global>{`
      :root {
        --background-color: rgb(32, 32, 32);
        --color: rgb(252, 243, 243);
        --link-color: rgb(194, 109, 11);
      }
    `}</style>
  );
}
