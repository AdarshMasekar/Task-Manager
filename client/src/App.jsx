import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"

function App() {

  return (
        <div className="px-40">
            <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Dashboard/>} />
                {/* <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/signup" element={<SignUp/>} /> */}
            </Routes>
        </Router>
        </div>
  )
}

export default App
