/** @format */

import { FaTrophy } from "react-icons/fa";
import { Food } from "@/shared/types/type";
import { motion } from "framer-motion";

interface LikedPanelProps {
  likedFoods: Food[];
  onStartWorldCup: () => void;
  onRemoveFood: (id: number) => void;
}

export default function LikedPanel({
  likedFoods,
  onStartWorldCup,
  onRemoveFood,
}: LikedPanelProps) {
  const canStartWorldCup = likedFoods.length >= 2;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ ease: "easeInOut", duration: 0.3 }}
      className="w-80 bg-white shadow-xl rounded-lg p-6 flex flex-col h-[650px]"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        찜한 메뉴
      </h2>

      <div className="flex-grow overflow-y-auto space-y-4 pr-2">
        {likedFoods.length > 0 ? (
          likedFoods.map((food) => (
            <div
              key={food.id}
              className="flex items-center p-2 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              <span className="flex-grow font-semibold text-gray-700 px-3">
                {food.name}
              </span>
              <button
                onClick={() => onRemoveFood(food.id)}
                className="text-gray-400 hover:text-red-500 font-bold"
              >
                X
              </button>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 h-full flex flex-col justify-center items-center">
            <p>마음에 드는 메뉴를</p>
            <p>찜 해보세요!</p>
          </div>
        )}
      </div>

      <div className="mt-6">
        <motion.button
          onClick={onStartWorldCup}
          disabled={!canStartWorldCup}
          className="w-full bg-amber-500 text-white font-bold py-3 rounded-lg flex items-center justify-center transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
          whileHover={{ scale: canStartWorldCup ? 1.05 : 1 }}
        >
          <FaTrophy className="mr-2" />
          {canStartWorldCup ? "음식 월드컵 시작!" : "2개 이상 찜해야 시작 가능"}
        </motion.button>
      </div>
    </motion.div>
  );
}
