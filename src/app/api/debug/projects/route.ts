// src/app/api/debug/projects/route.ts
import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supa = supabaseService();
    const { data, error } = await supa
      .from("projects_public")
      .select("id, title, slug, year")
      .limit(5);

    return NextResponse.json({
      ok: !error,
      env: { url: process.env.NEXT_PUBLIC_SUPABASE_URL },
      sample: data ?? null,
      error: error?.message ?? null,
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message ?? e) }, { status: 500 });
  }
}
