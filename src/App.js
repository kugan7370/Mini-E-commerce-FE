import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import HomePage from "./pages/Home";
import Footer from "./components/Footer";
// import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar is now outside of Routes to make it common */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Add other routes here */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
