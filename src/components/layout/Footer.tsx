"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto text-center">
      <small className="text-muted-foreground">
        &copy; <span>{currentYear}</span> Press Polish
      </small>
    </footer>
  );
}
