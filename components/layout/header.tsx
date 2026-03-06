import Link from "next/link";
import { getMessages, Lang } from "@/lib/i18n/messages";
import { LanguageSwitcher } from "./language-switcher";

export function Header({ lang }: { lang: Lang }) {
  const t = getMessages(lang);
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 p-4">
        <Link href="/" className="font-semibold">{t.brand}</Link>
        <nav className="flex items-center gap-3 text-sm">
          <Link href="/pricing">Pricing</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/login">{t.login}</Link>
          <LanguageSwitcher lang={lang} />
        </nav>
      </div>
    </header>
  );
}
