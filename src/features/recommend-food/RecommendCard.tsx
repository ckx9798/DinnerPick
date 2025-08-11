/** @format */

import { AnimatePresence, motion } from "framer-motion";
import { FaHeart, FaMapMarkedAlt, FaShareAlt, FaYoutube } from "react-icons/fa";
import { useEffect, useState } from "react";

import { Food } from "@/shared/types/type";
import Image from "next/image";
import { initialFood } from "@/shared/types/constants";

interface RecommendCardProps {
  food: Food;
  isLoading: boolean;
  isLiked: boolean;
  onRecommend: () => void;
  onLike: () => void;
  onGoToYoutube: () => void;
  onGoToNaverMap: () => void;
  onShare: () => void;
}

// --- 음식 추천 영역 ---
export default function RecommendCard({
  food,
  isLoading,
  isLiked,
  onRecommend,
  onLike,
  onGoToYoutube,
  onGoToNaverMap,
  onShare,
}: RecommendCardProps) {
  // --- 이미지 에러 관리 ---
  const [isImageError, setIsImageError] = useState(false);

  useEffect(() => {
    setIsImageError(false);
  }, [food.id]);

  return (
    <>
      <div className="h-[300px] mb-6 flex justify-center items-center">
        {/* --- 이미지 영역 --- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={food.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {isLoading ? (
              <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center animate-pulse">
                <span className="text-gray-500">메뉴 찾는 중...</span>
              </div>
            ) : (
              <Image
                src={
                  isImageError
                    ? initialFood.image_url
                    : food.image_url || initialFood.image_url
                }
                alt={food.name}
                width={400}
                height={300}
                className="rounded-lg shadow-md object-cover w-full h-full"
                priority
                onError={() => setIsImageError(true)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- 음식 설명 영역 --- */}
      <div className="text-center mb-6 min-h-[60px]">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          {food.name}
        </h2>
        <p className="text-gray-600 mt-2 text-xs md:text-md">
          {food.description}
        </p>
        <div className="flex justify-center space-x-4 md:space-x-8 mt-5">
          {/* 찜하기 */}
          <div
            className={`flex flex-col items-center cursor-pointer transition-colors duration-200 ${
              isLiked ? "text-pink-500" : "text-gray-600 hover:text-pink-400"
            }`}
            onClick={onLike}
          >
            <FaHeart className="w-6 h-6 md:w-8 md:h-8" />
            <p className="text-xs md:text-sm font-semibold mt-1">
              월드컵 찜하기
            </p>
          </div>
          {/* 유튜브 */}
          <div
            className="flex flex-col items-center text-gray-600 hover:text-red-500 cursor-pointer"
            onClick={onGoToYoutube}
          >
            <FaYoutube className="w-6 h-6 md:w-8 md:h-8" />
            <p className="text-xs md:text-sm font-semibold mt-1">
              관련 먹방보기
            </p>
          </div>
          {/* 네이버 */}
          <div
            className="flex flex-col items-center text-gray-600 hover:text-yellow-500 cursor-pointer"
            onClick={onGoToNaverMap}
          >
            <FaMapMarkedAlt className="w-6 h-6 md:w-8 md:h-8" />
            <p className="text-xs md:text-sm font-semibold mt-1">
              주변 맛집찾기
            </p>
          </div>
          {/* 공유하기 */}
          <div
            className="flex flex-col items-center text-gray-600 hover:text-blue-500 cursor-pointer"
            onClick={onShare}
          >
            <FaShareAlt className="w-6 h-6 md:w-8 md:h-8" />
            <p className="text-xs md:text-sm font-semibold mt-1">공유하기</p>
          </div>
        </div>
      </div>

      {/* --- 메뉴 변경 버튼 --- */}
      <motion.button
        onClick={onRecommend}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isLoading}
        className="w-full bg-emerald-500 text-white font-bold py-3 rounded-lg hover:bg-emerald-600 transition-colors duration-300 disabled:bg-gray-400 cursor-pointer"
      >
        다른 메뉴 추천
      </motion.button>
    </>
  );
}
