const CommentsList = (({comments}) => {
    return (
        <>
            <h3>Comments:</h3>
            {comments.map(comment => (
                <div className="comment" key={comment.postedBy + ':' +comment.comment}>
                    {console.log(comment.postedBy)}
                    <h4>{comment.postedBy}</h4>
                    <p>{comment.comment}</p>
                </div>
            ))}
        </>
    )
})
export default CommentsList;