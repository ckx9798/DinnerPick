/** @format */

import { AnimatePresence, motion } from "framer-motion";

import { XCircleIcon } from "@heroicons/react/24/solid";
import { personalFilter } from "@/shared/types/constants";

interface FilterModalProps {
  isOpen: boolean;
  filters: { [key: string]: string };
  onClose: () => void;
  onFilterChange: (key: string, value: string) => void;
  onDetailedSubmit: (e: React.FormEvent) => void;
  onResetFilters: () => void;
}

export default function FilterModal({
  isOpen,
  filters,
  onClose,
  onFilterChange,
  onDetailedSubmit,
  onResetFilters,
}: FilterModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.stopPropagation();
    onDetailedSubmit(e);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-gray-300 bg-opacity-60 flex items-center justify-center p-0 md:p-4 z-50"
          onClick={onClose}
        >
          <motion.form
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className="bg-gray-50 shadow-2xl w-screen h-screen rounded-none 
                       md:relative md:w-full md:max-w-lg md:h-auto md:max-h-[90vh] md:rounded-2xl
                       flex flex-col"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
          >
            {/* --- 상단 --- */}
            <div className="relative p-6 md:p-8 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-center text-gray-800">
                개인별 상세 조건 설정
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="absolute top-7 -translate-y-1/2 right-1 md:right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full cursor-pointer"
                aria-label="닫기"
              >
                <XCircleIcon className="w-8 h-8" />
              </button>
            </div>

            {/* --- 컨텐츠 --- */}
            <div className="p-6 md:p-8 space-y-6 flex-1 overflow-y-auto">
              {personalFilter.map(({ title, key, options }) => (
                <div key={key}>
                  <label className="block text-gray-700 font-semibold mb-3">
                    {title}
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {options.map((opt) => (
                      <label
                        key={opt}
                        className={`flex items-center justify-center space-x-2 py-2 rounded-2xl border cursor-pointer text-sm font-medium transition-all ${
                          filters[key] === opt
                            ? "bg-emerald-500 text-white border-emerald-500 font-bold"
                            : "bg-white text-gray-500 border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name={key}
                          value={opt}
                          checked={filters[key] === opt}
                          onChange={(e) => onFilterChange(key, e.target.value)}
                          className="hidden"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* --- 버튼 --- */}
            <div className="flex space-x-4 p-6 md:p-8 border-t border-gray-200">
              <motion.button
                type="submit"
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-emerald-500 text-white font-bold py-2.5 md:py-3.5 rounded-lg hover:bg-emerald-600"
              >
                적용하기
              </motion.button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={onResetFilters}
                className="flex-1 bg-gray-300 text-gray-800 font-bold py-2.5 md:py-3.5 rounded-lg hover:bg-gray-400"
              >
                초기화
              </motion.button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
