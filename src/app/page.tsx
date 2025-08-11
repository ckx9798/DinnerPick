/** @format */

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import FilterSection from "@/features/filter-food/FilterSection";
import { Food } from "@/shared/types/type";
import FoodWorldCup from "@/features/food-world-cup/FoodWorldCup";
import LikedPanel from "@/features/like-food/LikePanel";
import RecommendCard from "@/features/recommend-food/RecommendCard";
import { initialFood } from "@/shared/types/constants";

export default function HomePage() {
  // --- 상태 관리 (State Management) ---
  const [currentFood, setCurrentFood] = useState<Food>(initialFood);
  const [detailedFilters, setDetailedFilters] = useState<{
    [key: string]: any;
  }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [likedFoods, setLikedFoods] = useState<Food[]>([]);
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [isWorldCupActive, setIsWorldCupActive] = useState(false);

  // --- 음식추천 API ---
  const recommendFood = async (filters = detailedFilters) => {
    setIsLoading(true);
    const params = new URLSearchParams();
    for (const key in filters) {
      if (filters[key]) {
        params.append(key, filters[key]);
      }
    }
    try {
      const response = await fetch(`/api/recommend?${params.toString()}`);
      if (!response.ok) throw new Error("API response not ok");
      const recommendedMenu = await response.json();
      if (recommendedMenu) {
        setCurrentFood(recommendedMenu);
      } else {
        alert("조건에 맞는 메뉴를 찾지 못했어요. 필터를 조정해 보세요!");
        setCurrentFood(initialFood);
      }
    } catch (error) {
      console.error("Failed to recommend food:", error);
      alert("메뉴 추천 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    recommendFood();
  }, []);

  // --- 필터 변경 로직 ---
  const handleFilterChange = (key: string, value: string) => {
    const newFilters = {
      ...detailedFilters,
      [key]: detailedFilters[key] === value ? "" : value,
    };
    setDetailedFilters(newFilters);
    if (key === "category") {
      recommendFood(newFilters);
    }
  };

  // --- 개인 필터 적용 ---
  const handleDetailedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    recommendFood(detailedFilters);
  };

  // --- 필터 초기화 ---
  const resetFilters = () => {
    const newFilters = { category: detailedFilters.category };
    setDetailedFilters(newFilters);
    recommendFood(newFilters);
  };

  // --- 유튜브 이동 로직 ---
  const moveToYoutube = () => {
    if (currentFood.name && currentFood.name !== "뭐먹지?") {
      const query = `${currentFood.name} 먹방`;
      const encodedQuery = encodeURIComponent(query);
      const youtubeUrl = `https://www.youtube.com/results?search_query=${encodedQuery}`;
      window.open(youtubeUrl, "_blank");
    }
  };

  // --- 네이버 이동 로직 ---
  const moveToNaverMap = () => {
    if (currentFood.name && currentFood.name !== "뭐먹지?") {
      const query = currentFood.name;
      const encodedQuery = encodeURIComponent(query);
      const naverMapUrl = `https://map.naver.com/p/search/${encodedQuery}`;
      window.open(naverMapUrl, "_blank");
    }
  };

  // --- 월드컵 찜하기 로직 ---
  const handleLike = () => {
    if (!currentFood || currentFood.id === 0) return;
    const isAlreadyLiked = likedFoods.some(
      (food) => food.id === currentFood.id
    );
    let updatedLikedFoods;
    if (isAlreadyLiked) {
      updatedLikedFoods = likedFoods.filter(
        (food) => food.id !== currentFood.id
      );
    } else {
      updatedLikedFoods = [...likedFoods, currentFood];
    }
    setLikedFoods(updatedLikedFoods);
    setIsPanelVisible(updatedLikedFoods.length > 0);
  };

  // --- 월드컵 찜하기 제거 ---ㄴ
  const handleRemoveFromPanel = (id: number) => {
    const updatedLikedFoods = likedFoods.filter((food) => food.id !== id);
    setLikedFoods(updatedLikedFoods);
    if (updatedLikedFoods.length === 0) {
      setIsPanelVisible(false);
    }
  };

  // --- 월드컵 실행 ---
  const startWorldCup = () => {
    if (likedFoods.length < 2) {
      alert("월드컵을 시작하려면 2개 이상의 메뉴를 찜해야 합니다.");
      return;
    }
    setIsWorldCupActive(true);
  };

  const isLiked = likedFoods.some((food) => food.id === currentFood.id);
  const isDetailedFilterActive = Object.entries(detailedFilters).some(
    ([key, value]) => key !== "category" && value
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-sans">
      <div className="relative">
        <div className="bg-white p-12 rounded-2xl shadow-xl w-full max-w-xl">
          <RecommendCard
            food={currentFood}
            isLoading={isLoading}
            isLiked={isLiked}
            onRecommend={() => recommendFood(detailedFilters)}
            onLike={handleLike}
            onGoToYoutube={moveToYoutube}
            onGoToNaverMap={moveToNaverMap}
          />
          <hr className="my-8 border-t-2 border-gray-200" />
          <FilterSection
            filters={detailedFilters}
            isDetailedFilterActive={isDetailedFilterActive}
            onFilterChange={handleFilterChange}
            onDetailedSubmit={handleDetailedSubmit}
            onResetFilters={resetFilters}
          />
        </div>

        <AnimatePresence>
          {isPanelVisible && (
            <motion.div
              className="absolute left-full top-0 ml-12"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
            >
              <LikedPanel
                likedFoods={likedFoods}
                onStartWorldCup={startWorldCup}
                onRemoveFood={handleRemoveFromPanel}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isWorldCupActive && (
          <FoodWorldCup
            initialFoods={likedFoods}
            onClose={() => setIsWorldCupActive(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
