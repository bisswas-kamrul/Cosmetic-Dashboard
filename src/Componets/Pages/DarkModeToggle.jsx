import React from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <>
      <button
        onClick={() => setDark(!dark)}
        className="px-3 py-1 rounded cursor-pointer">
        <MdOutlineDarkMode />
      </button>
    </>
  );
};

export default DarkModeToggle;
