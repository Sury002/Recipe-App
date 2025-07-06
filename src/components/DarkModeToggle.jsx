import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function DarkModeToggle({ mobile = false }) {
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem("darkMode");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(savedMode !== null ? savedMode === "true" : systemPrefersDark);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode, mounted]);

  if (!mounted) {
    return (
      <div
        className={`p-2 rounded-full ${
          mobile ? "bg-transparent" : "bg-gray-100 dark:bg-gray-800"
        }`}
      ></div>
    );
  }

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      className={`p-2 rounded-full focus:outline-none transition-all duration-200 ${
        mobile
          ? "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700/50"
          : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-amber-500 hover:text-amber-600 dark:text-blue-400 dark:hover:text-blue-300"
      }`}
    >
      {darkMode ? (
        <FiSun className="h-5 w-5" />
      ) : (
        <FiMoon className="h-5 w-5" />
      )}
    </button>
  );
}
