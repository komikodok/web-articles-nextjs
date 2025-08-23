import { IArticle } from "@/types/articles.type";
import axios from "axios";

export async function fetchArticles(page: number = 1, limit: number = 10) {
    try {
        const res = await axios.get<IArticle>("https://test-fe.mysellerpintar.com/api/articles", {
            params: { page, limit }
        })

        if (res.status !== 200) return

        const resData = res.data
        
        return {
            data: resData.data,
            total: resData.total,
            page: resData.page,
            limit: resData.limit,
            lastPage: Math.ceil(resData.total / resData.limit),
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            console.error("Axios Error: ", {
                url: err.config?.url,
                method: err.config?.method,
                status: err.response?.status,
            })
        } else {
            console.error("Unexpected Error: ", err)
        }

        return {
            data: [],
            total: 0,
            page: 0,
            limit: 0,
            lastPage: 0
        }
    }
}

export async function fetchArticlesByCategory(category: string) {
    const res = await axios.get("https://test-fe.mysellerpintar.com/api/articles", {
        params: { category }
    })

    return res.data.data
}