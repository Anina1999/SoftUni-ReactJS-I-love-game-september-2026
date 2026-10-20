export default function CommentsItem({
    text,
    author,
    pending,
}) {
    return (
        //pending comment is not saved yet, so it is faded
        <li className="comment" style={{ opacity: pending ? 0.5 : 1 }}>
            <p>
                {author}: {text}
            </p>
        </li>
    );
}