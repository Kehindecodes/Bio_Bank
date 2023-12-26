import CollectionPage from './pages/CollectionPage'
import './App.css'
import SamplePage from './pages/SamplePage'
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Routes>
        <Route path="/" element={<CollectionPage />} />
        <Route path="/collections/:collectionId/samples" element={<SamplePage />} /> 
    </Routes>
  )
}

export default App
