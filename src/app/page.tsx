/** @format */

"use client";

import { AnimatePresence, motion } from "framer-motion";

import FilteringBtn from "./features/filter/FilteringModal";
import Image from "next/image";
import { allFoods } from "./mock";
import { useState } from "react";

export default function HomePage() {
  const [currentFood, setCurrentFood] = useState(allFoods[0]);
  const [currentCategory, setCurrentCategory] = useState<
    "all" | "korean" | "western" | "chinese"
  >("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailedFilters, setDetailedFilters] = useState<any>({});

  const filterFoods = () => {
    let filtered =
      currentCategory === "all"
        ? allFoods
        : allFoods.filter((food) => food.category === currentCategory);

    // 상세 조건 필터링
    if (detailedFilters.spicy) {
      filtered = filtered.filter(
        (food) => food.spicy === detailedFilters.spicy
      );
    }
    if (detailedFilters.mainType) {
      filtered = filtered.filter(
        (food) => food.mainType === detailedFilters.mainType
      );
    }
    if (detailedFilters.price) {
      filtered = filtered.filter(
        (food) => food.price === detailedFilters.price
      );
    }
    if (detailedFilters.texture) {
      filtered = filtered.filter(
        (food) => food.texture === detailedFilters.texture
      );
    }
    if (detailedFilters.ingredients) {
      filtered = filtered.filter((food) =>
        food.ingredients.includes(detailedFilters.ingredients)
      );
    }

    return filtered.length > 0 ? filtered : allFoods; // 필터링 결과가 없으면 전체 목록 반환
  };

  const recommendFood = () => {
    const filteredFoods = filterFoods();
    const randomIndex = Math.floor(Math.random() * filteredFoods.length);
    setCurrentFood(filteredFoods[randomIndex]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        {/* 메인 이미지 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFood.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex justify-center"
          >
            <Image
              src={currentFood.image}
              alt={currentFood.name}
              width={400}
              height={300}
              className="rounded-lg shadow-md"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* 메뉴 추천 버튼 */}
        <motion.button
          onClick={recommendFood}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-emerald-500 text-white font-bold py-3 rounded-lg hover:bg-emerald-600 transition-colors duration-300"
        >
          메뉴 추천
        </motion.button>
      </div>

      {/* 장르별 필터링 */}
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          장르별 필터링
        </h3>
        <div className="flex justify-center space-x-2">
          {["all", "korean", "western", "chinese"].map((filter) => (
            <motion.button
              key={filter}
              onClick={() =>
                setCurrentCategory(
                  filter as "all" | "korean" | "western" | "chinese"
                )
              }
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full font-medium transition-colors duration-300 ${
                currentCategory === filter
                  ? "bg-emerald-500 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {filter === "all"
                ? "전체"
                : filter === "korean"
                ? "한식"
                : filter === "western"
                ? "양식"
                : "중식"}
            </motion.button>
          ))}
        </div>
      </div>

      <hr className="my-8 border-t-2 border-gray-200" />

      {/* 모달 */}
      <AnimatePresence>{isModalOpen && <FilteringBtn />}</AnimatePresence>
    </div>
  );
}
