/** @format */

"use client";

import type { GroupedMenus } from "@/app/allfood/page";
import MenuCard from "./MenuCard";
import { useState } from "react";

interface MenuAccordionProps {
  data: GroupedMenus;
}

export default function MenuAccordion({ data }: MenuAccordionProps) {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {}
  );
  const categories = Object.keys(data);

  const handleToggleCategory = (category: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  if (categories.length === 0) {
    return <p className="mt-4 text-center">표시할 메뉴가 없습니다.</p>;
  }

  const NAME: Record<string, string> = {
    korean: "한식",
    chinese: "중식",
    fastfood: "패스트푸드",
    japanese: "일식",
    italian: "이탈리아",
    asian: "아시안",
    mexican: "멕시칸",
    bunsik: "분식",
  };
  return (
    <div className="space-y-4">
      {categories.map((category) => {
        const isOpen = openCategories[category];

        return (
          <div
            key={category}
            className="border border-gray-200 rounded-2xl bg-gray-50"
          >
            <button
              onClick={() => handleToggleCategory(category)}
              className="w-full flex justify-between items-center p-4 text-left"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                {`${NAME[category]} (${category})`}
              </h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`w-6 h-6 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>

            {isOpen && (
              <div className="py-3 px-1 lg:px-2 border-t border-gray-200">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-1 lg:gap-x-4 gap-y-4 lg:gap-y-6">
                  {data[category].map((menu) => (
                    <MenuCard key={menu.id} menu={menu} />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
