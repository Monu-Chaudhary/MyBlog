import articles from "./article-content";
import axios from 'axios';
import { useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import { useEffect, useState } from "react";
import CommentsList from "../components/CommentsList";
import AddComment from "../components/AddComment";
import useUser  from "../hooks/useUser";
import { Link } from "react-router-dom";

const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({ votes: 0, comments: [], canUpvote: false});
    const canUpvote = articleInfo.canUpvote;
    const { articleId } = useParams();

    const [user, isLoading] = useUser();

    useEffect(() => {
        const loadArticleInfo = (async () => {
            const token = user && await user.getIdToken();
            const headers = token ? {authtoken : token} : {};
            const response = await axios.get(`/api/articles/${articleId}/`, {headers});
            setArticleInfo(response.data)
        });
        if (isLoading) loadArticleInfo();
    }, [user, isLoading]);

    let article = articles.find(article => article.name === articleId)
    if (!article) {
        return <NotFoundPage />
    }

    const voteArticle = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? {authtoken : token} : {};
        const response = await axios.put(`/api/articles/${articleId}/upvote`, null, {headers});
        setArticleInfo(response.data);
    }

    return (
        <>
            <h1>{article.title}</h1>
            <p key={article.name}>{article.content[0]}</p>
            {user ?
                <button onClick={voteArticle}>{canUpvote ? "Upvote" : "Already Upvoted"}</button> 
                : <Link to="/login">Login to Upvote</Link>}
             <p>The number of upvotes are <b>{articleInfo.votes}</b>.</p>
            <CommentsList comments={articleInfo.comments}></CommentsList>
            {user ? 
                <AddComment articleName={articleId} onCommentPosted={(updatedArticle) => setArticleInfo(updatedArticle)} />
                : <a href="/login"><button>Login to Comment</button></a>}
        </>
    )
}

export default ArticlePage