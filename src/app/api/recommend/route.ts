/** @format */

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // 새로운 필터 파라미터 가져오기
    const category = searchParams.get("category");
    const main_ingredient = searchParams.get("main_ingredient");
    const type = searchParams.get("type");
    const situation = searchParams.get("situation");
    const price_range = searchParams.get("price_range");
    const recommend_age = searchParams.get("recommend_age");

    // Supabase 쿼리 시작
    let query = supabase.from("dinner_menus").select("*", { count: "exact" });

    // 각 파라미터가 존재하면 쿼리에 필터 조건 추가
    if (category) query = query.eq("category", category);
    if (main_ingredient) query = query.eq("main_ingredient", main_ingredient);
    if (type) query = query.eq("type", type);
    if (situation) query = query.eq("situation", situation);
    if (price_range) query = query.eq("price_range", price_range);
    if (recommend_age) query = query.eq("recommend_age", recommend_age);

    // 필터링된 데이터 개수 가져오기
    const { count, error: countError } = await query;
    if (countError) throw countError;
    if (!count) {
      return NextResponse.json(null);
    }

    // 랜덤 메뉴 1개 가져오기
    const randomIndex = Math.floor(Math.random() * count);
    const { data: randomMenu, error: menuError } = await query
      .range(randomIndex, randomIndex)
      .single();
    if (menuError) throw menuError;

    return NextResponse.json(randomMenu);
  } catch (error) {
    console.error("Error fetching recommendation:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { error: "Failed to fetch recommendation", details: errorMessage },
      { status: 500 }
    );
  }
}
