import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import {Provider} from 'react-redux'
import store from './store/store.js'
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Provider store={store}>
      <div className=''>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/Auth' element={<Auth/>}/>
        </Routes>
      </div>
      </Provider>
    </BrowserRouter>
  )
}

export default App
