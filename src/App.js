import './App.css';
import { Docs } from './components/Docs';
import { EditDocs } from './components/EditDocs';
import { app, database } from './config/firebaseConfig'
import { Routes, Route } from "react-router-dom"
import React from 'react'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { BiMenu } from 'react-icons/bi'
import { useLocation } from 'react-router-dom';
import { GrApps } from "react-icons/gr"


function App() {
  const [isOpen, setIsOpen] = React.useState(false)
  const { pathname } = useLocation()
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }
  return (
    <div >
      {pathname === "/" && pathname !== "/editDocs/:id" ?
        <div className='navbar-container'>
          <BiMenu onClick={toggleDrawer} style={{ fontSize: '40px' }} />
          <Drawer open={isOpen} onClose={toggleDrawer} direction='left' style={{ width: '250px' }}>
            <div className='Google-docs'>
              <img src='https://cdn-icons-png.flaticon.com/512/5968/5968863.png' alt='Google-icon' />
              <p>Docs</p>
            </div>
            <hr style={{ color: 'grey' }} />
            <div className='sidebar-div'>
              <img src='https://cdn-icons-png.flaticon.com/512/5968/5968517.png' alt='google-docs-logo' />
              <p>Docs</p>
            </div>
            <div className='sidebar-div'>
              <img src='https://cdn-icons-png.flaticon.com/512/2965/2965327.png' alt='sheets-icon' />
              <p>Sheets</p></div>
            <div className='sidebar-div'>
              <img src='https://cdn-icons-png.flaticon.com/512/5968/5968568.png' alt='slides' />
              <p>Slides</p></div>
            <div className='sidebar-div'>
              <img src='https://cdn-icons-png.flaticon.com/512/5968/5968528.png' alt='forms logo' />
              <p>
                Forms
              </p>
            </div>
            <hr />
            <div className='sidebar-div'>
              <img src='https://cdn-icons-png.flaticon.com/512/94/94678.png' alt='settings' />
              <p>Settings</p></div>
            <div className='sidebar-div'>
              <img src='https://cdn-icons-png.flaticon.com/512/1224/1224961.png' alt='help' />
              <p>Help & Feedback</p></div>
            <hr />
            <div className='sidebar-div'>
              <img src='https://cdn-icons-png.flaticon.com/512/733/733554.png' alt='drive' />
              <p>Drive</p></div>
          </Drawer>
          <img src='https://mailmeteor.com/logos/assets/PNG/Google_Docs_Logo_256px.png' alt='docs-icon' style={{ width: '30px' }} />
          <div className='navbar-div'>Docs</div>
          <input type='text' placeholder='Search' />
          <GrApps />
          <div>f</div>
        </div> : ""}

      <Routes>
        <Route path='/' element={<Docs database={database} />} />
        <Route path='/editDocs/:id' element={<EditDocs database={database} />} />
      </Routes>
    </div>
  );
}

export default App;
