# React Chess Game

This is a **React Chess Game** built using **React**, **chess.js**, and **Stockfish** for AI-powered moves, **react-toastify** for alerts. The game allows a player to compete against an AI opponent.

## Features

- Play as **White**, with **Stockfish** controlling Black.
- Move validation using `chess.js`.
- AI opponent powered by **Stockfish**.
- Highlights legal moves.
- Displays **game status** (Check, Checkmate, Stalemate).
- Interactive UI.
- Important Ntifications

## Live Demo 

   https://chess-app-rl48.onrender.com/

## Installation

### Prerequisites

- **Node.js**
- **npm** or **yarn**

### Steps

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Aryan9131/Chess-App.git
   ```
2. **Install dependencies:**

   for backend
   ```sh
   cd server
   npm install  # or yarn install
   ```

   for frontend
   ```sh
   cd client
   npm install
   ```
4. **Start the development server:**
  for frontend
   ```sh
    npm run dev
   ```

   for backend
   ```sh
    node index.js
   ```

## Usage

- Open the game in your browser (default: `http://localhost:5173/`).
- Make a move by selecting a piece and clicking a valid square.
- The AI will respond after processing the best move.
- Play until **Checkmate, Stalemate, or Draw**.
- Start New Game using new game button.

## API Integration

This project fetches AI moves from **Stockfish API**. Ensure your API URL is correctly set up in the backend.

## Technologies Used

- **React** (Frontend UI)
- **react-tostify** (Frontend alerts)
- **chess.js** (Game logic & move validation)
- **Stockfish** (AI engine)
- **Node.js & Express** (Backend API)
