"use client"

import { fetchArticles } from "@/lib/api/fetch-articles"
import { IArticle } from "@/types/articles.type"
import { useEffect, useState } from "react"
import ArticleCard from "./ArticleCard"
import { articleAnimate } from "@/lib/animates/article.animate"
import { useSession } from "next-auth/react"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function ListArticles({ searchParams }: { searchParams: { [key: string]: string } }) {
    const [articles, setArticles] = useState<IArticle[] | null>([])

    const { data: session } = useSession()
    
    const currentPage = parseInt(searchParams.page ?? "1")
    const limitPage = parseInt(searchParams.limit ?? session?.user.role === "User" ? "10" : "9")

    useEffect(() => {
        articleAnimate(".article-card")
        const loadArticles = async () => {
            const datas = await fetchArticles(currentPage, limitPage)

            setArticles(datas)
        }

        loadArticles()
    })
    return (
        <div className="space-y-10 my-10">
            <PaginationDemo></PaginationDemo>

            {
                articles?.map((article: IArticle) => (
                    <div key={article.id} className="article-card opacity-0 translate-y-100">
                        <ArticleCard
                            id={article.id}
                            title={article.title}
                            content={article.content}
                            imageUrl={article.imageUrl}
                            category={article.category}
                            />
                    </div>
                ))
            }
        </div>
    )
}

export function PaginationDemo() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}