/** @format */

import { AnimatePresence, motion } from "framer-motion";

import { Food } from "@/shared/types/type";
import { HeartIcon } from "@heroicons/react/24/solid";
import LikedPanel from "./LikePanel";

interface LikedFoodsUIProps {
  likedFoods: Food[];
  isPanelModalOpen: boolean;
  setIsPanelModalOpen: (isOpen: boolean) => void;
  onStartWorldCup: () => void;
  onRemoveFood: (id: number) => void;
}

export default function LikedFoodsUI({
  likedFoods,
  isPanelModalOpen,
  setIsPanelModalOpen,
  onStartWorldCup,
  onRemoveFood,
}: LikedFoodsUIProps) {
  if (likedFoods.length === 0) {
    return null;
  }

  return (
    <>
      {/* --- 데스크톱용 찜 패널 --- */}
      <AnimatePresence>
        <motion.div
          className="hidden xl:block absolute left-4/6 top-28 ml-12"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
        >
          <LikedPanel
            likedFoods={likedFoods}
            onStartWorldCup={onStartWorldCup}
            onRemoveFood={onRemoveFood}
          />
        </motion.div>
      </AnimatePresence>

      {/* --- 모바일용 플로팅 버튼(FAB) --- */}
      <AnimatePresence>
        <motion.button
          className="xl:hidden fixed bottom-6 right-6 bg-emerald-500 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-40"
          onClick={() => setIsPanelModalOpen(true)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          aria-label="찜한 메뉴 보기"
        >
          <HeartIcon className="w-8 h-8" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {likedFoods.length}
          </span>
        </motion.button>
      </AnimatePresence>

      {/* --- 모바일용 찜 패널 모달 --- */}
      <AnimatePresence>
        {isPanelModalOpen && (
          <motion.div
            className="xl:hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setIsPanelModalOpen(false)}
          >
            <motion.div
              className="w-full max-w-sm"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <LikedPanel
                likedFoods={likedFoods}
                onStartWorldCup={onStartWorldCup}
                onRemoveFood={onRemoveFood}
                onClose={() => setIsPanelModalOpen(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
