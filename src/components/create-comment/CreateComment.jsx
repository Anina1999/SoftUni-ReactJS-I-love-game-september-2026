import { useParams } from "react-router";
import { serverTimestamp } from "firebase/firestore";
import { addDocument } from "../../utils/firestoreService";

export default function CreateComment({
    user
}) {
    const { gameId } = useParams();

    const addCommentAction = async (formData) => {
        const text = formData.get("text").trim();

        if (!text) {
            alert("Comment cannot be empty!");
            return;
        }

        try {
            await addDocument("comments", {
                game_id: gameId,
                author: user?.email,
                text,
                created_at: serverTimestamp(),
            });
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <article className="create-comment">
            <label>Add new comment:</label>
            <form className="form" action={addCommentAction}>
                <textarea name="text" placeholder="Comment......" />
                <input className="btn submit" type="submit" value="Add Comment" />
            </form>
        </article>
    );
}
