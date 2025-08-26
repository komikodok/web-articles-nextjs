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
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"

export function ListArticles() {
  const { data: session } = useSession()
  const searchParams = useSearchParams()

  const [articles, setArticles] = useState<IArticleData[]>([])
  const [lastPage, setLastPage] = useState(0)

  const currentPage = Math.max(1, Number(searchParams.get("page") || 1))
  const limitPage = Number(searchParams.get("limit") || (session?.user.role === "User" ? 10 : 9))
  const category = searchParams.get("category") || ""
  const title = searchParams.get("title") || ""

  useEffect(() => {

    async function loadArticles() {
      const articleDatas = await fetchArticles({ page: currentPage, limit: limitPage, category: category, title: title })

      setArticles(articleDatas?.data ?? [])
      setLastPage(articleDatas?.lastPage ?? 0)
    }

    loadArticles()
  }, [currentPage, limitPage, category, title])

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
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function getPages(currentPage: number): number[] {

    if (currentPage >= 3) return Array.from({ length: 3 }, (_, i) => i + 2)

    return Array.from({ length: 3 }, (_, i) => i + 1)
  
  }

  if (lastPage <= 1) return null
  
  return (
    <>
    <Pagination>
      <PaginationContent>
        <PaginationItem 
          aria-disabled={currentPage === 1} 
          className={`
            cursor-pointer
            ${currentPage === 1 && "pointer-events-none opacity-50"}
          `}
        >
          <PaginationPrevious className="bg-rose-200 hover:bg-rose-400/50" onClick={() => handlePageChange(Math.max(1, currentPage - 1))} />
        </PaginationItem>

        {getPages(currentPage).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => handlePageChange(page)}
              className={`
                bg-rose-100 hover:bg-rose-200 cursor-pointer
                ${page === currentPage ? "font-bold bg-rose-200 hover:bg-rose-400/50" : ""}
              `}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {currentPage < (lastPage - 1) && <PaginationEllipsis />}

        {!getPages(currentPage).includes(lastPage) && (
          <PaginationItem>
            <PaginationLink 
              onClick={() => handlePageChange(lastPage)}
              className={`
                bg-rose-100 hover:bg-rose-200
                ${lastPage === currentPage ? "bg-rose-200 hover:bg-rose-400/50" : ""}
              `}
            >
              {lastPage}
            </PaginationLink>
          </PaginationItem>
        )}


        <PaginationItem 
          aria-disabled={currentPage === lastPage} 
          className={`
            cursor-pointer
            ${currentPage === lastPage && "pointer-events-none opacity-50"}
          `}
        >
          <PaginationNext className="bg-rose-200 hover:bg-rose-400/50" onClick={() => handlePageChange(Math.min(lastPage, currentPage + 1))} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
    </>
  )
}
