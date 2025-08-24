"use client"

import { PageLayout } from "@/components/page-layout"
import { SectionContainer } from "@/components/section-container"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  ArrowUpDown,
  Bookmark,
  BookmarkCheck,
  Clock,
  User,
  Heart,
  Brain,
  Pill,
  Stethoscope,
  ChevronDown,
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const categories = ["All", "Cardiology", "Neurology", "Oncology", "Endocrinology", "Mental Health", "Technology"]

const categoryIcons = {
  Cardiology: <Heart className="w-4 h-4" />,
  Neurology: <Brain className="w-4 h-4" />,
  Oncology: <Stethoscope className="w-4 h-4" />,
  Endocrinology: <Pill className="w-4 h-4" />,
  "Mental Health": <Brain className="w-4 h-4" />,
  Technology: <Stethoscope className="w-4 h-4" />,
}

export default function NewsClient({ newsArticles }: { newsArticles: any[] }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [favorites, setFavorites] = useState<number[]>([])
  const [sortBy, setSortBy] = useState("newest")
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  const filteredArticles = newsArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.tags || []).some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      case "oldest":
        return new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime()
      case "title":
        return a.title.localeCompare(b.title)
      case "category":
        return a.category.localeCompare(b.category)
      case "readTime":
        return Number.parseInt(a.readTime) - Number.parseInt(b.readTime)
      default:
        return 0
    }
  })

  const toggleFavorite = (articleId: number) => {
    setFavorites((prev) => (prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId]))
  }

  const featuredArticles = sortedArticles.filter((article) => article.featured)
  const regularArticles = sortedArticles.filter((article) => !article.featured)

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "title", label: "Title A-Z" },
    { value: "category", label: "Category" },
    { value: "readTime", label: "Read Time" },
  ]

  return (
    <PageLayout>
      <SectionContainer background="white" size="lg">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Health News & Discoveries</h1>
          <p className="text-gray-600 text-lg mb-8">
            Stay updated with the latest medical research, breakthrough treatments, and healthcare innovations
          </p>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search articles, topics, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 border-gray-200 focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div className="relative">
              <Button
                variant="outline"
                className="gap-2 h-12 px-6 border-gray-200 hover:bg-gray-50 bg-transparent"
                onClick={() => setShowSortDropdown(!showSortDropdown)}
              >
                <ArrowUpDown className="w-4 h-4" />
                Sort
                <ChevronDown className="w-4 h-4" />
              </Button>
              {showSortDropdown && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                        sortBy === option.value ? "bg-green-50 text-green-700" : ""
                      }`}
                      onClick={() => {
                        setSortBy(option.value)
                        setShowSortDropdown(false)
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`gap-2 h-10 px-4 ${
                  selectedCategory === category
                    ? "bg-green-600 hover:bg-green-700 text-white border-green-600"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {category !== "All" && categoryIcons[category as keyof typeof categoryIcons]}
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-600 text-sm">{sortedArticles.length} articles found</p>
          <Link href="#" className="text-green-600 hover:text-green-700 text-sm font-medium">
            {favorites.length} Favorites
          </Link>
        </div>

        {featuredArticles.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Stories</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow border-gray-200">
                  <div className="relative">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-green-600 text-white">Featured</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(article.id)}
                      className="absolute top-4 right-4 bg-white/90 hover:bg-white"
                    >
                      {favorites.includes(article.id) ? (
                        <BookmarkCheck className="w-4 h-4 text-green-600" />
                      ) : (
                        <Bookmark className="w-4 h-4 text-gray-600" />
                      )}
                    </Button>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
                        {article.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{article.title}</h3>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-3">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <User className="w-4 h-4" />
                        <span>{article.author}</span>
                        <span>•</span>
                        <span>{new Date(article.publishDate).toLocaleDateString()}</span>
                      </div>
                      <Link href={`/news/${article.id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-200 text-gray-700 hover:bg-gray-50 bg-transparent"
                        >
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Articles */}
        {regularArticles.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Latest Articles</h2>
            <div className="grid gap-6">
              {regularArticles.map((article) => (
                <Card
                  key={article.id}
                  className="overflow-hidden hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-800"
                >
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-4 gap-0">
                      <div className="md:col-span-1">
                        <img
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:col-span-3 p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs dark:bg-gray-700 dark:text-gray-200">
                              {article.category}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                              <Clock className="w-3 h-3" />
                              {article.readTime}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFavorite(article.id)}
                            className="hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            {favorites.includes(article.id) ? (
                              <BookmarkCheck className="w-4 h-4 text-green-600" />
                            ) : (
                              <Bookmark className="w-4 h-4 dark:text-white" />
                            )}
                          </Button>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
                        <p className="text-gray-600 mb-4">{article.excerpt}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {article.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs dark:border-gray-700 dark:text-gray-200"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <User className="w-4 h-4" />
                            <span>{article.author}</span>
                            <span>•</span>
                            <span>{new Date(article.publishDate).toLocaleDateString()}</span>
                          </div>
                          <Link href={`/news/${article.id}`}>
                            <Button
                              variant="outline"
                              className="bg-transparent dark:bg-gray-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-600"
                            >
                              Read Full Article
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {sortedArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">Try adjusting your search terms or category filters</p>
          </div>
        )}
      </SectionContainer>
    </PageLayout>
  )
}