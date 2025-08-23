import { ICategory } from "@/types/categories.type";
import axios from "axios";


export async function fetchCategories(page: number = 1, limit: number = 10, search: string = "") {
    try {
        const res = await axios.get<ICategory>("https://test-fe.mysellerpintar.com/api/categories", {
            params: {
                page,
                limit,
                search
            }
        })

        if (res.status !== 200) return

        const resData = res.data

        return {
            ...resData,
            lastPage: Math.ceil(resData.totalData / limit)    
        }
    } catch(err) {
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
            totalData: 0,
            currentPage: 0,
            lastPage: 0,
            totalPages: 0
        }
    }
}
