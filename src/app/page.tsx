/** @format */

"use client";

import { AnimatePresence } from "framer-motion";
import FilterSection from "@/features/filter-food/FilterSection";
import { Food } from "@/shared/types/type";
import FoodWorldCup from "@/features/food-world-cup/FoodWorldCup";
import ImageSlot from "@/features/recommend-food/ImageSlot";
import LikedFoodsUI from "@/features/like-food/LikedFoodsUI";
import RecommendCard from "@/features/recommend-food/RecommendCard";
import { initialFood } from "@/shared/types/constants";
import { useState } from "react";

export default function HomePage() {
  const [currentFood, setCurrentFood] = useState<Food>(initialFood);
  const [isLoading, setIsLoading] = useState(false);
  const [likedFoods, setLikedFoods] = useState<Food[]>([]);
  const [isPanelModalOpen, setIsPanelModalOpen] = useState(false);
  const [isWorldCupActive, setIsWorldCupActive] = useState(false);
  const [detailedFilters, setDetailedFilters] = useState<{
    [key: string]: string;
  }>({});

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

  // --- 필터 변경 로직 ---
  const handleFilterChange = (key: string, value: string) => {
    const newFilters = {
      ...detailedFilters,
      [key]: detailedFilters[key] === value ? "" : value,
    };
    setDetailedFilters(newFilters);
  };

  // --- 개인 필터 적용 ---
  const handleDetailedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
  };

  // --- 월드컵 찜하기 제거 ---
  const handleRemoveFromPanel = (id: number) => {
    const updatedLikedFoods = likedFoods.filter((food) => food.id !== id);
    setLikedFoods(updatedLikedFoods);
    if (updatedLikedFoods.length === 0) {
      setIsPanelModalOpen(false);
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

  // --- 공유하기 로직 ---
  const handleShare = async () => {
    if (!currentFood || currentFood.id === 0) {
      alert("공유할 메뉴가 추천되지 않았습니다.");
      return;
    }

    // --- Web API 지원 확인 ---
    if (navigator.share) {
      try {
        await navigator.share({
          title: "오늘 뭐 먹을까?",
          text: `오늘 메뉴로 '${currentFood.name}' 어때? 같이 먹자! 😋`,
          url: window.location.href,
        });
        console.log("공유 성공!");
      } catch (error) {
        console.error("공유 실패:", error);
      }
    } else {
      alert("이 브라우저에서는 공유하기 기능이 지원되지 않습니다.");
    }
  };

  const isLiked = likedFoods.some((food) => food.id === currentFood.id);
  const isDetailedFilterActive = Object.entries(detailedFilters).some(
    ([key, value]) => key !== "category" && value
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-sans">
      <div className="relative">
        <div className="bg-white p-4 md:p-12 rounded-2xl shadow-xl w-full max-w-xl my-3 lg:my-6 lg:w-xl">
          <RecommendCard
            food={currentFood}
            isLoading={isLoading}
            isLiked={isLiked}
            onRecommend={() => recommendFood(detailedFilters)}
            onLike={handleLike}
            onGoToYoutube={moveToYoutube}
            onGoToNaverMap={moveToNaverMap}
            onShare={handleShare}
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
      </div>

      <LikedFoodsUI
        likedFoods={likedFoods}
        isPanelModalOpen={isPanelModalOpen}
        setIsPanelModalOpen={setIsPanelModalOpen}
        onStartWorldCup={startWorldCup}
        onRemoveFood={handleRemoveFromPanel}
      />

      <AnimatePresence>
        {isWorldCupActive && (
          <FoodWorldCup
            initialFoods={likedFoods}
            onClose={() => setIsWorldCupActive(false)}
            setIsPanelModalOpen={setIsPanelModalOpen}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
