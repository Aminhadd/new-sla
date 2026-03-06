"use client";

import { useTransition } from "react";

export function LanguageSwitcher({ lang }: { lang: "en" | "ar" }) {
  const [pending, startTransition] = useTransition();
  return (
    <select
      className="h-10 rounded-md border border-border px-2"
      defaultValue={lang}
      disabled={pending}
      onChange={(e) => {
        const next = e.target.value as "en" | "ar";
        startTransition(async () => {
          await fetch("/api/lang", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ lang: next })
          });
          window.location.reload();
        });
      }}
    >
      <option value="en">English</option>
      <option value="ar">العربية</option>
    </select>
  );
}
