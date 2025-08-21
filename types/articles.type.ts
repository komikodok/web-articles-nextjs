export interface IUser {
  id: string
  username: string
}

export interface ICategory {
  id: string
  userId: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface IArticle {
  id: string
  userId: string
  categoryId: string
  title: string
  content: string
  imageUrl: string
  createdAt: string
  updatedAt: string
  category: ICategory
  user: IUser
}

export interface IArticleCard {
  id: string,
  title: string,
  content: string,
  imageUrl: string,
  category: {
    name: string
  }
}
