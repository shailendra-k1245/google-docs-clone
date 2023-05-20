import './App.css';
import { Docs } from './components/Docs';
import { EditDocs } from './components/EditDocs';
import { app, database } from './config/firebaseConfig'
import { Routes, Route } from "react-router-dom"
import React from 'react'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { BiMenu } from 'react-icons/bi'


function App() {
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }
  return (
    <div >
      <BiMenu onClick={toggleDrawer} />
      <Drawer open={isOpen} onClose={toggleDrawer} direction='left'>
        <div>Hello World</div>
      </Drawer>
      <Routes>
        <Route path='/' element={<Docs database={database} />} />
        <Route path='/editDocs/:id' element={<EditDocs database={database} />} />
      </Routes>
    </div>
  );
}

export default App;
