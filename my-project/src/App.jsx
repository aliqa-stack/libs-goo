import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Navbar from './componens/Navbar'
import Headers from './componens/Headers'
import Booksection from './componens/Booksection'
import './App.css'

function App() {
 return(
  <>
  <Navbar/>
  <Headers/>
  <Booksection/>
  
  </>
 )

}

export default App
