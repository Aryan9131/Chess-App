const { Chess } = require("chess.js");
const fetch = require("node-fetch");

let game = new Chess();

module.exports.startGame = async (req, res) => {
    game = new Chess();
    return res.json({ message: "New game started", fen: game.fen(), turn: game.turn() });
};

// Player Move API
module.exports.playerMove = async (req, res) => {
    const { move } = req.body;
    console.log('Player move come : ' + JSON.stringify(move))
    if (!move) {
        console.log('Move requred returning : ')
        return res.status(200).json({move: null, message: "Move is required" });
    }

    if (game.game_over()) {
        console.log('returning : Game is over')
        return res.status(200).json({ move: null, message: "Game is over" });
    }

    if (game.turn() !== "w") {
        console.log(' game.turn() !== w returning : Invalid turn')
        return res.status(200).json({ move: null, message: "Invalid turn" });
    }

    try {
        const result = game.move(move);

        if (!result) {
            console.log(' !result returning : Invalid move')
            return res.status(200).json({ move: null, message: "Invalid move" });
        }
       
        return res.json({
            message: "Move applied",
            move: result,
            fen: game.fen(),
            turn: game.turn(),
            gameOver: game.game_over(),
        });

    } catch (error) {
        console.log(' error returning :' + error)
        return res.status(500).json({ move:null, message: "Invalid move", details: error.message });
    }
};

// AI Move API
module.exports.aiMove = async (req, res) => {
    if (game.game_over()) {
        console.log('returning : Game is over')
        return res.status(200).json({ move: null, message: "Game is over" });
    }

    if (game.turn() !== "b") {
        console.log(' game.turn() !== b returning : Invalid turn')
        return res.status(200).json({ move: null, message: "Invalid turn" });
    }

    try {
        const fen = game.fen();
        const depth = 12;
        const apiUrl = `https://stockfish.online/api/s/v2.php?fen=${encodeURIComponent(fen)}&depth=${depth}`;

        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Stockfish API error: ${response.status}`);

        const data = await response.json();

        if (!data || !data.success || !data.bestmove) {
            console.log(' returning : Stockfish API error')
            return res.status(500).json({ move: null, message: "Stockfish API error" });
        }
        console.log("data from stockfish --> " + JSON.stringify(data))

        const bestMove = data.bestmove.split(" ")[1] || data.bestmove;
        console.log("Valid moves:", game.moves());
        console.log("Trying to move:", bestMove);


        const from = bestMove.slice(0, 2);
        const to = bestMove.slice(2, 4);
        const result = game.move({ from, to });
        console.log("Move result using from-to object:", result);

        console.log("result --> " + JSON.stringify(result))
        if (!result) {
            console.log(' returning : AI move was invalid')
            return res.status(200).json({ move: null, message: "AI move was invalid" });
        }

        return res.json({
            message: "AI moved",
            move: result,
            fen: game.fen(),
            evaluation: data.evaluation,
            mate: data.mate,
            gameOver: game.game_over(),
            turn: game.turn(),
            winner: game.game_over() ? (game.turn() === "w" ? "Black" : "White") : null
        });

    } catch (error) {
        console.log(' returning : Failed to get AI move Error : ' + error)
        return res.status(500).json({ move: null, message: "Failed to get AI move", details: error.message });
    }
};
