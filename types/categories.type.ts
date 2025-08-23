export interface ICategoryData {
    id: string,
    userId: string,
    name: string,
    createdAt: string,
    updatedAt: string
}

export interface ICategory {
    data: ICategoryData[],
    totalData: number,
    currentPage: number,
    totalPages: number
}