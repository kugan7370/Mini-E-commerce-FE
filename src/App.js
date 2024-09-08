import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import HomePage from "./pages/Home";
import Footer from "./components/Footer";
import Details from "./pages/Detail";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
// import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/detail/:id" element={<Details />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
