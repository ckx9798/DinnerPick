/** @format */

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import FilterModal from "./FilterModal";
import { categoryMap } from "@/shared/types/type";
import { motion } from "framer-motion";
import { useState } from "react";

interface FilterSectionProps {
  filters: { [key: string]: string };
  isDetailedFilterActive: boolean;
  onFilterChange: (key: string, value: string) => void;
  onDetailedSubmit: (e: React.FormEvent) => void;
  onResetFilters: () => void;
}

export default function FilterSection({
  filters,
  isDetailedFilterActive,
  onFilterChange,
  onDetailedSubmit,
  onResetFilters,
}: FilterSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* --- 음식 카테고리 선택 영역 --- */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-700 text-center">
          음식 종류 선택
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-3 gap-x-3 gap-y-2.5 md:gap-4 px-1">
          {Object.entries(categoryMap).map(([label, value]) => (
            <motion.button
              key={label}
              onClick={() => onFilterChange("category", value)}
              className={`w-full px-3 md:px-4 py-2 lg:py-3 rounded-2xl font-medium transition-colors duration-200 text-xs md:text-sm ${
                (filters.category || "") === value
                  ? "bg-emerald-500 text-white shadow-md font-bold"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {label}
            </motion.button>
          ))}
        </div>
      </div>

      <hr className="my-8 border-t-2 border-gray-200" />

      {/* --- 개인 상세 조건 설정 영역 ---  */}
      <motion.button
        onClick={() => setIsModalOpen(true)}
        className={`w-full font-bold py-3 mb-3 rounded-xl transition-colors duration-300 flex items-center justify-center cursor-pointer ${
          isDetailedFilterActive
            ? "bg-indigo-600 text-white shadow-md font-semibold"
            : "bg-blue-500 text-white hover:bg-indigo-600"
        }`}
      >
        {isDetailedFilterActive ? "상세 조건 적용됨" : "개인별 상세 조건 설정"}
        <ChevronDownIcon className="w-5 h-5 ml-2" />
      </motion.button>

      {/* --- 상세 조건 설정 모달 --- */}
      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        filters={filters}
        onFilterChange={onFilterChange}
        onDetailedSubmit={onDetailedSubmit}
        onResetFilters={onResetFilters}
      />
    </>
  );
}
