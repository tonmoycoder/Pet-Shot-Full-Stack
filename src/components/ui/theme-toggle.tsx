"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import "./theme-toggle.scss";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) {
    return <div style={{ width: "70px", height: "40px" }} />;
  }

  const isDark = theme === "dark";

  return (
    <div className="toggle toggle--daynight" style={{ margin: 0 }}>
      <input 
        type="checkbox" 
        id="toggle--daynight-btn"
        className="toggle--checkbox"
        checked={isDark}
        onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
        aria-label="Toggle Theme"
      />
      <label className="toggle--btn" htmlFor="toggle--daynight-btn">
        <span className="toggle--feature"></span>
      </label>
    </div>
  );
}
