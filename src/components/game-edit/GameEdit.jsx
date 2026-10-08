import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getDocument, updateDocument } from "../../utils/firestoreService";

const initialValues = {
    title: "",
    genre: "",
    activePlayers: "",
    releaseDate: "",
    imageUrl: "",
    summary: ""
}

export default function GameEdit() {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const [values, setValues] = useState(initialValues);

    useEffect(() => {
        const abortController = new AbortController();

        getDocument(`games/${gameId}`, { signal: abortController.signal })
            .then(game => setValues({
                title: game.title,
                genre: game.genre,
                activePlayers: game.activePlayers,
                releaseDate: game.releaseDate,
                imageUrl: game.imageUrl,
                summary: game.summary,
            }))
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

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    };

    const editAction = async () => {
        try {
            await updateDocument(`games/${gameId}`, {
                ...values,
                activePlayers: Number(values.activePlayers),
            });

            navigate(`/games/${gameId}`);
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <section id="edit-page">
            <form id="add-new-game" action={editAction}>
                <div className="container">
                    <h1>Edit Game</h1>
                    <div className="form-group-half">
                        <label htmlFor="gameName">Game Name:</label>
                        <input
                            type="text"
                            id="gameName"
                            name="title"
                            placeholder="Enter game title..."
                            value={values.title}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="form-group-half">
                        <label htmlFor="genre">Genre:</label>
                        <input
                            type="text"
                            id="genre"
                            name="genre"
                            placeholder="Enter game genre..."
                            value={values.genre}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="form-group-half">
                        <label htmlFor="activePlayers">Active Players:</label>
                        <input
                            type="number"
                            id="activePlayers"
                            name="activePlayers"
                            min={0}
                            placeholder={0}
                            value={values.activePlayers}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="form-group-half">
                        <label htmlFor="releaseDate">Release Date:</label>
                        <input type="date" id="releaseDate" name="releaseDate" value={values.releaseDate} onChange={changeHandler}/>
                    </div>
                    <div className="form-group-full">
                        <label htmlFor="imageUrl">Image URL:</label>
                        <input
                            type="text"
                            id="imageUrl"
                            name="imageUrl"
                            placeholder="Enter image URL..."
                            value={values.imageUrl}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="form-group-full">
                        <label htmlFor="summary">Summary:</label>
                        <textarea
                            name="summary"
                            id="summary"
                            rows={5}
                            placeholder="Write a brief summary..."
                            value={values.summary}
                            onChange={changeHandler}
                        />
                    </div>
                    <input className="btn submit" type="submit" value="EDIT GAME" />
                </div>
            </form>
        </section>

    );
}