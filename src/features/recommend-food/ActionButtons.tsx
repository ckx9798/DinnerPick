/** @format */

import {
  FaHeart,
  FaMapMarkedAlt,
  FaMotorcycle,
  FaShareAlt,
  FaYoutube,
} from "react-icons/fa";

interface ActionButtonsProps {
  isLiked: boolean;
  onLike: () => void;
  onGoToYoutube: () => void;
  onGoToNaverMap: () => void;
  onShare: () => void;
  onOpenOrderModal: () => void;
}

export default function ActionButtons({
  isLiked,
  onLike,
  onGoToYoutube,
  onGoToNaverMap,
  onShare,
  onOpenOrderModal,
}: ActionButtonsProps) {
  return (
    <div className="flex justify-center lg:justify-between space-x-4 mt-5 lg:my-7 px-1 lg:px-8">
      {/* 찜하기 */}
      <div
        className={`flex flex-col items-center cursor-pointer transition-colors duration-200 min-w-11 ${
          isLiked ? "text-pink-500" : "text-gray-600 hover:text-pink-400"
        }`}
        onClick={onLike}
      >
        <FaHeart className="w-6 h-6 md:w-8 md:h-8" />
        <p className="text-xs md:text-sm font-semibold mt-1">월드컵 찜</p>
      </div>
      {/* 유튜브 */}
      <div
        className="flex flex-col items-center text-gray-600 hover:text-red-500 cursor-pointer min-w-11"
        onClick={onGoToYoutube}
      >
        <FaYoutube className="w-6 h-6 md:w-8 md:h-8" />
        <p className="text-xs md:text-sm font-semibold mt-1">관련 먹방</p>
      </div>
      {/* 네이버 */}
      <div
        className="flex flex-col items-center text-gray-600 hover:text-yellow-500 cursor-pointer min-w-11"
        onClick={onGoToNaverMap}
      >
        <FaMapMarkedAlt className="w-6 h-6 md:w-8 md:h-8" />
        <p className="text-xs md:text-sm font-semibold mt-1">주변 맛집</p>
      </div>
      {/* 공유하기 */}
      <div
        className="flex flex-col items-center text-gray-600 hover:text-blue-500 cursor-pointer min-w-11"
        onClick={onShare}
      >
        <FaShareAlt className="w-6 h-6 md:w-8 md:h-8" />
        <p className="text-xs md:text-sm font-semibold mt-1">공유</p>
      </div>
      {/* 주문하기 (모바일) */}
      <div
        className="flex flex-col items-center text-gray-600 hover:text-emerald-500 cursor-pointer md:hidden min-w-11"
        onClick={onOpenOrderModal}
      >
        <FaMotorcycle className="w-6 h-6 md:w-8 md:h-8" />
        <p className="text-xs md:text-sm font-semibold mt-1">주문</p>
      </div>
    </div>
  );
}
