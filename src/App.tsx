import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Header from './components/Header'
import { Suspense, lazy } from 'react'
import Loader from './components/Loader'

const Home = lazy(()=>import('./components/Home'))
const Quiz = lazy(()=>import('./components/Quiz'))
const Result = lazy(()=>import('./components/Result'))
const Learning = lazy(()=>import('./components/Learning'))

function App() {
  return (
    <Router>
      <Header /> 
      <Suspense fallback={<Loader />} >
      <Routes>
        <Route path='/' element={<Home />}/> 
        <Route path='/quiz' element={<Quiz />}/> 
        <Route path='/result' element={<Result />}/> 
        <Route path='/learning' element={<Learning />}/> 
      </Routes>
      </Suspense>
    </Router>
  )
}

export default App