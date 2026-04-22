"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import type { SiteSettings } from "../sanity/types";

const EventsFooter = dynamic(() => import("./EventsFooter"), {
  loading: () => <div className="h-64 animate-pulse bg-(--color-events-border)/5" />,
});

interface EventsLayoutClientProps {
  children: React.ReactNode;
  settings: SiteSettings;
}

export default function EventsLayoutClient({
  children,
  settings,
}: EventsLayoutClientProps) {
  const pathname = usePathname();
  const isContactPage = pathname === "/contact";

  return (
    <div className="events-theme flex min-h-screen flex-col">
      <Navbar settings={settings} />
      <main className="grow">{children}</main>
      {!isContactPage && <EventsFooter settings={settings} />}
    </div>
  );
}
