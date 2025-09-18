// App root
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import { ProjectsProvider } from './contexts/ProjectsContext'

function App() {
  return (
    <ProjectsProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </ProjectsProvider>
  )
}

export default App
