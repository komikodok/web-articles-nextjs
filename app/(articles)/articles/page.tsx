import { ListArticles } from "@/components/articles/ListArticles"
import { SessionProvider } from "next-auth/react"

function Articles({ searchParams }: { searchParams: { [key: string]: string } }) {
  return (
    <>
      <SessionProvider>
        <ListArticles searchParams={searchParams}/>
      </SessionProvider>
    </>
  )
}

export default Articles
