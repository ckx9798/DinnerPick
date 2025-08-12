/** @format */

export interface Food {
  id: number;
  name: string;
  description: string;
  image_url: string;
  category: string;
  recommend_age: string;
  main_ingredient: string;
  type: string;
  situation: string;
  price_range: string;
}

export const categoryMap: { [key: string]: string } = {
  전체: "",
  한식: "korean",
  중식: "chinese",
  일식: "japanese",
  이탈리안: "italian",
  아시안: "asian",
  멕시칸: "mexican",
  패스트푸드: "fastfood",
  분식: "bunsik",
};
