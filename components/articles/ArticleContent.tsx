"use client"

import { fetchArticles, fetchArticlesById } from "@/lib/api/fetch-articles"
import { IArticleData } from "@/types/articles.type"
import { useEffect, useState } from "react"
import { Poppins } from "next/font/google"
import Image from "next/image"

import { diffForHumans } from "@/lib/date"
import { useRouter } from "next/navigation"

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['400']
})

const ArticleContent = ({ id }: { id: string }) => {
  const [article, setArticle] = useState<IArticleData | null>(null)
  const [simmilarArticle, setSimmilarArticle] = useState<IArticleData[]>([])

  const router = useRouter()
  
  useEffect(() => {
    async function loadArticle() {
      const articleData = await fetchArticlesById({ id })
  
      setArticle(articleData)
      
      const articleDatas = await fetchArticles({ page: 1, limit: 3, category: articleData?.category.id ?? "" })
      setSimmilarArticle(articleDatas?.data ?? [])
    }

    loadArticle()

    if (!id) return
  }, [id])

  function handleRecommendationsClick(id: string) {
    router.push(`/articles/${id}`)
  }
  
  return (
    <div 
      className={`
        flex max-md:flex-col max-w-screen-xl h-screen mx-auto my-10
        ${poppins.className}
      `}
    >
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">
          {article?.title}
        </h2>

        <div className="flex px-3 py-1 text-black/60 gap-2 text-sm font-extralight">
          <h2 className="">{article?.user.username}</h2>
          <p>{diffForHumans(article?.updatedAt ?? "")}</p>
        </div>

        <h2 
          className="px-3 py-1 inline-block bg-rose-100 backdrop-blur-sm text-rose-600 text-xs font-semibold rounded-full shadow-md"
        >
          {article?.category.name}
        </h2>

        <p className="p-3 text-lg text-justify text-gray-950 font-light">{article?.content.replace(/<[^>]*>/g, '')}</p>
      </div>

      <div className="w-full md:w-80 space-y-3 md:mr-5 mx-auto max-md:my-10 md:ml-auto">
        <p className="text-2xl font-semibold text-gray-950">Recommendations</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
          {simmilarArticle.map((article, index) => (
            <div
              key={index}
              className="relative group aspect-video shadow-sm overflow-hidden rounded-md"
              onClick={() => handleRecommendationsClick(article.id)}
            >
              {article?.imageUrl ? (
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-black/60"></div>
              )}

              <div className="absolute px-3 py-2 bg-black/60 backdrop-blur-sm bottom-2 left-0 rounded-r-full p-1 break-all translate-x-0 md:-translate-x-full group-hover:translate-x-0 transition-all duration-500">
                <p className="text-white/80 text-sm">{article.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default ArticleContent

