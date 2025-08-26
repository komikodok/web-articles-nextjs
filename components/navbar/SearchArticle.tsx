"use client"

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Poppins } from 'next/font/google'
import { fetchArticles } from '@/lib/api/fetch-articles'
import { IArticleData } from '@/types/articles.type'


import { useDebounce } from "use-debounce"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['400']
})

const SearchArticle = () => {
    const [search, setSearch] = useState<string>("")
    const [articles, setArticles] = useState<IArticleData[]>([])

    const { data: session } = useSession()

    const [debouncedSearch] = useDebounce(search, 300)
    const router = useRouter()

    useEffect(() => {
        async function loadArticles() {
            const { data } = await fetchArticles({ title: debouncedSearch })

            setArticles(data ?? [])

            if (!debouncedSearch) {
                setArticles([])
                return
            }
        }

        loadArticles()
    }, [debouncedSearch])

    function handleSearchClick(title: string) {
        router.push(`/articles?title=${title}`)
    }

    if (!session?.user) return null

    return (
        <div className='relative'>
            <Input 
                className={`
                    border-1 border-rose-200 placeholder:text-rose-300 focus-visible:border-rose-400 rounded-md outline-none focus-visible:ring-0.5
                    ${poppins.className}
                `}
                value={search}
                placeholder='Search article...'
                onChange={(e) => setSearch(e.target.value)}
            />

            <Search 
                className={`
                    absolute right-2 top-2  text-rose-800 transition-all duration-500
                    ${search ? "opacity-100" : "opacity-50"}
                `} 
            />

            <ul className='absolute top-[130%] -left-10 w-72 max-h-96 overflow-y-scroll scroll-left-20 space-3 bg-gray-50 rounded-md z-50'>
                {
                    articles.map((articles, index) => (
                        <li
                            key={index}
                            className='cursor-pointer px-3 py-2 bg-gradient-to-r rounded-md from-rose-50 to-orange-50 hover:from-rose-100 hover:to-orange-100 hover:text-rose-500 font-semibold transition-all duration-500'
                            onClick={() => handleSearchClick(articles.title)}
                        >
                            {articles.title}
                        </li>
                ))}
            </ul>
        </div>
    )
}

export default SearchArticle
