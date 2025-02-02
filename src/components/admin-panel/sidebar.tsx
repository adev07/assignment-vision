"use client";
import { Menu } from "@/components/admin-panel/menu";
import { SidebarToggle } from "@/components/admin-panel/sidebar-toggle";

import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        !getOpenState() ? "w-[90px]" : "w-72",
        settings.disabled && "hidden"
      )}
    >
      <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative flex flex-col px-3 py-4 shadow-md dark:shadow-zinc-800"
      >
        <div className="flex space-x-2 items-center justify-center">
          <img
            loading="lazy"
            src="https://cerebralzip.com/Group.png"
            alt="Company logo"
            className="w-10 max-w-full"
          />
          {getOpenState() && (
            <h2 className="text-[#2463eb] text-2xl font-semibold">CerebralZip</h2>
          )}
        </div>
        <Menu isOpen={getOpenState()} />
      </div>
    </aside>
  );
}
