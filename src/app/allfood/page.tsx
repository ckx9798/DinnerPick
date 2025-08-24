/** @format */

import MenuAccordion from "@/features/allfood/MenuAccordion";
export type Menu = {
  id: number;
  name: string | null;
  description: string | null;
  main_ingredient: string | null;
  image_url: string | null;
  category?: string;
};

export type GroupedMenus = {
  [category: string]: Menu[];
};

// 그룹화된 메뉴 데이터를 가져오는 함수
async function getMenusByCategory(): Promise<GroupedMenus> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const res = await fetch(`${apiUrl}/api/category`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch menus by category");
    }

    return res.json();
  } catch (error) {
    console.error("Error in getMenusByCategory:", error);
    return {};
  }
}

export default async function AllFoodPage() {
  const groupedMenus = await getMenusByCategory();

  return (
    <div className="bg-white h-full min-h-screen">
      <main className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8 py-8 font-sans bg-white">
        <h1 className="text-center mb-8 text-2xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
          <span className="mr-2">🍽️</span> 전체 메뉴
        </h1>

        <MenuAccordion data={groupedMenus} />
      </main>
    </div>
  );
}
