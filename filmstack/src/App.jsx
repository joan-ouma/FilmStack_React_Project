import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { WatchlistProvider } from "./contexts/WatchlistContext";
import Discover from "./pages/Discover";
import Watchlist from "./pages/Watchlist";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NavBar from "./components/NavBar";

function App() {
  return (
    <AuthProvider>
      <WatchlistProvider>
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Discover />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </WatchlistProvider>
    </AuthProvider>
  );
}

export default App;