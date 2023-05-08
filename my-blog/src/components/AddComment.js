import axios from "axios";
import { useState } from "react";
import useUser from "../hooks/useUser";

const AddComment = ({articleName, onCommentPosted}) => {
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [user] = useUser();

    const addcomment = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? {authtoken : token} : {};
        const response = await axios.post(`/api/articles/${articleName}/comment`, {
            postedBy: name,
            comment: comment
        }, {headers});
        onCommentPosted(response.data);
        setName('');
        setComment('');
    }

    return (
        <>
        <div>
            <h3>Add Comment</h3>
            {user && <p>You are commenting as {user.email}</p>}
            <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                rows="4"
                cols="50" 
            />
            <button onClick={addcomment}>Post</button>
        </div>
        </>
    )
}

export default AddComment;