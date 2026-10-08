import CommentsItem from "./comments-item/CommentsItem";

export default function CommentsList({
    comments
}) {
    return (
        <div className="details-comments">
            <h2>Comments:</h2>
            <ul>
                {comments.map(comment => <CommentsItem key={comment.id} {...comment} />)}
            </ul>
            {comments.length === 0 && <p className="no-comment">No comments.</p>}
        </div>
    );
}
