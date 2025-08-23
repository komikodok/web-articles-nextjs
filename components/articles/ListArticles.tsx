"use client"

import { fetchArticles } from "@/lib/api/fetch-articles"
import { IArticleData } from "@/types/articles.type"
import { useEffect, useState, useLayoutEffect } from "react"
import ArticleCard from "./ArticleCard"
import { articleAnimate } from "@/lib/animates/article.animate"
import { useSession } from "next-auth/react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function ListArticles() {
  const { data: session } = useSession()
  const searchParams = useSearchParams()

  const [articles, setArticles] = useState<IArticleData[]>([])
  const [lastPage, setLastPage] = useState(0)

  const currentPage = Number(searchParams.get("page") || 1)
  const limitPage = Number(searchParams.get("limit") || (session?.user.role === "User" ? 10 : 9))

  useEffect(() => {

    async function loadArticles() {
      const res = await fetchArticles(currentPage, limitPage)

      setArticles(res?.data ?? [])
      setLastPage(res?.lastPage ?? 0)
    }

    loadArticles()
  }, [currentPage, limitPage])

  useLayoutEffect(() => {
    articleAnimate(".article-card")
  }, [articles])

  return (
    <div className="space-y-10 my-10">
      <PaginationArticle currentPage={currentPage} lastPage={lastPage} />

      {articles?.map((article: IArticleData) => (
        <div key={article.id} className="article-card opacity-0 translate-y-100">
          <ArticleCard {...article} />
        </div>
      ))}
    </div>
  )
}

export function PaginationArticle({ currentPage, lastPage }: { currentPage: number; lastPage: number }) {
  const pathname = usePathname()
  const router = useRouter()

  function handlePageChange(page: number) {
    router.push(`${pathname}?page=${page}`)
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem aria-disabled={currentPage === 1} className="cursor-pointer">
          <PaginationPrevious onClick={() => handlePageChange(Math.max(1, currentPage - 1))} />
        </PaginationItem>

        <PaginationItem aria-disabled={currentPage === lastPage} className="cursor-pointer">
          <PaginationNext onClick={() => handlePageChange(Math.min(lastPage, currentPage + 1))} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
