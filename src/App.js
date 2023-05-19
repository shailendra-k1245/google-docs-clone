import './App.css';
import { Docs } from './components/Docs';
import { EditDocs } from './components/EditDocs';
import { app, database } from './config/firebaseConfig'
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <div >
      <Routes>
        <Route path='/' element={<Docs database={database} />} />
        <Route path='/editDocs/:id' element={<EditDocs database={database} />} />
      </Routes>
    </div>
  );
}

export default App;
