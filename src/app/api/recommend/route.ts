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
  } catch {}
}
