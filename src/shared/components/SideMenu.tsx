"use client";

import { useState, type FC } from "react";
import { cn } from "../../lib/utils";

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
  const [isExpanded, setIsExpanded] = useState(false);

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
    <div
      className={cn(
        "fixed left-0 top-0 h-screen z-50 transition-all duration-300 ease-out",
        isExpanded ? "w-80" : "w-21",
        className
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div
        className={cn(
          "h-full transition-all duration-300 ease-out",
          isExpanded
            ? "bg-[color:var(--menu-background)]/90 backdrop-blur-sm"
            : "bg-transparent"
        )}
      >
        <div className="flex flex-col h-full">
          {/* User Profile */}
          <div className="">
            {isExpanded && (
              <div className="flex items-center gap-3 mb-8 opacity-0 animate-fade-in">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">D</span>
                </div>
                <span className="text-[color:var(--text-white)] font-medium">
                  Daniel
                </span>
              </div>
            )}
          </div>

          {/* Main Menu Items */}
          <nav className="flex-1 px-2">
            <ul className="space-y-1">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <div
                    className={cn(
                      "w-full flex cursor-pointer items-center transition-all duration-300",
                      isExpanded
                        ? "gap-4 p-3 rounded-lg"
                        : "justify-center p-4 rounded-full",
                      "hover:bg-[color:var(--hover)]/50",
                      "focus:outline-none focus:ring-2 focus:ring-[color:var(--outline-main)]",
                      item.active
                        ? isExpanded
                          ? "bg-[#232A3F] text-white"
                          : "bg-[#232A3F] text-white"
                        : "text-white hover:text-white"
                    )}
                  >
                    <img
                      src={`/src/assets/images/icons/${item.icon}.png`}
                      alt={item.label}
                      className={cn("transition-all duration-200 w-6 h-auto")}
                    />
                    {isExpanded && (
                      <span className="font-medium text-base whitespace-nowrap overflow-hidden transition-opacity duration-300">
                        {item.label}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </nav>

          {/* Secondary Items */}
          {isExpanded && (
            <div className="px-2 pb-4 border-t border-[color:var(--hover)]/30 mt-4 pt-4">
              <ul className="space-y-1">
                {secondaryItems.map((item, index) => (
                  <li key={index}>
                    <button className="w-full text-left p-3 rounded-lg text-[color:var(--text-tertiary)] hover:text-[color:var(--text-white)] hover:bg-[color:var(--hover)]/30 text-sm font-medium transition-all duration-200">
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
