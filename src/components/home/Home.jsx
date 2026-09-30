import { useEffect, useState } from "react";
import { getDocumentsOrdered } from "../../utils/firestoreService";
import GameCard from "../game-card/GameCard";

export default function Home() {
    const [latestGames, setLatestGames] = useState([]);

    useEffect(() => {
        getDocumentsOrdered("games", "created_at", "desc", 3)
            .then(setLatestGames)
            .catch(err => alert(err.message));
    }, [])

    return (
        <section id="welcome-world">
            <div className="welcome-message">
                <h2>ALL new games are</h2>
                <h3>Only in </h3>
                <img id="logo-left" src="./images/logo.png" alt="logo" />
            </div>
            <div id="home-page">
                <h1>Latest Games</h1>
                <div id="latest-wrap">
                    {/* Display div: with information about every game (if any) */}
                    <div className="home-container">
                        {latestGames.length === 0 && <p className="no-articles">No games yet</p>}
                        {latestGames.map(game => <GameCard key={game.id} {...game} />)}
                    </div>
                </div>
            </div>
        </section>
    );
}