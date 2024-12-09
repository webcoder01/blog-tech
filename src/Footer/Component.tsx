import { getCachedGlobal } from "@/utilities/getGlobals";
import React from "react";

import type { Footer } from "@/payload-types";

import { CMSLink } from "@/components/Link";

export async function Footer() {
  const footer: Footer = await getCachedGlobal("footer", 1)();

  const navItems = footer?.navItems || [];

  return (
    <footer className="px-5 py-10 bg-slate-700 text-white">
      <nav className="flex flex-col align-middle md:flex-row md:justify-center gap-4">
        {navItems.map(({ link }, i) => {
          return <CMSLink className="text-white" key={i} {...link} />;
        })}
      </nav>
    </footer>
  );
}
