import articles from "./article-content"
import { useParams } from "react-router-dom"
import NotFoundPage from "./NotFoundPage";

const ArticlePage = () => {
    const {articleId} = useParams();

    let article = articles.find(article => article.name === articleId)
    if (!article) {
        return <NotFoundPage />
    }

    return (
        <>
          <h1>{article.title}</h1>
          <p key={article.name}>{article.content[0]}</p>  
        </>
    )
}

export default ArticlePage