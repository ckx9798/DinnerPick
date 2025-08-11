/** @format */

import { useEffect, useState } from "react";

import { Food } from "@/shared/types/type";
import Image from "next/image";

interface WorldCupImageProps {
  food: Food;
}

export default function WorldCupImage({ food }: WorldCupImageProps) {
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [food.id]);

  return (
    <Image
      src={isError ? "/food.png" : food.image_url || "/food.png"}
      alt={food.name}
      layout="fill"
      objectFit="cover"
      className="rounded-lg shadow-xl"
      onError={() => setIsError(true)}
    />
  );
}
