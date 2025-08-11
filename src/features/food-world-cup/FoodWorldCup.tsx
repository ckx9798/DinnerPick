/** @format */

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { FaTrophy } from "react-icons/fa";
import { Food } from "@/shared/types/type";
import WorldCupImage from "./WorldCupImage";
import { XMarkIcon as XIcon } from "@heroicons/react/24/solid";

interface FoodWorldCupProps {
  initialFoods: Food[];
  onClose: () => void;
  setIsPanelModalOpen: (isOpen: boolean) => void;
}

// --- 랜덤 배열 로직 ---
const shuffleArray = (array: Food[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function FoodWorldCup({
  initialFoods,
  onClose,
  setIsPanelModalOpen,
}: FoodWorldCupProps) {
  const [contestants, setContestants] = useState<Food[]>([]);
  const [winners, setWinners] = useState<Food[]>([]);
  const [currentMatchup, setCurrentMatchup] = useState<[Food, Food] | null>(
    null
  );
  const [finalWinner, setFinalWinner] = useState<Food | null>(null);
  const [stageSize, setStageSize] = useState(0);

  useEffect(() => {
    const powerOfTwo = Math.pow(2, Math.floor(Math.log2(initialFoods.length)));
    const shuffled = shuffleArray(initialFoods).slice(0, powerOfTwo);
    setContestants(shuffled);
    setStageSize(shuffled.length);
  }, [initialFoods]);

  useEffect(() => {
    if (contestants.length > 1) {
      setCurrentMatchup([contestants[0], contestants[1]]);
    } else if (contestants.length === 1 && winners.length === 0) {
      setFinalWinner(contestants[0]);
    }
  }, [contestants, winners]);

  const handleSelect = (winner: Food) => {
    const newWinners = [...winners, winner];
    const remainingContestants = contestants.slice(2);

    if (remainingContestants.length > 0) {
      setWinners(newWinners);
      setContestants(remainingContestants);
    } else {
      if (newWinners.length === 1) {
        setFinalWinner(newWinners[0]);
      } else {
        const nextRoundContestants = shuffleArray(newWinners);
        setContestants(nextRoundContestants);
        setStageSize(nextRoundContestants.length);
        setWinners([]);
      }
    }
  };

  const getRoundTitle = () => {
    if (finalWinner) return "최종 우승!";
    if (stageSize === 2) return "결승전";
    if (stageSize === 4) return "준결승 (4강)";
    if (stageSize === 0) return "월드컵 로딩중...";
    return `${stageSize}강`;
  };

  const handleFinalClose = () => {
    onClose();
    setIsPanelModalOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50 p-4"
    >
      <button onClick={onClose} className="absolute top-4 right-4 text-white">
        <XIcon className="w-8 h-8" />
      </button>

      <h2 className="text-4xl font-bold text-white mb-4 lg:mb-8">
        {getRoundTitle()}
      </h2>

      <AnimatePresence mode="wait">
        {finalWinner ? (
          // 최종 우승 UI
          <motion.div key="winner" className="flex flex-col items-center">
            <FaTrophy className="text-yellow-400 text-5xl lg:text-7xl mb-4" />
            <div className="relative w-80 h-80">
              <WorldCupImage food={finalWinner} />
            </div>
            <h3 className="text-3xl font-bold text-white mt-6">
              {finalWinner.name}
            </h3>
            <button
              onClick={handleFinalClose}
              className="mt-8 bg-emerald-500 text-white font-bold py-3 px-8 rounded-lg"
            >
              닫기
            </button>
          </motion.div>
        ) : (
          currentMatchup && (
            // 대결 화면 UI
            <motion.div
              key={stageSize}
              className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl"
            >
              {/* 왼쪽 선택지 */}
              <motion.div
                onClick={() => handleSelect(currentMatchup[0])}
                className="w-full md:w-1/2 p-2 flex flex-col items-center cursor-pointer group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative w-full h-64 md:h-80">
                  <WorldCupImage food={currentMatchup[0]} />
                </div>
                <h3 className="text-md lg:text-2xl font-bold text-white mt-4 group-hover:text-yellow-400">
                  {currentMatchup[0].name}
                </h3>
              </motion.div>
              <span className="text-3xl md:text-5xl font-bold text-white my-2 md:my-0 md:mx-8">
                VS
              </span>
              {/* 오른쪽 선택지 */}
              <motion.div
                onClick={() => handleSelect(currentMatchup[1])}
                className="w-full md:w-1/2 p-2 flex flex-col items-center cursor-pointer group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative w-full h-64 md:h-80">
                  <WorldCupImage food={currentMatchup[1]} />
                </div>
                <h3 className="text-md lg:text-2xl font-bold text-white mt-4 group-hover:text-yellow-400">
                  {currentMatchup[1].name}
                </h3>
              </motion.div>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </motion.div>
  );
}
