import { ListArticles } from "@/components/articles/ListArticles"
import { SessionProvider } from "next-auth/react"

function Articles() {
  return (
    <>
      <SessionProvider>
        <ListArticles />
      </SessionProvider>
    </>
  )
}

export default Articles
