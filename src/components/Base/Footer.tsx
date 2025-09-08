"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto text-center">
      <small>
        &copy; <span id="year">{currentYear}</span> Press Polish
      </small>
    </footer>
  );
}
