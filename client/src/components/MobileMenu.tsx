import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Link, useLocation } from "wouter";

interface MobileMenuProps {
  items: Array<{ href: string; label: string }>;
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ items, open, onClose }: MobileMenuProps) {
  const [location] = useLocation();

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[240px] sm:w-[300px]">
        <nav className="flex flex-col gap-4">
          {items.map((item) => (
            <Link key={item.href} href={item.href}>
              <a
                className={`block px-2 py-1 text-lg font-medium rounded-md transition-colors hover:bg-accent ${
                  location === item.href ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={onClose}
              >
                {item.label}
              </a>
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
