import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export async function GET() {
  const supa = supabaseService();
  const { data, error } = await supa
    .from("projects")
    .select("id, title, slug, summary, tech_stack, repo_url, live_url, cover_url")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, data });
}
