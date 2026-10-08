import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getDocumentsWhere } from "../../utils/firestoreService";
import CommentsItem from "./comments-item/CommentsItem";

export default function CommentsList() {
    const { gameId } = useParams();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();

        getDocumentsWhere("comments", "game_id", gameId, { signal: abortController.signal })
            .then(setComments)
            .catch(err => {
                if (err.name === 'AbortError') {
                    return;
                }

                alert(err.message);
            });

        return () => {
            abortController.abort();
        }
    }, [gameId]);

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
