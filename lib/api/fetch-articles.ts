import { IArticle, IArticleData } from "@/types/articles.type";
import axios from "axios";

export async function fetchArticles({ 
    page = 1, 
    limit = 10, 
    category, 
    title 
}: { 
    page?: number, 
    limit?: number, 
    category?: string, 
    title?: string 
}) {
    try {
        const res = await axios.get<IArticle>("https://test-fe.mysellerpintar.com/api/articles", {
            params: { page, limit, category, title }
        })

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

export async function fetchArticlesById({ id }: { id: string }) {
    try {
        const res = await axios.get<IArticleData>(`https://test-fe.mysellerpintar.com/api/articles/${id}`)

        const resData = res.data

        return {
            ...resData
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
        
        return null
    }
    
}