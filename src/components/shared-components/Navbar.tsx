"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/donations", label: "Donations" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="w-full border-b shadow-sm bg-white">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <Link href="/" className="text-lg font-bold">
          Moorad Mahal
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>

        {/* Mobile Navigation Button */}
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

// Active Link Component
function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState<string | null>(null);

  useEffect(() => {
    setActivePath(pathname); // Set pathname only on client side
  }, [pathname]);

  const isActive = activePath === href;

  return (
    <Link
      href={href}
      className={`relative px-2 py-1 transition-colors ${
        isActive
          ? "text-black font-medium after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-black"
          : "text-gray-600 hover:text-black"
      }`}
    >
      {label}
    </Link>
  );
}

// Mobile Drawer Component
function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <nav className="mt-6 flex flex-col space-y-4">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-lg font-medium text-gray-800 hover:text-black">
              {link.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
