import ArticleContent from "@/components/articles/ArticleContent"

const DetailArticle = async({ params }: { params: { [key: string]: string } }) => {
    const { id } = await params
    
    return (
        <ArticleContent id={id}></ArticleContent>
    )
}

export default DetailArticle
