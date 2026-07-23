import { Routes, Route } from "react-router-dom";
import { WatchlistProvider } from "./contexts/WatchlistContext";
import Discover from "./pages/Discover";
import Watchlist from "./pages/Watchlist";
import NavBar from "./components/NavBar"; // Create a simple Nav with links

function App() {
  return (
    <WatchlistProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </main>
    </WatchlistProvider>
  );
}

export default App;
