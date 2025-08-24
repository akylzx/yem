import { createClient } from "@/lib/supabase/server"
import NewsClient from "./NewsClient"

export default async function NewsPage() {
  const supabase = await createClient()
  const { data: newsData, error } = await supabase
    .from("news")
    .select("*")
    .order("publishDate", { ascending: false })

  if (error) {
    return <div className="p-8 text-red-600">Failed to load news: {error.message}</div>
  }

  return <NewsClient newsArticles={newsData || []} />
}