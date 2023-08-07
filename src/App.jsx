import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import VideoDetail from "./pages/Video/Details.jsx";

function App() {
  return (
    <Router>
      <div className="App bg-gray-700 min-h-screen min-w-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video/:id" element={<VideoDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
