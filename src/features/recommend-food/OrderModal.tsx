/** @format */

import { AnimatePresence, motion } from "framer-motion";

import { XCircleIcon } from "@heroicons/react/24/solid";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  foodName: string;
}

export default function OrderModal({
  isOpen,
  onClose,
  foodName,
}: OrderModalProps) {
  const handleDeepLink = (platform: "baemin" | "coupang") => {
    const query = encodeURIComponent(foodName);
    let url = "";

    if (platform === "baemin") {
      url = `baemin://search?query=${query}`;
    } else if (platform === "coupang") {
      url = `coupangeats://search?keyword=${query}`;
    }

    window.open(url, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gray-300 bg-opacity-60 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-xl py-12 px-6 w-72 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 p-1 text-gray-400 hover:text-gray-600 rounded-full cursor-pointer transition-colors"
              aria-label="닫기"
            >
              <XCircleIcon className="w-7 h-7" />
            </button>
            <h3 className="text-center text-lg font-bold text-gray-800 mb-6">
              주문할 앱을 선택하세요
            </h3>
            <div className="space-y-5">
              <button
                onClick={() => handleDeepLink("baemin")}
                className="w-full flex items-center justify-center bg-[#2AC1BC] text-white font-bold py-3 rounded-lg text-lg"
              >
                🛵 배달의민족
              </button>
              <button
                onClick={() => handleDeepLink("coupang")}
                className="w-full flex items-center justify-center bg-[#00A4FF] text-white font-bold py-3 rounded-lg text-lg"
              >
                🚀 쿠팡이츠
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
