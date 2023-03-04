import React from 'react'
import './App.css';
import {observer, useLocalStore} from "mobx-react"
import rootStore from './store/RootStore/instance';
import { ToolType } from "./store/RootStore/ToolsStore/ToolsStore";
import History from "./pages/History/History"

import moment from 'moment';
import { Navigate, Route, Routes } from 'react-router-dom';
import Main from './pages/Main/Main';

function App() {  
  
  return (
      <div className="root">
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/history" element={<History/>}/>
          <Route path="*" element={<Navigate to="/" replace/>} />
        </Routes>  
      </div>
  )
}

export default App;
