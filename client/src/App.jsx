import { useState } from 'react'
import { ToastContainer } from 'react-toastify';

import './App.css'
import {PlayRandomMoveEngine} from './components/ChessBoard'
import {Box} from '@mui/material'
function App() {
  const [count, setCount] = useState(0)

  return (
      <Box sx={{width:'100vw',display:'flex', justifyContent:'center', height:'100vh'}} >
        <ToastContainer/>
        <PlayRandomMoveEngine />
      </Box>
  )
}

export default App
