"use client";

import { useState, type FC } from "react";
import { cn } from "../../lib/utils";
import { getIconUrl } from "../../lib/imageUtils";

interface SideMenuProps {
  className?: string;
}

interface MenuItem {
  icon?: string;
  label: string;
  active?: boolean;
}

interface SecondaryItem {
  label: string;
}

export const SideMenu: FC<SideMenuProps> = ({ className }) => {
  const [isOpened, setIsOpened] = useState(false);

  const menuItems: MenuItem[] = [
    { icon: "search", label: "Search", active: false },
    { icon: "home", label: "Home", active: true },
    { icon: "tv", label: "TV Shows", active: false },
    { icon: "movies", label: "Movies", active: false },
    { icon: "genres", label: "Genres", active: false },
    { icon: "leter", label: "Watch Later", active: false },
  ];

  const secondaryItems: SecondaryItem[] = [
    { label: "LANGUAGE" },
    { label: "GET HELP" },
    { label: "EXIT" },
  ];

  return (
    <>
      {/* Main Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 h-screen z-50 transition-all duration-200 ease-out",
          isOpened ? "w-80" : "w-21",
          className
        )}
        onMouseEnter={() => setIsOpened(true)}
        onMouseLeave={() => setIsOpened(false)}
      >
        <div
          className={cn(
            "h-full transition-all duration-300 ease-out bg-black/90 backdrop-blur-sm"
          )}
        >
          {/* User Profile - Fixed positioning */}
          <div className="pt-20 pl-4 h-20 flex items-center">
            <div
              className={cn(
                "flex items-center transition-all duration-200 ease-out",
                isOpened ? "gap-3 opacity-100" : "gap-0 opacity-0"
              )}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold text-sm">D</span>
              </div>
              <span
                className={cn(
                  "text-[color:var(--text-white)] font-medium whitespace-nowrap transition-all duration-200 ease-out",
                  isOpened
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                )}
              >
                Daniel
              </span>
            </div>
          </div>

          <div className="flex flex-col h-full">
            {/* Main Menu Items - Consistent spacing */}
            <nav className="flex-1 px-2 mt-8">
              <ul className="space-y-2">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <div
                      className={cn(
                        "w-full flex cursor-pointer h-[65px] items-center transition-all duration-200 ease-out",
                        "h-14",
                        isOpened
                          ? "gap-4 px-3 rounded-lg justify-start"
                          : "justify-center rounded-full",
                        "hover:bg-[color:var(--hover)]/50",
                        "focus:outline-none focus:ring-2 focus:ring-[color:var(--outline-main)]",
                        item.active
                          ? "bg-[#232A3F] text-white"
                          : "text-white hover:text-white"
                      )}
                    >
                      <img
                        src={getIconUrl(item.icon!)}
                        alt={item.label}
                        className="w-5 h-auto flex-shrink-0 transition-all duration-200 ease-out"
                      />
                      <span
                        className={cn(
                          "font-medium text-xl whitespace-nowrap transition-all duration-200 ease-out",
                          isOpened
                            ? "opacity-100 translate-x-0 max-w-none"
                            : "opacity-0 -translate-x-4 max-w-0 overflow-hidden"
                        )}
                      >
                        {item.label}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Secondary Items */}
            <div
              className={cn(
                "px-2 pb-16 border-t border-[color:var(--hover)]/30 mt-4 transition-all duration-200 ease-out",
                isOpened
                  ? "opacity-100 translate-y-0 max-h-96"
                  : "opacity-0 translate-y-4 max-h-0 overflow-hidden"
              )}
            >
              <ul className="space-y-1 pb-10">
                {secondaryItems.map((item, index) => (
                  <li key={index}>
                    <div className="w-full cursor-pointer text-left p-3 h-8 flex items-center rounded-lg text-[#858688] hover:text-[color:var(--text-white)] text-lg font-medium transition-all duration-200 ease-out">
                      {item.label}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
