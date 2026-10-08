export default function CommentsItem({
    text,
    author
}) {
    return (
        <li className="comment">
            <p>
                {author}: {text}
            </p>
        </li>
    );
}