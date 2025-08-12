/** @format */

import { Food } from "./type";

export const initialFood: Food = {
  id: 0,
  name: "뭐먹지?",
  description: "아래 버튼을 눌러 메뉴를 추천 받아보세요!",
  image_url: "/food.png",
  category: "all",
  recommend_age: "all",
  main_ingredient: "",
  type: "",
  situation: "",
  price_range: "",
};

export const mainIngredientOptions = [
  "돼지고기",
  "소고기",
  "닭고기",
  "해물",
  "채소",
  "기타",
];
export const typeOptions = ["밥", "면", "빵", "국물", "튀김", "기타"];
export const situationOptions = [
  "비",
  "매운거",
  "혼밥",
  "데이트",
  "치팅",
  "다이어트",
];
export const priceRangeOptions = ["만원이하", "이만원이하", "이만원초과"];
export const ageOptions = ["MZ", "classic"];

export const personalFilter = [
  {
    title: "주재료",
    key: "main_ingredient",
    options: mainIngredientOptions,
  },
  { title: "종류", key: "type", options: typeOptions },
  {
    title: "상황",
    key: "situation",
    options: situationOptions,
  },
  {
    title: "가격대",
    key: "price_range",
    options: priceRangeOptions,
  },
  { title: "세대", key: "recommend_age", options: ageOptions },
];
