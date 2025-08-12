/** @format */

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon, XCircleIcon } from "@heroicons/react/24/solid";

import { categoryMap } from "@/shared/types/type";
import { personalFilter } from "@/shared/types/constants";
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

  const handleSubmit = (e: React.FormEvent) => {
    onDetailedSubmit(e);
    setIsModalOpen(false);
  };

  return (
    <>
      {/* --- 음식 카테고리 선택 영역 --- */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-700 text-center">
          음식 종류 선택
        </h3>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {Object.entries(categoryMap).map(([label, value]) => (
            <motion.button
              key={label}
              onClick={() => onFilterChange("category", value)}
              className={`px-3 md:px-4 py-2 rounded-full font-medium transition-colors duration-200 text-xs md:text-sm ${
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
        className={`w-full font-bold py-3 mb-3 rounded-lg transition-colors duration-300 flex items-center justify-center cursor-pointer ${
          isDetailedFilterActive
            ? "bg-indigo-600 text-white shadow-md font-semibold"
            : "bg-blue-500 text-white hover:bg-indigo-600"
        }`}
      >
        {isDetailedFilterActive ? "상세 조건 적용됨" : "개인별 상세 조건 설정"}
        <ChevronDownIcon className="w-5 h-5 ml-2" />
      </motion.button>

      {/* --- 상세 조건 설정 모달 --- */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-gray-100 bg-opacity-60 flex items-center justify-center p-4 z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-gray-50 p-6 rounded-2xl shadow-2xl w-full max-w-lg relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-500 rounded-full cursor-pointer"
                aria-label="닫기"
              >
                <XCircleIcon className="w-6 h-6 -mr-2" />
              </button>

              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                개인별 상세 조건 설정
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* --- 개인 조건 설정 --- */}
                {personalFilter.map(({ title, key, options }) => (
                  <div key={key}>
                    <label className="block text-gray-700 font-semibold mb-2">
                      {title}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {options.map((opt) => (
                        <label
                          key={opt}
                          className={`flex items-center justify-center space-x-2 w-22 py-1.5 md:py-2 rounded-xl border cursor-pointer text-sm font-medium ${
                            filters[key] === opt
                              ? "bg-emerald-500 text-white"
                              : "bg-white text-gray-400"
                          }`}
                        >
                          <input
                            type="radio"
                            name={key}
                            value={opt}
                            checked={filters[key] === opt}
                            onChange={(e) =>
                              onFilterChange(key, e.target.value)
                            }
                            className="hidden"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                {/* --- 하단 버튼 영역 --- */}
                <div className="flex space-x-4 pt-4">
                  <motion.button
                    type="submit"
                    className="flex-1 bg-emerald-500 text-white font-bold py-3 rounded-lg hover:bg-emerald-600"
                  >
                    적용하기
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={onResetFilters}
                    className="flex-1 bg-gray-300 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-400"
                  >
                    초기화
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
