import { Box, Button, List, ListItem, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from 'chess.js'
import { toast } from 'react-toastify';

export function PlayRandomMoveEngine() {
  const [game, setGame] = useState(new Chess())
  const [movesHistory, setMovesHistory] = useState([])
  
  const getGameStatus = () => {
    if (game.isGameOver()) {
      if (game.isCheckmate()) {
        toast.warning("CheckMate");
        return 'CheckMate Game Over'
      } else if (game.isDraw()) {
        toast.info("Draw");
        return 'Draw'
      } else if (game.isStalemate()) {
        toast.info("Stalemate");
        return 'Stalemate'
      }
      toast.info("Game Over !");
      return 'Game Over !'
    }

    if (game.isCheck()){
      toast.info("Check !");
       return 'Check'
    }

    return (`${game.turn() == 'w' ? 'White' : 'Black'} Chance to Move !`)
  }
  const moveWhitePlayer = async (move) => {
    try {
      const moveResultResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/player-move`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({move :move}),
      });
      const moveResult = await moveResultResponse.json();
  
      if (!moveResult.move) {
        toast.info("Invalid Move !");
        console.log("Invalid Move inside moveWhitePlayer:", moveResult);
        return false;
      }
  
      setGame(new Chess(moveResult.fen)); // Ensure it's a Chess instance
      return true;
    } catch (error) {
     console.log("Error in moveWhitePlayer:", error);
      return false;
    }
  };
  
  const moveBlackPlayer = async () => {
    try {
      const moveResultResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/ai-move`);
      const moveResult = await moveResultResponse.json();
  
      if (!moveResult.move) {
        toast.info("Invalid Move !");
       console.log("Invalid Move inside moveBlackPlayer:", moveResult);
        return false;
      }
  
      setGame(new Chess(moveResult.fen)); // Ensure it's a Chess instance
      return true;
    } catch (error) {
     console.log("Error in moveBlackPlayer:", error);
      return false;
    }
  };
  
  const onDrop = useCallback(async (sourceSquare, targetSquare) => {
    try {
      const move = {
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      };
  
      const moveWhiteResult = await moveWhitePlayer(move); // Await the result
      if (!moveWhiteResult) {
        console.log("Invalid Result from moveWhitePlayer:", moveWhiteResult);
        return false;
      }
        const moveBlackResult = await moveBlackPlayer(); // Await the result
        if (!moveBlackResult) {
          console.log("Invalid Result from moveBlackPlayer:", moveBlackResult);
          return false;
       }
  
      return true;
    } catch (error) {
      toast.error("Invalid move, try again");
     console.log("Error while making move:", error);
      return false;
    }
  }, [game]);
  
  const handleNewGame = async()=>{
    try {
      const startGameResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/new-game`);
      const startGameData = await startGameResponse.json();
      console.log("startGameData -->", startGameData);

      // Ensure the game state is a Chess instance
      setGame(new Chess(startGameData.fen));
    } catch (error) {
     console.log("Error initializing game:", error);
      toast.error("Failed to start the game");
    }
  } 

  useEffect(() => {
    const initializeGame = async () => {
      try {
        const startGameResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/new-game`);
        const startGameData = await startGameResponse.json();
        console.log("startGameData -->", startGameData);
  
        // Ensure the game state is a Chess instance
        setGame(new Chess(startGameData.fen));
      } catch (error) {
       console.log("Error initializing game:", error);
        toast.error("Failed to start the game");
      }
    };
    initializeGame();
  }, []);
  
  return (
    <Box sx={{ width: "100vw", height: "100vh", display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", alignContent: 'center' }}>
      <Box sx={{ width: '100%', backgroundColor: 'rgb(88, 88, 144)',display:'flex', justifyContent:'space-around' }}>
        <Typography sx={{ padding: '15px 0px', textAlign: 'center',color:'whitesmoke', fontWeight:'800'}}>
           Move Info : {getGameStatus()}
        </Typography>
        <Button size="small" sx={{color:'rgb(5, 5, 29)', padding:'0'}} onClick={handleNewGame}>New Game</Button>
      </Box>
      <Box sx={{width:'100%',paddingTop:'5px', height:'100%', background:'radial-gradient(whitesmoke, skyblue)', display:'flex', justifyContent:'flex-end'}}>
        <Box sx={{ width: '50%', height: '100%' }}>
          <Chessboard id="BasicBoard" boardWidth={550}
            position={game.fen()}
            onPieceDrop={onDrop}
          />
        </Box>
        <Box sx={{height:'100%', width:'20%', border:'1px solid grey',padding:'5px', boxSizing:'border-box'}}>
            <Typography sx={{fontWeight:'800', fontSize:'16px'}}>History : </Typography>
            <List>
              {
                movesHistory.map((moveItem)=>{
                  return <ListItem>hello</ListItem>
                })
              }
            </List>
        </Box>
      </Box>
    </Box>
  );
}
