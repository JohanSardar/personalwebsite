"use client";

export default function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }
  return (
    <button type="button" className="toggle" onClick={toggle} aria-label="Switch between light and dark">
      <span className="toggle-track" aria-hidden="true">
        <span className="toggle-dot" />
      </span>
      <span className="toggle-text toggle-light">Light</span>
      <span className="toggle-text toggle-dark">Dark</span>
    </button>
  );
}
