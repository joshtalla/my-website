// App root
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import KonamiGame from './components/KonamiGame'
import { ProjectsProvider } from './contexts/ProjectsContext'
import './App.css'

function App() {
  return (
    <ProjectsProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
          <Footer />
          <KonamiGame />
        </div>
      </Router>
    </ProjectsProvider>
  )
}

export default App
