import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import { ErrorBoundary } from "react-error-boundary";
import { Fallback } from "./components/ui/Fallback";

function App() {

  return (
        <div className="px-40">
            <Router>
            <Navbar/>
            < ErrorBoundary FallbackComponent={Fallback}>
            <Routes>
                <Route path="/" element={<Dashboard/>} />
                {/* <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/signup" element={<SignUp/>} /> */}
            </Routes>
            </ErrorBoundary>
        </Router>
        </div>
  )
}

export default App
