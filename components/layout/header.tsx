import Link from "next/link";
import { getMessages, Lang } from "@/lib/i18n/messages";
import { LanguageSwitcher } from "./language-switcher";

export function Header({ lang }: { lang: Lang }) {
  const t = getMessages(lang);
  return (
    <header className="sticky top-0 z-30 border-b border-white/70 bg-white/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="text-lg font-bold tracking-tight text-cyan-800">
          {t.brand}
        </Link>
        <nav className="flex items-center gap-3 text-sm font-medium text-slate-700">
          <Link className="rounded-lg px-3 py-2 hover:bg-cyan-50 hover:text-cyan-700" href="/pricing">Pricing</Link>
          <Link className="rounded-lg px-3 py-2 hover:bg-cyan-50 hover:text-cyan-700" href="/contact">Contact</Link>
          <Link className="rounded-lg bg-cyan-600 px-3 py-2 text-white hover:bg-cyan-700" href="/login">{t.login}</Link>
          <LanguageSwitcher lang={lang} />
        </nav>
      </div>
    </header>
  );
}
