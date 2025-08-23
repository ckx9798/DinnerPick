/** @format */

"use client";

import Image from "next/image";
import type { Menu } from "@/app/allfood/page";
import { useState } from "react";

interface MenuCardProps {
  menu: Menu;
}

// 최종 fallback으로 사용할 정적 이미지 경로 (public 폴더 기준)
const DEFAULT_IMAGE_URL = "/food.png";

export default function MenuCard({ menu }: MenuCardProps) {
  const [imageSrc, setImageSrc] = useState(menu.image_url);

  const handleError = () => {
    // 에러 발생 시 무조건 기본 이미지로 교체
    setImageSrc(DEFAULT_IMAGE_URL);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="relative w-full h-40">
        <Image
          src={imageSrc || DEFAULT_IMAGE_URL}
          alt={menu.name || "음식 이미지"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 33vw"
          onError={handleError}
          priority={false}
        />
      </div>
      <div className="p-3">
        <h3 className="text-base font-bold text-gray-900 truncate">
          {menu.name}
        </h3>
        <p className="mt-1 text-xs text-gray-600 h-8 line-clamp-2">
          {menu.description}
        </p>
      </div>
    </div>
  );
}
