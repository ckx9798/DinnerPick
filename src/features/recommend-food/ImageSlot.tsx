/** @format */

"use client";

import "swiper/css";
import "swiper/css/effect-coverflow";

import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";

const foodImages = [
  "burger.png",
  "chiken.png",
  "kimchistew.png",
  "pizza.png",
  "ramen.png",
  "rice.png",
  "shushi.png",
  "tteokbokki.png",
];

export default function ImageSlot() {
  return (
    <div className="w-full">
      <Swiper
        // --- 슬롯 옵션 ---
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        loop={true} // 무한 반복
        autoplay={{
          delay: 200, // 0.3초마다 넘어감
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 50,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[Autoplay, EffectCoverflow]}
        className="mySwiper"
      >
        {foodImages.map((imageName, index) => (
          <SwiperSlide
            key={index}
            className="!w-[180px] !h-[210px] lg:!w-[280px] lg:!h-[360px]"
          >
            <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
              <Image
                src={`/food/${imageName}`}
                alt={imageName.split(".")[0]}
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
