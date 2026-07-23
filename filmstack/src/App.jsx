import { WatchlistProvider } from "./contexts/WatchlistContext";
import Watchlist from "./pages/Watchlist";

function App() {
  return (
    <WatchlistProvider>
      <main className="main-content">
        <Watchlist />
      </main>
    </WatchlistProvider>
  );
}

export default App;
