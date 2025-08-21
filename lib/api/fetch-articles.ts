import { IArticle } from "@/types/articles.type";
import axios from "axios";

export async function fetchArticles(page: number = 1, limit: number = 10) {
    try {
        const res = await axios.get<{data: IArticle[]}>("https://test-fe.mysellerpintar.com/api/articles", {
            params: { page, limit }
        })

        if (!res.data.data) return null
        
        return res.data.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            console.error("Axios Error: ", {
                url: err.config?.url,
                method: err.config?.method,
                status: err.response?.status,
                data: err.response?.data,
            })
        } else {
            console.error("Unexpected Error: ", err)
        }

        return null
    }
}

export async function fetchArticlesByCategory(category: string) {
    const res = await axios.get("https://test-fe.mysellerpintar.com/api/articles", {
        params: { category }
    })

    return res.data.data
}