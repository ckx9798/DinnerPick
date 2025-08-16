/** @format */

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import ActionButtons from "./ActionButtons";
import { Food } from "@/shared/types/type";
import Image from "next/image";
import ImageSlot from "./ImageSlot";
import OrderModal from "./OrderModal";
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
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    setIsImageError(false);
  }, [food.id]);

  return (
    <>
      <div className="relative w-full aspect-[4/3] mb-6 rounded-lg bg-white">
        <AnimatePresence>
          {isLoading && (
            <motion.div
              key="slot"
              className="absolute inset-0"
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
            >
              <ImageSlot />
            </motion.div>
          )}

          {!isLoading && (
            <motion.div
              key={food.id || "final"}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={
                  isImageError
                    ? initialFood.image_url
                    : food.image_url || initialFood.image_url
                }
                alt={food.name}
                fill
                className="rounded-lg object-cover"
                priority
                onError={() => setIsImageError(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- 음식 설명 영역 --- */}
      <div className="text-center mb-6 min-h-[60px]">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          {food.name}
        </h2>
        <p className="text-gray-600 mt-2 text-xs md:text-lg">
          {food.description}
        </p>
        <ActionButtons
          isLiked={isLiked}
          onLike={onLike}
          onGoToYoutube={onGoToYoutube}
          onGoToNaverMap={onGoToNaverMap}
          onShare={onShare}
          onOpenOrderModal={() => setIsOrderModalOpen(true)}
        />
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

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        foodName={food.name}
      />
    </>
  );
}
