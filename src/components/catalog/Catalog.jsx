import { useEffect, useState } from "react";
import GameCard from "../game-card/GameCard";
import { gamesApi } from "../api";

export default function Catalog() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        gamesApi.getAll()
            .then(setGames)
            .catch(err => alert(err.message));
    }, [])

    return (
        <section id="catalog-page">
            <h1>Catalog</h1>
            
            <div className="catalog-container">
                {games.length === 0 && <h3 className="no-articles">No Added Games Yet</h3>}
                {games.map(game => <GameCard key={game.id} {...game} /> )}
            </div>
        </section>

    );
}
